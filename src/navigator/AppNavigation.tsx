import React, { useContext } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PorductInterface from '../interface/product';
import { BottomNavigation } from './BottomNavigation';
import { CustomBackButton, CustomHeader } from '../components/Ui/CustomHeader';
import { CodebarUpdateNavigation } from './CodebarUpdateNavigation';
import { SettingsContext } from '../context/settings/SettingsContext';

import { ProductDetailsPage } from '../screens/productDetailsPage';
import { LoginScreen } from '../screens/LoginScreen';
import { SearchProductScreen } from '../screens/SearchProductScreen';
import { InventoryBagScreen } from '../screens/InventoryBag/InventoryBagScreen';
import { SuccesMessage } from '../screens/SuccesMessage';
import { TypeOfMovementScreen } from '../screens/TypeOfMovementScreen';
import { AuthContext } from '../context/auth/AuthContext';
import { Text, TouchableOpacity } from 'react-native';

export type InventoryNavigationStackParamList = {
    LoginPage: undefined;
    BottomNavigation: undefined;
    BagInventory: undefined;
    InventoryDetails: { selectedProduct: PorductInterface };
    ProductDetails: { selectedProduct?: PorductInterface };
    SuccesMessage: undefined;
    TypeOfMovement: undefined;
    SearchProduct: undefined;
    SearchProductModal: { modal: boolean };
    CodebarUpdateNavigation: { product: PorductInterface, selectedProduct: any },
    CameraModal: undefined
};

export const AppNavigation = () => {

    const Stack = createNativeStackNavigator<InventoryNavigationStackParamList>();
    const { handleCameraAvailable } = useContext(SettingsContext);
    const { updateBarCode } = useContext(AuthContext);

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="LoginPage"
                component={LoginScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="TypeOfMovement"
                component={TypeOfMovementScreen}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="BottomNavigation"
                component={BottomNavigation}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="BagInventory"
                component={InventoryBagScreen}
                options={({ navigation }) => ({
                    presentation: "modal",
                    headerShown: true,
                    title: 'Inventario',
                    headerLeft: () => (
                        <CustomBackButton navigation={navigation} onClick={() => handleCameraAvailable(true)} />
                    ),
                })}
            />

            <Stack.Screen
                name="InventoryDetails"
                component={ProductDetailsPage}
                options={({ navigation }) => ({
                    header: props =>
                        <CustomHeader
                            {...props}
                            title="Detalles de Producto"
                            navigation={navigation}
                            back={() => {
                                handleCameraAvailable(true)
                                updateBarCode('')
                            }}
                        />
                })}
            />

            <Stack.Screen
                name="ProductDetails"
                component={ProductDetailsPage}
                options={{
                    presentation: "modal",
                    headerTitle: "Detalles de Producto",
                    headerShown: true,
                    headerBackTitle: "Atrás"
                }}
            />

            <Stack.Screen
                name="SearchProduct"
                component={SearchProductScreen}
                options={{
                    headerShown: true,
                    headerBackTitle: "Atrás"
                }}
            />

            <Stack.Screen
                name="SearchProductModal"
                component={SearchProductScreen}
                options={{
                    presentation: "modal",
                    headerTitle: "Buscar Producto",
                    headerShown: true,
                    headerBackTitle: "Atrás"
                }}
            />

            <Stack.Screen
                name="SuccesMessage"
                component={SuccesMessage}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="CodebarUpdateNavigation"
                component={CodebarUpdateNavigation}
                options={{
                    presentation: "modal",
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}
