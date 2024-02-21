import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home/Home';

export const HomeNavigation = () => {

    const ProfileTabs = createNativeStackNavigator();

    return (
        <ProfileTabs.Navigator>
            <ProfileTabs.Screen
                name="home"
                options={{ 
                    headerShown: false,
                }}
                component={Home}
            />
        </ProfileTabs.Navigator>
    )
};
