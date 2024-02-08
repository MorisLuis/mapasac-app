import React from 'react';

import { PersonalInformation } from '../screens/Profile/PersonalInformation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';

export const ProfileNavigation = () => {

    const ProfileTabs = createNativeStackNavigator();

    return (
        <ProfileTabs.Navigator>
            <ProfileTabs.Screen
                name="profile"
                options={{ 
                    headerShown: false,
                }}
                component={ProfileScreen}
            />
            <ProfileTabs.Screen
                name="personalInformation"
                component={PersonalInformation}
                options={{
                    headerTitle: "Información Personal",
                    //headerShown: false
                }}
            />
        </ProfileTabs.Navigator>
    )
};
