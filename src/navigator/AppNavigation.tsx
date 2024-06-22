import React, { useContext, useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductInterface from '../interface/product';
import { BottomNavigation } from './BottomNavigation';
import { CustomBackButton, CustomHeader } from '../components/Ui/CustomHeader';
import { CodebarUpdateNavigation } from './CodebarUpdateNavigation';
import { SettingsContext } from '../context/settings/SettingsContext';
import { AuthContext } from '../context/auth/AuthContext';
import { TESTAPP } from "@env";

// Screens
import { LoginScreen } from '../screens/Onboarding/LoginScreen';
import { SearchProductScreen } from '../screens/SearchProductScreen';
import { InventoryBagScreen } from '../screens/InventoryBag/InventoryBagScreen';
import { SuccesMessage } from '../screens/SuccesMessage';
import { TypeOfMovementScreen } from '../screens/TypeOfMovementScreen';
import { LoginDatabaseScreen } from '../screens/Onboarding/LoginDatabaseScreen';
import { PersonalInformation } from '../screens/Profile/PersonalInformation';
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
    bagInventoryScreen: undefined;
    inventoryDetailsScreen: { selectedProduct: ProductInterface };
    productDetailsScreen: { selectedProduct?: ProductInterface, productDetails?: ProductInterface, fromModal?: boolean };
    succesMessageScreen: undefined;
    typeOfMovementScreen: undefined;
    searchProductScreen: undefined;
    personalInformationScreen: { fromLogIn?: boolean },
    scannerResultScreen: undefined,

    //Modal
    findByCodebarInputModal: undefined;
    searchProductModal: { modal: boolean };
    productsFindByCodeBarModal: undefined;
};

const Stack = createNativeStackNavigator<InventoryNavigationStackParamList>();

export const AppNavigation = () => {
    const { handleCameraAvailable } = useContext(SettingsContext);
    const { updateBarCode } = useContext(AuthContext);

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
                name="personalInformationScreen"
                component={PersonalInformation}
                options={({ navigation }) => ({
                    header: props => <CustomHeader title="Información Personal" navigation={navigation} />
                })}
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
                        <CustomBackButton navigation={navigation} onClick={() => handleCameraAvailable(true)} />
                    ),
                })}
            />

            <Stack.Screen
                name="inventoryDetailsScreen"
                component={ProductDetailsPage}
                options={({ navigation }) => ({
                    header: props => (
                        <CustomHeader
                            {...props}
                            title="Detalles de Producto"
                            navigation={navigation}
                            back={() => {
                                handleCameraAvailable(true);
                                updateBarCode('');
                            }}
                        />
                    )
                })}
            />
            <Stack.Screen
                name="searchProductScreen"
                component={SearchProductScreen}
                options={commonOptions}
            />
            <Stack.Screen
                name="searchProductModal"
                component={SearchProductScreen}
                options={{
                    presentation: "modal",
                    headerTitle: "Buscar Producto",
                    ...commonOptions
                }}
            />
            <Stack.Screen
                name="productDetailsScreen"
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
                                console.log("productDetailsScreen")
                                navigation.goBack();
                                updateBarCode('');
                                if (route.params?.selectedProduct) {
                                    setTimeout(() => {
                                        navigation.navigate('scannerResultScreen', { product: route.params.selectedProduct });
                                    }, 500);
                                }
                            }}
                        />
                    )
                })}
            />
            <Stack.Screen
                name="succesMessageScreen"
                component={SuccesMessage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CodebarUpdateNavigation"
                component={CodebarUpdateNavigation}
                options={{ presentation: "modal", headerShown: false }}
            />


            {/* modals */}
            <Stack.Screen
                name="scannerResultScreen"
                component={ScannerResult}
                options={{ presentation: 'transparentModal', headerShown: false }}
            />
            <Stack.Screen
                name="findByCodebarInputModal"
                component={SearchCodebarWithInput}
                options={{ presentation: 'transparentModal', headerShown: false }}
            />
            <Stack.Screen
                name="productsFindByCodeBarModal"
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
