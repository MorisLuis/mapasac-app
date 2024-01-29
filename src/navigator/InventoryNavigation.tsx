import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { Inventory } from '../screens/Camera/Inventory';
import { ProductDetailsPage } from '../screens/ProductDetailsPage';

export type InventoryNavigationStackParamList = {
    Inventario: undefined;
    InventaryDetails: undefined;
};


export const InventoryNavigation = () => {
    
    const Stack = createStackNavigator<InventoryNavigationStackParamList>();

    return (
        <Stack.Navigator >
            <Stack.Screen name="Inventario" component={Inventory} options={{ headerShown: false }} />
            <Stack.Screen name="InventaryDetails" component={ProductDetailsPage} />
        </Stack.Navigator>
    )
}
