import React from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Inventory } from '../screens/Camera/Inventory';
import { CustomTabBar } from '../components/Navigation/CustomTabBar';
import CameraTest from '../screens/Camera/CameraTest';

export type ScannerNavigationStackParamList = {
    "[ScannerNavigation] - camera": undefined,
    "[ScannerNavigation] - inventory": undefined;
}

export const ScannerNavigation = () => {

    const TopTabs = createMaterialTopTabNavigator<ScannerNavigationStackParamList>();
    return (
        <View style={{ flex: 1 }}>
            <TopTabs.Navigator
                tabBar={(props) => <CustomTabBar {...props} />}
            >
                <TopTabs.Screen
                    name="[ScannerNavigation] - camera"
                    options={{ title: "Camara" }}
                    component={CameraTest}
                />
                <TopTabs.Screen
                    name="[ScannerNavigation] - inventory"
                    options={{ title: "Inventario" }}
                    component={Inventory}
                />
            </TopTabs.Navigator>
        </View>
    );
};