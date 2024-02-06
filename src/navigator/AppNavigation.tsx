import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { ProductDetailsPage } from '../screens/ProductDetailsPage';
import PorductInterface from '../interface/product';
import { BottomNavigation } from './BottomNavigation';
import { SearchProductScreen } from '../screens/SearchProductScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type InventoryNavigationStackParamList = {
    BottomNavigation: undefined;
    InventoryDetails: { selectedProduct: PorductInterface };
    ProductDetails: { selectedProduct?: PorductInterface };
    SearchProduct: any
};

export const AppNavigation = () => {

    const Stack = createNativeStackNavigator<InventoryNavigationStackParamList>();

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
            <Stack.Screen
                name="SearchProduct"
                component={SearchProductScreen}
            />
        </Stack.Navigator>
    )
}
