import React, { useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CustomHeader } from '../components/Ui/CustomHeader';

// Screens
import { SelectClient } from '../screens/Sells/SellsBag/SelectClient';
import CustomTabBar from '../components/Navigation/CustomTabBar';
import { ProductSellsRestaurantInterface } from '../interface/productSells';
import { SellsRestaurantScreen } from '../screens/SellsRestaurants/SellsRestaurantScreen';
import { SellsRestaurantDataScreen } from '../screens/SellsRestaurants/SellsRestaurantDataScreen';
import { SelectAmountRestaurantScreen } from '../screens/SellsRestaurants/SelectAmountRestaurantScreen';
import { SellsRestaurantBagScreen } from '../screens/SellsRestaurants/SellsRestaurantsBag/SellsRestaurantsBagScreen';
import { ConfirmationSellsRestaurantScreen } from '../screens/SellsRestaurants/SellsRestaurantsBag/ConfirmationSellsRestaurantScreen';
import { EditProductSellRestaurantInBag } from '../screens/SellsRestaurants/SellsRestaurantsBag/EditProductSellRestaurantInBag';

// useNavigation() type.
export type SellsRestaurantsNavigationStackParamList = {
    SellsRestaurantsScreen: undefined;
    SellsRestaurantsDataScreen: undefined;
    BagSellsRestaurantsScreen: undefined;

    "[Modal] - editProductSellRestaurantsInBag": { product: ProductSellsRestaurantInterface };
    "[Modal] - PiecesScreen": { valueDefault: string, unit?: string, from: string };
    "[Modal] - SelectClient": undefined;

    "[SellsRestaurants] - confirmationScreen": undefined;
};

const Stack = createNativeStackNavigator<SellsRestaurantsNavigationStackParamList>();

export const SellsRestaurantsNavigation = () => {

    const stackScreens = useMemo(() => (
        <>
            <Stack.Screen
                name="SellsRestaurantsScreen"
                component={SellsRestaurantScreen}
                options={() => ({
                    header: props => (
                        <CustomTabBar Type='Sells-Restaurant' />
                    )
                })}
            />

            <Stack.Screen
                name="SellsRestaurantsDataScreen"
                component={SellsRestaurantDataScreen}
                options={({ navigation }: any) => ({
                    presentation: "modal",
                    header: props => (
                        <CustomHeader
                            {...props}
                            title={""}
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
                name="BagSellsRestaurantsScreen"
                component={SellsRestaurantBagScreen}
                options={({ navigation }: any) => ({
                    presentation: "modal",
                    header: props => (
                        <CustomHeader
                            {...props}
                            title={"Ventas"}
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
                name="[Modal] - PiecesScreen"
                component={SelectAmountRestaurantScreen}
                options={({ navigation }: any) => ({
                    presentation: "modal",
                    header: props => (
                        <CustomHeader
                            {...props}
                            title={"Cantidad"}
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
                name="[Modal] - SelectClient"
                component={SelectClient}
                options={({ navigation }: any) => ({
                    presentation: "modal",
                    header: props => (
                        <CustomHeader
                            {...props}
                            title={"Cliente"}
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
                name="[Modal] - editProductSellRestaurantsInBag"
                component={EditProductSellRestaurantInBag}
                options={{ presentation: 'transparentModal', headerShown: false }}
            />

            <Stack.Screen
                name="[SellsRestaurants] - confirmationScreen"
                component={ConfirmationSellsRestaurantScreen}
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
        </>
    ), []);

    return (
        <Stack.Navigator>
            {stackScreens}
        </Stack.Navigator>
    );
};
