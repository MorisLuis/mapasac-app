import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScannerNavigation } from './ScannerNavigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProfileNavigation } from './ProfileNavigation';
import { HomeNavigation } from './HomeNavigation';


export type BottomNavigationStackParamList = {
    Home: any;
    Scanner: any;
    Profile: any;
};

export const BottomNavigation = () => {

    const BottomTabIOS = createBottomTabNavigator<BottomNavigationStackParamList>();

    return (
        <BottomTabIOS.Navigator
            sceneContainerStyle={{
                backgroundColor: 'white'
            }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {

                    let iconName: string = '';
                    switch (route.name) {
                        case 'Home':
                            iconName = 'home-outline'
                            break;

                        case 'Scanner':
                            iconName = 'scan-outline'
                            break;

                        case 'Profile':
                            iconName = 'person-outline'
                            break;
                    }

                    return <Icon name={iconName} size={20} color={color} />
                }
            })}
        >
            <BottomTabIOS.Screen name="Home" options={{ title: 'Inicio' }} component={HomeNavigation} />
            <BottomTabIOS.Screen name="Scanner" options={{ headerShown: false, title: "Escaner" }} component={ScannerNavigation} />
            <BottomTabIOS.Screen name="Profile" options={{ headerShown: false, title: 'Perfil'}} component={ProfileNavigation} />
        </BottomTabIOS.Navigator>
    )
}
