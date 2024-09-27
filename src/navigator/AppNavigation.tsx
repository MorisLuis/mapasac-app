import React, { useContext, useMemo } from 'react';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsContext } from '../context/settings/SettingsContext';

// Screens
import { LoginScreen } from '../screens/Onboarding/LoginScreen';
import { InventoryNavigation, InventoryNavigationStackParamList } from './InventoryNavigation';
import { OnboardingScreen } from '../screens/Onboarding';
import { ProfileNavigation } from './ProfileNavigation';
import { SellsNavigation, SellsNavigationStackParamList } from './SellsNavigation';
import { StartupScreen } from '../screens/Onboarding/StartupScreen';
import { ClosingScreen } from '../screens/ClosingScreen';
import { SuccesMessage } from '../screens/SuccesMessage';
import { LoadingScreen } from '../screens/LoadingScreen';
import { ModuleInterface } from '../interface/utils';
import { SessionExpiredScreen } from '../screens/SessionExpired';

// useNavigation() type. 
export type AppNavigationProp = NativeStackNavigationProp<Partial<AppNavigationStackParamList>>;
export type CombineNavigationProp = NativeStackNavigationProp<Partial<CombinedSellsAndInventoryNavigationStackParamList>>;

export type CombinedInventoryAndAppNavigationStackParamList = InventoryNavigationStackParamList & AppNavigationStackParamList;
export type CombinedSellsAndAppNavigationStackParamList = SellsNavigationStackParamList & AppNavigationStackParamList;
export type CombinedSellsAndInventoryNavigationStackParamList = SellsNavigationStackParamList & InventoryNavigationStackParamList & AppNavigationStackParamList;

export type AppNavigationStackParamList = {
    OnboardingScreen: undefined;
    ClosingPage: undefined;
    SessionExpiredScreen: undefined;
    LoadingPage?: { message?: string, loading?: boolean };

    // Login
    LoginPage: undefined;
    StartupScreen: undefined;

    // Navigation
    InventoryNavigation: undefined;
    ProfileNavigation: undefined;
    SellsNavigation: undefined;

    succesMessageScreen: {
        redirection: keyof AppNavigationStackParamList,
        from: ModuleInterface['module'],
        numberOfProducts: string;
        importe?: number
    };
};

const Stack = createNativeStackNavigator<AppNavigationStackParamList>();

export const AppNavigation = () => {
    const { handleCameraAvailable, updateBarCode } = useContext(SettingsContext);

    const stackScreens = useMemo(() => (
        <>
            <Stack.Screen
                name="StartupScreen"
                component={StartupScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='SessionExpiredScreen'
                component={SessionExpiredScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="LoginPage"
                component={LoginScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='LoadingPage'
                component={LoadingScreen}
                options={{ headerShown: false }}
            />

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
    ), [handleCameraAvailable, updateBarCode]);

    return (
        <Stack.Navigator>
            {stackScreens}
        </Stack.Navigator>
    );
};
