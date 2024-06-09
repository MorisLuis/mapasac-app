import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScannerNavigation } from './ScannerNavigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProfileNavigation } from './ProfileNavigation';
import { colores, globalFont } from '../theme/appTheme';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export type BottomNavigationStackParamList = {
    Scanner: undefined;
    Profile: undefined;
};

export const BottomNavigation = () => {

    const BottomTabIOS = createBottomTabNavigator<BottomNavigationStackParamList>();

    return (
        <SafeAreaProvider>
            <SafeAreaView edges={['bottom']} style={{ flex: 1, backgroundColor: colores.background_color }}>
                <BottomTabIOS.Navigator
                    screenOptions={({ route, navigation }) => ({
                        tabBarIcon: ({ focused }) => {
                            let iconName: string = '';
                            let iconColor: string = focused ? colores.color_yellow : colores.text_color_light;

                            switch (route.name) {
                                case 'Scanner':
                                    iconName = focused ? 'scan' : 'scan-outline';
                                    break;
                                case 'Profile':
                                    iconName = focused ? 'person' : 'person-outline';
                                    break;
                            }

                            return (
                                <View>
                                    <Icon name={iconName} size={20} color={iconColor} />
                                </View>
                            )
                        },
                        tabBarStyle: {
                            backgroundColor: colores.background_color,
                            borderTopColor: colores.color_border_secondary,
                            height: hp("7.5%"),
                            paddingBottom: hp("1%"),
                        },
                        tabBarLabelStyle: {
                            color: route.name === navigation.getState().routes[navigation.getState().index].name ? colores.color_yellow : colores.text_color_light,
                            paddingBottom: hp("0.5%"),
                            fontSize: globalFont.font_sm
                        },
                        tabBarItemStyle: {
                            paddingVertical: hp("0.5%"),
                        }
                    })}
                >
                    <BottomTabIOS.Screen name="Scanner" options={{ headerShown: false, title: "Escaner" }} component={ScannerNavigation} />
                    <BottomTabIOS.Screen name="Profile" options={{ headerShown: false, title: 'Perfil' }} component={ProfileNavigation} />
                </BottomTabIOS.Navigator>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
