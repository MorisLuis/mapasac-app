import React, { useContext } from 'react';

import { ProductDetailsPage } from '../screens/ProductDetailsPage';
import PorductInterface from '../interface/product';
import { BottomNavigation } from './BottomNavigation';
import { SearchProductScreen } from '../screens/SearchProductScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { AuthContext } from '../context/auth/AuthContext';
import { BagInventoryNavigation } from './BagInventoryNavigation';
import { buttonStyles } from '../theme/UI/buttons';
import { Text, TouchableOpacity } from 'react-native';
import { CustomHeader } from '../components/Ui/CustomHeader';

export type InventoryNavigationStackParamList = {
    LoginPage: any;
    BottomNavigation: undefined;
    BagInventory: undefined;
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
        <Stack.Navigator>
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

                        <Stack.Screen
                            name="BagInventory"
                            component={BagInventoryNavigation}
                            options={({ navigation }) => ({
                                presentation: "modal",
                                headerShown: true,
                                title: 'Inventario',
                                headerLeft: () => (
                                    <TouchableOpacity
                                        onPress={() => navigation.goBack()}
                                        style={[buttonStyles.button, buttonStyles.white, { width: "auto"}]}
                                    >
                                        <Text>Cerrar</Text>
                                    </TouchableOpacity>

                                ),
                            })}
                        />

                        {/* Inventory pages */}
                        <Stack.Screen
                            name="InventoryDetails"
                            component={ProductDetailsPage}
                            options={({ navigation }) => ({
                                header: props => <CustomHeader {...props} title="Detalles de Producto" navigation={navigation}  />,
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
                    </>
            }
        </Stack.Navigator>
    )
}
