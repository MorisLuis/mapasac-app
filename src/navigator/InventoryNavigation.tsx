import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { Inventory } from '../screens/Camera/Inventory';
import { ProductDetailsPage } from '../screens/ProductDetailsPage';
import PorductInterface from '../interface/product';

export type InventoryNavigationStackParamList = {
    Inventario: undefined;
    InventoryDetails: { selectedProduct: PorductInterface };
};

export const InventoryNavigation = () => {

    const Stack = createStackNavigator<InventoryNavigationStackParamList>();

    return (
        <Stack.Navigator >
            <Stack.Screen
                name="Inventario"
                component={Inventory}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="InventoryDetails"
                component={ProductDetailsPage}
            />
        </Stack.Navigator>
    )
}
