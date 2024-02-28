import React, { useContext } from 'react';
import { ProductDetailsPage } from '../screens/ProductDetailsPage';
import PorductInterface from '../interface/product';
import { BottomNavigation } from './BottomNavigation';
import { SearchProductScreen } from '../screens/SearchProductScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatisticPage } from '../screens/Home/StatisticPage';
import { LoginScreen } from '../screens/LoginScreen';
import { AuthContext } from '../context/auth/AuthContext';

export type InventoryNavigationStackParamList = {
    LoginPage: any;
    BottomNavigation: undefined;
    InventoryDetails: { selectedProduct: PorductInterface };
    ProductDetails: { selectedProduct?: PorductInterface };
    ImageGallery: any;
    SearchProduct: any;
    statisticsPage: { estatus: string },
    profileApp: any
};

export const AppNavigation = () => {

    const Stack = createNativeStackNavigator<InventoryNavigationStackParamList>();
    const { status } = useContext(AuthContext);

    return (
        <Stack.Navigator >
            {
                (status !== 'authenticated') ?
                    <Stack.Screen
                        name="LoginPage"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                    :
                    <>
                        <Stack.Screen
                            name="BottomNavigation"
                            component={BottomNavigation}
                            options={{ headerShown: false }}
                        />

                        {/* Inventory pages */}
                        <Stack.Screen
                            name="InventoryDetails"
                            component={ProductDetailsPage}
                            options={{
                                headerTitle: "Detalles de Producto",
                                headerShown: true,
                                headerBackTitle: "Atrás"
                            }}
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

                        {/* Statistics Page */}
                        <Stack.Screen
                            name="statisticsPage"
                            component={StatisticPage}
                            options={{
                                headerBackTitle: "Atrás",
                                headerTitle: "Productos"
                            }}
                        />
                    </>
            }
        </Stack.Navigator>
    )
}
