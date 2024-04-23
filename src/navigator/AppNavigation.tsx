import React from 'react';

import { ProductDetailsPage } from '../screens/ProductDetailsPage';
import PorductInterface from '../interface/product';
import { BottomNavigation } from './BottomNavigation';
import { SearchProductScreen } from '../screens/SearchProductScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { CustomBackButton, CustomHeader } from '../components/Ui/CustomHeader';
import { InventoryBagScreen } from '../screens/InventoryBag/InventoryBagScreen';
import { SuccesMessage } from '../screens/SuccesMessage';
import { TypeOfMovementScreen } from '../screens/TypeOfMovementScreen';
import { CodebarUpdateNavigation } from './CodebarUpdateNavigation';

export type InventoryNavigationStackParamList = {
    LoginPage: any;
    BottomNavigation: undefined;
    BagInventory: undefined;
    InventoryDetails: { selectedProduct: PorductInterface };
    ProductDetails: { selectedProduct?: PorductInterface };
    SearchProduct: any;
    SuccesMessage: any;
    TypeOfMovement: any;
    SearchProductModal: any;
    CodebarUpdateNavigation: { product: PorductInterface, selectedProduct: any },
    CameraModal: any
};

export const AppNavigation = () => {

    const Stack = createNativeStackNavigator<InventoryNavigationStackParamList>();

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
                        <CustomBackButton navigation={navigation} />
                    ),
                })}
            />

            {/* Inventory pages */}
            <Stack.Screen
                name="InventoryDetails"
                component={ProductDetailsPage}
                options={({ navigation }) => ({
                    header: props => <CustomHeader {...props} title="Detalles de Producto" navigation={navigation} />,
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

            {/* Camera Pages */}
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

            {/* Other pages */}
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
