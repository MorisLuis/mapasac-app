import React from 'react';

import { PersonalInformation } from '../screens/Profile/PersonalInformation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import { SettingsScreen } from '../screens/Profile/SettingsScreen';

export const ProfileNavigation = () => {

    const ProfileTabs = createNativeStackNavigator();

    return (
        <ProfileTabs.Navigator>
            <ProfileTabs.Screen
                name="profile"
                options={{ headerShown: true, title: "Perfil" }}
                component={ProfileScreen}
            />
            <ProfileTabs.Screen
                name="personalInformation"
                component={PersonalInformation}
                options={{
                    headerTitle: "Información Personal",
                    headerShown: true,
                    headerBackTitle: "Atrás"
                }}
            />
            <ProfileTabs.Screen
                name="settingsSceen"
                component={SettingsScreen}
                options={{
                    headerTitle: "Configuración",
                    headerShown: true,
                    headerBackTitle: "Atrás"
                }}
            />
        </ProfileTabs.Navigator>
    )
};
