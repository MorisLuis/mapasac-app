import React from 'react';
import { ProductDetailsPage } from '../screens/ProductDetailsPage';
import PorductInterface from '../interface/product';
import { BottomNavigation } from './BottomNavigation';
import { SearchProductScreen } from '../screens/SearchProductScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImageGallery from '../screens/Camera/ImageGallery';
import { StatisticPage } from '../screens/Home/StatisticPage';

export type InventoryNavigationStackParamList = {
    BottomNavigation: undefined;
    InventoryDetails: { selectedProduct: PorductInterface };
    ProductDetails: { selectedProduct?: PorductInterface };
    ImageGallery: any;
    SearchProduct: any;
    statisticsPage: {estatus: string}
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

            {/* Inventory pages */}
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

            {/* Camera Pages */}
            <Stack.Screen
                name="ImageGallery"
                component={ImageGallery}
                options={{
                    presentation: "modal",
                    headerTitle: "Galeria",
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name="SearchProduct"
                component={SearchProductScreen}
            />

            {/* Statistics Page */}
            <Stack.Screen
                name="statisticsPage"
                component={StatisticPage}
                options={{
                    headerBackTitle: "Atrás",
                    headerTitle: "Productos"
                }}
            />
        </Stack.Navigator>
    )
}
