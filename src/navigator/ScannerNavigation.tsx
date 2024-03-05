import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomCamera from '../screens/Camera/Camera';
import { Inventory } from '../screens/Camera/Inventory';
import { CustomTabBar } from '../components/Navigation/CustomTabBar';

const TopTabs = createMaterialTopTabNavigator();

export const ScannerNavigation = () => {
    const { top } = useSafeAreaInsets();

    return (
        <View style={{ flex: 1 }}>
            {/* Contenido de las pantallas */}
            <TopTabs.Navigator
                tabBar={(props) => <CustomTabBar {...props} />}
            >
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
    );
};