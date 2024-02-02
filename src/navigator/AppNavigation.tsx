import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { Inventory } from '../screens/Camera/Inventory';
import { ProductDetailsPage } from '../screens/ProductDetailsPage';
import PorductInterface from '../interface/product';
import { BottomNavigation } from './BottomNavigation';

export type InventoryNavigationStackParamList = {
    BottomNavigation: undefined;
    InventoryDetails: { selectedProduct: PorductInterface };
    ProductDetails: { selectedProduct?: PorductInterface };

};

export const AppNavigation = () => {

    const Stack = createStackNavigator<InventoryNavigationStackParamList>();

    return (
        <Stack.Navigator >
            <Stack.Screen
                name="BottomNavigation"
                component={BottomNavigation}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="InventoryDetails"
                component={ProductDetailsPage}
            />
            <Stack.Screen
                name="ProductDetails"
                component={ProductDetailsPage}
                options={{
                    presentation: "modal",
                    headerTitle: "Detalles de Producto",
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    )
}
