import React, { useContext, useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductInterface from '../interface/product';
import { BottomNavigation } from './BottomNavigation';
import { CustomBackButton, CustomHeader } from '../components/Ui/CustomHeader';
import { CodebarUpdateNavigation } from './CodebarUpdateNavigation';
import { SettingsContext } from '../context/settings/SettingsContext';
import { TESTAPP } from "@env";

// Screens
import { LoginScreen } from '../screens/Onboarding/LoginScreen';
import { SearchProductScreen } from '../screens/SearchProductScreen';
import { InventoryBagScreen } from '../screens/InventoryBag/InventoryBagScreen';
import { SuccesMessage } from '../screens/SuccesMessage';
import { TypeOfMovementScreen } from '../screens/TypeOfMovementScreen';
import { LoginDatabaseScreen } from '../screens/Onboarding/LoginDatabaseScreen';
import { SearchCodebarWithInput } from '../screens/Modals/SearchCodebarWithInput';
import ScannerResult from '../screens/Modals/ScannerResult';
import { StartupScreen } from '../screens/Onboarding/StartupScreen';
import { ProductDetailsPage } from '../screens/ProductDetailsPage';
import { ProductsFindByCodeBar } from '../screens/Modals/ProductsFindByCodeBar';

export type InventoryNavigationStackParamList = {
    //Navigation
    BottomNavigation: undefined;
    CodebarUpdateNavigation: { product: ProductInterface, selectedProduct: any },

    //Login
    LoginPage: undefined;
    LoginDatabaseScreen: undefined;
    StartupScreen: undefined;

    //Screens
    "[ProductDetailsPage] - inventoryDetailsScreen": { selectedProduct: ProductInterface };
    "[ProductDetailsPage] - productDetailsScreen": { selectedProduct?: ProductInterface, productDetails?: ProductInterface, fromModal?: boolean };
    bagInventoryScreen: undefined;
    succesMessageScreen: undefined;
    typeOfMovementScreen: undefined;
    searchProductScreen: undefined;

    //Modal
    "[Modal] - scannerResultScreen": undefined,
    "[Modal] - findByCodebarInputModal": undefined;
    "[Modal] - searchProductModal": { modal: boolean };
    "[Modal] - productsFindByCodeBarModal": undefined;
};

const Stack = createNativeStackNavigator<InventoryNavigationStackParamList>();

export const AppNavigation = () => {
    const { handleCameraAvailable, updateBarCode } = useContext(SettingsContext);

    const commonOptions: any = {
        headerBackTitle: 'Atrás',
        headerTitleAlign: 'center'
    };

    const authScreens = TESTAPP !== 'FALSE' ? (
        <>
            <Stack.Screen
                name="StartupScreen"
                component={StartupScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="LoginDatabaseScreen"
                component={LoginDatabaseScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="LoginPage"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
        </>
    ) : null;

    const stackScreens = useMemo(() => (
        <>
            {authScreens}
            <Stack.Screen
                name="BottomNavigation"
                component={BottomNavigation}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="CodebarUpdateNavigation"
                component={CodebarUpdateNavigation}
                options={{ presentation: "modal", headerShown: false }}
            />

            <Stack.Screen
                name="typeOfMovementScreen"
                component={TypeOfMovementScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="bagInventoryScreen"
                component={InventoryBagScreen}
                options={({ navigation }) => ({
                    presentation: "modal",
                    headerShown: true,
                    title: 'Inventario',
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <CustomBackButton
                            navigation={navigation}
                        />
                    ),
                })}
            />

            <Stack.Screen
                name="succesMessageScreen"
                component={SuccesMessage}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="searchProductScreen"
                component={SearchProductScreen}
                options={commonOptions}
            />

            <Stack.Screen
                name="[ProductDetailsPage] - inventoryDetailsScreen"
                component={ProductDetailsPage}
                options={({ navigation, route }: any) => ({
                    header: props => (
                        <CustomHeader
                            {...props}
                            title="Detalles de Producto"
                            navigation={navigation}
                            back={() => {
                                if (route?.params?.fromUpdateCodebar) {
                                    navigation.navigate('BottomNavigation');
                                } else {
                                    navigation.goBack();
                                }
                                updateBarCode('');
                                //handleCameraAvailable(true);
                            }}
                        />
                    )
                })}
            />

            <Stack.Screen
                name="[ProductDetailsPage] - productDetailsScreen"
                component={ProductDetailsPage}
                options={({ navigation, route }) => ({
                    presentation: "modal",
                    header: props => (
                        <CustomHeader
                            {...props}
                            title="Detalles de Producto"
                            navigation={navigation}
                            backCustum={true}
                            back={() => {
                                navigation.goBack();
                                updateBarCode('');
                                if (route.params?.selectedProduct) {
                                    setTimeout(() => {
                                        navigation.navigate('[Modal] - scannerResultScreen', { product: route.params.selectedProduct });
                                    }, 500);
                                }
                            }}
                        />
                    )
                })}
            />

            {/* modals */}
            <Stack.Screen
                name="[Modal] - scannerResultScreen"
                component={ScannerResult}
                options={{ presentation: 'transparentModal', headerShown: false }}
            />
            <Stack.Screen
                name="[Modal] - findByCodebarInputModal"
                component={SearchCodebarWithInput}
                options={{ presentation: 'transparentModal', headerShown: false }}
            />
            <Stack.Screen
                name="[Modal] - searchProductModal"
                component={SearchProductScreen}
                options={{
                    presentation: "modal",
                    headerTitle: "Buscar Producto",
                    ...commonOptions
                }}
            />
            <Stack.Screen
                name="[Modal] - productsFindByCodeBarModal"
                component={ProductsFindByCodeBar}
                options={{ presentation: 'transparentModal', headerShown: false }}
            />
        </>
    ), [authScreens, handleCameraAvailable, updateBarCode]);

    return (
        <Stack.Navigator>
            {stackScreens}
        </Stack.Navigator>
    );
};
