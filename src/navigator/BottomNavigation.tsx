import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Home';
import { ScannerNavigation } from './ScannerNavigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProfileNavigation } from './ProfileNavigation';


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
            <BottomTabIOS.Screen name="Home" options={{ title: 'Inicio' }} component={Home} />
            <BottomTabIOS.Screen name="Scanner" options={{ headerShown: false, title: "Escaner" }} component={ScannerNavigation} />
            <BottomTabIOS.Screen name="Profile" options={{ title: 'Perfil' }} component={ProfileNavigation} />
        </BottomTabIOS.Navigator>
    )
}
