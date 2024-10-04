import React, { useContext, useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductInterface from '../interface/product';
import { CustomHeader } from '../components/Ui/CustomHeader';
import { CodebarUpdateNavigation } from './CodebarUpdateNavigation';
import { SettingsContext } from '../context/settings/SettingsContext';

// Screens
import { SearchProductScreen } from '../screens/Inventory/SearchProductScreen';
import { SearchCodebarWithInput } from '../screens/Inventory/Modals/SearchCodebarWithInput';
import ScannerResult from '../screens/Inventory/Modals/ScannerResult';
import { ProductsFindByCodeBar } from '../screens/Inventory/Modals/ProductsFindByCodeBar';
import { AuthContext } from '../context/auth/AuthContext';
import { ConfirmationScreen } from '../screens/Inventory/InventoryBag/ConfirmationScreen';
import { EditProductInBag } from '../screens/Inventory/Modals/EditProductInBag';
import { ScannerNavigation } from './ScannerNavigation';
import { ProductDetailsPageEdit } from '../screens/Inventory/ProductDetailsPageEdit';
import { EditPrice } from '../screens/Inventory/Modals/EditPrice';
import { EditDescripcio } from '../screens/Inventory/Modals/EditDescripcio';
import { InventoryBagScreen } from '../screens/Inventory/InventoryBag/InventoryBagScreen';
import { ProductDetailsPage } from '../screens/Inventory/ProductDetailsPage';


export type InventoryNavigationStackParamList = {
    // Navigation
    CodebarUpdateNavigation: { selectedProduct: { idinvearts: number } }
    ScanneNavigation: undefined;

    // Screens
    "[ProductDetailsPage] - inventoryDetailsScreen": { selectedProduct: ProductInterface, fromModal: boolean };
    "[ProductDetailsPage] - productDetailsScreen": { selectedProduct: ProductInterface, fromModal: boolean };
    "[ProductDetailsPage] - productDetailsScreenEdit": { product: { idinvearts: number } };
    "[ProductDetailsPage] - editPrice": { product: ProductInterface };
    "[ProductDetailsPage] - editDescripcio": { product: ProductInterface };

    bagInventoryScreen: undefined;
    confirmationScreen: undefined;
    searchProductScreen: { modal: boolean, isModal: boolean };

    // Modal
    "[Modal] - scannerResultScreen": { product: ProductInterface, fromProductDetails: boolean },
    "[Modal] - findByCodebarInputModal": undefined;
    "[Modal] - searchProductModal": { modal: boolean, isModal: boolean };
    "[Modal] - productsFindByCodeBarModal": { products: ProductInterface[] };
    "[Modal] - editProductInBag": { product: ProductInterface };
};

const Stack = createNativeStackNavigator<InventoryNavigationStackParamList>();

export const InventoryNavigation = () => {
    const { handleCameraAvailable, updateBarCode } = useContext(SettingsContext);

    const commonOptions: any = {
        headerBackTitle: 'Atrás',
        headerTitleAlign: 'center'
    };

    const stackScreens = useMemo(() => (
        <>
            <Stack.Screen
                name="ScanneNavigation"
                component={ScannerNavigation}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="CodebarUpdateNavigation"
                component={CodebarUpdateNavigation}
                options={{ presentation: "modal", headerShown: false }}
            />

            <Stack.Screen
                name="bagInventoryScreen"
                component={InventoryBagScreen}
                options={({ navigation }: any) => ({
                    presentation: "modal",
                    header: props => (
                        <CustomHeader
                            {...props}
                            title={"Inventario"}
                            navigation={navigation}
                            backCustum={true}
                            back={() => {
                                navigation.goBack()
                            }}
                        />
                    )
                })}
            />

            <Stack.Screen
                name="confirmationScreen"
                component={ConfirmationScreen}
                options={({ navigation }: any) => ({

                    header: props => (
                        <CustomHeader
                            {...props}
                            title={"Confirmación"}
                            navigation={navigation}
                            backCustum={true}
                            back={() => navigation.goBack()}
                        />
                    )
                })}
            />

            <Stack.Screen
                name="searchProductScreen"
                component={SearchProductScreen}
                options={({ navigation }: any) => ({
                    header: props => (
                        <CustomHeader
                            {...props}
                            title="Buscar producto"
                            navigation={navigation}
                            back={() => {
                                navigation.goBack();
                                updateBarCode('');
                            }}
                        />
                    )
                })}
            />

            <Stack.Screen
                name="[ProductDetailsPage] - inventoryDetailsScreen"
                component={ProductDetailsPage}
                options={({ navigation }) => ({
                    header: props => (
                        <CustomHeader
                            {...props}
                            title="Detalles de Producto"
                            navigation={navigation}
                            back={() => {
                                navigation.goBack();
                                updateBarCode('');
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

            <Stack.Screen
                name="[ProductDetailsPage] - productDetailsScreenEdit"
                component={ProductDetailsPageEdit}
                options={({ navigation }) => ({
                    presentation: "modal",
                    header: props => (
                        <CustomHeader
                            {...props}
                            title="Editando Producto"
                            navigation={navigation}
                            backCustum={true}
                            back={() => navigation.goBack()}
                        />
                    )
                })}
            />

            <Stack.Screen
                name="[ProductDetailsPage] - editPrice"
                component={EditPrice}
                options={{ presentation: 'transparentModal', headerShown: false }}
            />

            <Stack.Screen
                name="[ProductDetailsPage] - editDescripcio"
                component={EditDescripcio}
                options={{ presentation: 'transparentModal', headerShown: false }}
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
                initialParams={{ isModal: true }}
            />
            <Stack.Screen
                name="[Modal] - productsFindByCodeBarModal"
                component={ProductsFindByCodeBar}
                options={{ presentation: 'transparentModal', headerShown: false }}
            />
            <Stack.Screen
                name="[Modal] - editProductInBag"
                component={EditProductInBag}
                options={{ presentation: 'transparentModal', headerShown: false }}
            />
        </>
    ), [handleCameraAvailable, updateBarCode]);

    return (
        <Stack.Navigator>
            {stackScreens}
        </Stack.Navigator>
    );
};
