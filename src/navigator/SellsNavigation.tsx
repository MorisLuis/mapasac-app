import React, { useContext, useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsContext } from '../context/settings/SettingsContext';

// Screens
import { SellsScreen } from '../screens/Sells/SellsScreen';
import { CustomTopBar } from '../components/Navigation/CustumTopBar';
import { SellsFamilyScreen } from '../screens/Sells/SellsFamilyScreen';
import { SellsFamilyScreenStep3 } from '../screens/Sells/SellsFamilyScreenStep3';

export type SellsNavigationStackParamList = {
    // Navigation
    sellsScreen: undefined;
    sellsFamilyScreen: { cvefamilia: number, descripcio: string };
    sellsFamilyScreen3: { cvefamilia?: number, descripcio?: string };

};

const Stack = createNativeStackNavigator<SellsNavigationStackParamList>();

export const SellsNavigation = () => {
    const { handleCameraAvailable, updateBarCode } = useContext(SettingsContext);

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
                name="sellsFamilyScreen"
                component={SellsFamilyScreen}
                options={{ presentation: 'transparentModal', headerShown: false }}
            />


            <Stack.Screen
                name="sellsFamilyScreen3"
                component={SellsFamilyScreenStep3}
                options={{ presentation: 'transparentModal', headerShown: false }}
            />
        </>
    ), [handleCameraAvailable, updateBarCode]);

    return (
        <Stack.Navigator>
            {stackScreens}
        </Stack.Navigator>
    );
};
