import React, { useContext, useMemo } from 'react';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsContext } from '../context/settings/SettingsContext';
import { TESTAPP } from "@env";

// Screens
import { LoginScreen } from '../screens/Onboarding/LoginScreen';
import { InventoryNavigation, InventoryNavigationStackParamList } from './InventoryNavigation';
import { OnboardingScreen } from '../screens/Onboarding';
import { ProfileNavigation } from './ProfileNavigation';
import { SellsNavigation, SellsNavigationStackParamList } from './SellsNavigation';
import { StartupScreen } from '../screens/Onboarding/StartupScreen';
import { ClosingScreen } from '../screens/ClosingScreen';
import { SuccesMessage } from '../screens/SuccesMessage';

// useNavigation() type. 
export type AppNavigationProp = NativeStackNavigationProp<Partial<AppNavigationStackParamList>>;
export type CombinedInventoryAndAppNavigationStackParamList = InventoryNavigationStackParamList & AppNavigationStackParamList;
export type CombinedSellsAndAppNavigationStackParamList = SellsNavigationStackParamList & AppNavigationStackParamList;

export type AppNavigationStackParamList = {
    OnboardingScreen: undefined;
    ClosingPage: undefined;

    // Login
    LoginPage: undefined;
    StartupScreen: undefined;

    // Navigation
    InventoryNavigation: undefined;
    ProfileNavigation: undefined;
    SellsNavigation: undefined;

    succesMessageScreen: { message: string, redirection: keyof AppNavigationStackParamList };
};

const Stack = createNativeStackNavigator<AppNavigationStackParamList>();

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

            <Stack.Screen
                name="ClosingPage"
                component={ClosingScreen}
                options={{
                    headerShown: false,
                    presentation: "transparentModal"
                }}
            />

            <Stack.Screen
                name="succesMessageScreen"
                component={SuccesMessage}
                options={{ headerShown: false }}
            />

        </>
    ), [authScreens, handleCameraAvailable, updateBarCode]);

    return (
        <Stack.Navigator>
            {stackScreens}
        </Stack.Navigator>
    );
};
