import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScannerNavigation } from './ScannerNavigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProfileNavigation } from './ProfileNavigation';
import { colores } from '../theme/appTheme';
import { View } from 'react-native';

export type BottomNavigationStackParamList = {
    Scanner: undefined;
    Profile: undefined;
};

export const BottomNavigation = () => {

    const BottomTabIOS = createBottomTabNavigator<BottomNavigationStackParamList>();

    return (
        <BottomTabIOS.Navigator
            screenOptions={({ route, navigation }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName: string = '';
                    let iconColor: string = focused ? colores.color_yellow : colores.text_color_light;

                    switch (route.name) {
                        case 'Scanner':
                            iconName = focused ? 'scan' : 'scan-outline'
                            break;
                        case 'Profile':
                            iconName = focused ? 'person' : 'person-outline'
                            break;
                    }

                    return (
                        <View>
                            <Icon name={iconName} size={20} color={iconColor} />
                        </View>
                    )
                },
                tabBarLabelStyle: {
                    color: route.name === navigation.getState().routes[navigation.getState().index].name ? colores.color_yellow : colores.text_color_light
                },
                tabBarStyle: {
                    backgroundColor: colores.background_color,
                    borderTopColor: colores.color_border,
                },
            })}
        >
            <BottomTabIOS.Screen name="Scanner" options={{ headerShown: false, title: "Escaner" }} component={ScannerNavigation} />
            <BottomTabIOS.Screen name="Profile" options={{ headerShown: false, title: 'Perfil' }} component={ProfileNavigation} />
        </BottomTabIOS.Navigator>
    )

}
