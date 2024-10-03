import React, { useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CustomHeader } from '../components/Ui/CustomHeader';

// Screens
import CustomTabBar from '../components/Navigation/CustomTabBar';
import { ProductSellsRestaurantInterface } from '../interface/productSells';
import { SellsRestaurantScreen } from '../screens/SellsRestaurants/SellsRestaurantScreen';
import { SellsRestaurantDataScreen } from '../screens/SellsRestaurants/SellsRestaurantDataScreen';
import { SelectAmountRestaurantScreen } from '../screens/SellsRestaurants/SelectAmountRestaurantScreen';
import { SellsRestaurantBagScreen } from '../screens/SellsRestaurants/SellsRestaurantsBag/SellsRestaurantsBagScreen';
import { ConfirmationSellsRestaurantScreen } from '../screens/SellsRestaurants/SellsRestaurantsBag/ConfirmationSellsRestaurantScreen';
import { EditProductSellRestaurantInBag } from '../screens/SellsRestaurants/SellsRestaurantsBag/EditProductSellRestaurantInBag';
import { LocationScreen } from '../screens/SellsRestaurants/SellsRestaurantsBag/LocationScreen';
import { inputGoogleValue } from '../components/Inputs/GooglePlacesAutocomplete';
import { CommentsInProduct } from '../screens/SellsRestaurants/CommentsInProduct';

// useNavigation() type.
export type SellsRestaurantsNavigationStackParamList = {
    SellsRestaurantsScreen: undefined;
    SellsRestaurantsDataScreen: undefined;
    BagSellsRestaurantsScreen: undefined;

    "[Modal] - editProductSellRestaurantsInBag": { product: ProductSellsRestaurantInterface };
    "[Modal] - EditLocation": { locationValue?: inputGoogleValue };
    "[Modal] - commentInProduct": { comments: string };
    "[Modal] - PiecesScreen": { valueDefault: string, unit?: string, from: string };
    "[SellsRestaurants] - confirmationScreen": { addressDirection?: inputGoogleValue };
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
                name="[Modal] - editProductSellRestaurantsInBag"
                component={EditProductSellRestaurantInBag}
                options={{ presentation: 'transparentModal', headerShown: false }}
            />

            <Stack.Screen
                name="[Modal] - commentInProduct"
                component={CommentsInProduct}
                options={{ presentation: 'transparentModal', headerShown: false }}
            />

            <Stack.Screen
                name="[Modal] - EditLocation"
                component={LocationScreen}
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
