import React, { useContext, useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsContext } from '../context/settings/SettingsContext';
import { TESTAPP } from "@env";

// Screens
import { LoginScreen } from '../screens/Onboarding/LoginScreen';
import { StartupScreen } from '../screens/Onboarding/StartupScreen';

import { InventoryNavigation } from './InventoryNavigation';
import { OnboardingScreen } from '../screens/Onboarding';
import { ProfileNavigation } from './ProfileNavigation';
import { SellsNavigation } from './SellsNavigation';
import { SuccesMessage } from '../screens/SuccesMessage';

export type InventoryNavigationStackParamList = {
    OnboardingScreen: undefined;

    // Login
    LoginPage: undefined;
    StartupScreen: undefined;

    // Navigation
    InventoryNavigation: undefined;
    ProfileNavigation: undefined;
    SellsNavigation: undefined;
};

const Stack = createNativeStackNavigator<InventoryNavigationStackParamList>();

export const AppNavigation = () => {
    const { handleCameraAvailable, updateBarCode } = useContext(SettingsContext);

    const authScreens = TESTAPP !== 'FALSE' ? (
        <>
            <Stack.Screen
                name="StartupScreen"
                component={StartupScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="LoginPage"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
        </>
    ) : null;

    const stackScreens = useMemo(() => (
        <>
            {authScreens}

            <Stack.Screen
                name="OnboardingScreen"
                component={OnboardingScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="SellsNavigation"
                component={SellsNavigation}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="InventoryNavigation"
                component={InventoryNavigation}
                options={{ headerShown: false }}
            />


            <Stack.Screen
                name="ProfileNavigation"
                component={ProfileNavigation}
                options={{
                    headerShown: false,
                    presentation: "modal"
                }}
            />

        </>
    ), [authScreens, handleCameraAvailable, updateBarCode]);

    return (
        <Stack.Navigator>
            {stackScreens}
        </Stack.Navigator>
    );
};
