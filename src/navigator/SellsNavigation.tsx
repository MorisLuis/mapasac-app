import React, { useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { SellsScreen } from '../screens/Sells/SellsScreen';
import { CustomTopBar } from '../components/Navigation/CustumTopBar';
import { SellsDataScreen } from '../screens/Sells/SellsDataScreen';
import { SelectAmountScreen } from '../screens/Sells/SelectAmountScreen';
import { CustomHeader } from '../components/Ui/CustomHeader';
import { SelectClassScreen } from '../screens/Sells/SelectClassScreen';
import { SelectUnitScreen } from '../screens/Sells/SelectUnitsScreen';

export type SellsNavigationStackParamList = {
    // Navigation
    sellsScreen: undefined;
    sellsDataScreen: undefined;

    piecesScreen: undefined;
    priceScreen: undefined;
    classScreen: undefined;
    unitScreen: undefined;
};

const Stack = createNativeStackNavigator<SellsNavigationStackParamList>();

export const SellsNavigation = () => {

    const stackScreens = useMemo(() => (
        <>
            <Stack.Screen
                name="sellsScreen"
                component={SellsScreen}
                options={() => ({
                    header: props => (
                        <CustomTopBar />
                    )
                })}
            />

            <Stack.Screen
                name="sellsDataScreen"
                component={SellsDataScreen}
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
                name="piecesScreen"
                component={SelectAmountScreen}
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
                name="priceScreen"
                component={SelectAmountScreen}
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
                name="unitScreen"
                component={SelectUnitScreen}
                options={({ navigation }: any) => ({
                    presentation: "modal",
                    header: props => (
                        <CustomHeader
                            {...props}
                            title={"Clase"}
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
                name="classScreen"
                component={SelectClassScreen}
                options={({ navigation }: any) => ({
                    presentation: "modal",
                    header: props => (
                        <CustomHeader
                            {...props}
                            title={"Clase"}
                            navigation={navigation}
                            backCustum={true}
                            back={() => {
                                navigation.goBack()
                            }}
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
