import React, { useMemo } from 'react';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import ClassInterface from '../interface/class';
import { UnitData } from '../interface/units';
import { CustomTopBar } from '../components/Navigation/CustumTopBar';
import { CustomHeader } from '../components/Ui/CustomHeader';

// Screens
import { SelectClassScreen } from '../screens/Sells/SelectClassScreen';
import { SellsScreen } from '../screens/Sells/SellsScreen';
import { SellsDataScreen } from '../screens/Sells/SellsDataScreen';
import { SelectAmountScreen } from '../screens/Sells/SelectAmountScreen';
import { SelectUnitScreen } from '../screens/Sells/SelectUnitsScreen';
import { SellsBagScreen } from '../screens/Sells/SellsBag/SellsBagScreen';
import { ConfirmationSellsScreen } from '../screens/Sells/SellsBag/ConfirmationSellsScreen';
import { EditProductSellInBag } from '../screens/Sells/EditProductSellInBag';
import { ProductSellsInterface } from '../interface/productSells';
import { SelectClient } from '../screens/Sells/SelectClient';
import ClientInterface from '../interface/utils';

// useNavigation() type.
export type SellsNavigationProp = NativeStackNavigationProp<Partial<SellsNavigationStackParamList>>;

export type SellsNavigationStackParamList = {
    SellsScreen: undefined;
    SellsDataScreen: {
        totalClasses?: number;
        descripcio?: string;
        image?: string;
        cvefamilia?: number;
        pieces?: string;
        price?: string;
        typeClass?: ClassInterface;
        units?: UnitData;
        productSellData?: { idinvearts: number, capa: string, idinveclas: number };
    };
    BagSellsScreen: undefined;

    "[Modal] - editProductSellInBag": { product: ProductSellsInterface };
    "[Modal] - PiecesScreen": { valueDefault: string, unit?: string, from: string };
    "[Modal] - PriceScreen": { valueDefault: string, unit?: string, from: string };
    "[Modal] - UnitScreen": { valueDefault: UnitData };
    "[Modal] - ClassScreen": { valueDefault: ClassInterface, cvefamilia?: number, descripcio: string, image: string, totalClasses: number };
    "[Modal] - SelectClient": undefined;

    "[Sells] - confirmationScreen": { client?: ClientInterface };
};

const Stack = createNativeStackNavigator<SellsNavigationStackParamList>();

export const SellsNavigation = () => {

    const stackScreens = useMemo(() => (
        <>
            <Stack.Screen
                name="SellsScreen"
                component={SellsScreen}
                options={() => ({
                    header: props => (
                        <CustomTopBar />
                    )
                })}
            />

            <Stack.Screen
                name="SellsDataScreen"
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
                name="BagSellsScreen"
                component={SellsBagScreen}
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
                name="[Modal] - PriceScreen"
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
                name="[Modal] - UnitScreen"
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
                name="[Modal] - ClassScreen"
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
                name="[Modal] - editProductSellInBag"
                component={EditProductSellInBag}
                options={{ presentation: 'transparentModal', headerShown: false }}
            />

            <Stack.Screen
                name="[Sells] - confirmationScreen"
                component={ConfirmationSellsScreen}
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
