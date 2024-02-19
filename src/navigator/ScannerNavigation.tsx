import React from 'react';

import CustomCamera from '../screens/Camera/Camera';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Inventory } from '../screens/Camera/Inventory';

export const ScannerNavigation = () => {

    const TopTabs = createMaterialTopTabNavigator();
    const { top } = useSafeAreaInsets();

    return (
        <View
            style={{
                marginTop: top + 10,
                flex: 1
            }}
        >
            <TopTabs.Navigator>
                <TopTabs.Screen
                    name="camera"
                    options={{ title: "Camara" }}
                    component={CustomCamera}
                />

                <TopTabs.Screen
                    name="Inventario"
                    component={Inventory}
                />
            </TopTabs.Navigator>
        </View>
    )
};
