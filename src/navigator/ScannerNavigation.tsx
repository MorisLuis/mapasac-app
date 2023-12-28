import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Camera } from '../screens/Camera/Camera';
import { LogBox, StyleSheet } from 'react-native';
import { Inventory } from '../screens/Camera/Inventory';
import { AddProduct } from '../screens/Camera/AddProduct';
import { CustomTabBar } from '../components/Common/CustomTabBar';


LogBox.ignoreLogs(['Sending'])
const Tab = createMaterialTopTabNavigator();

export const ScannerNavigation = () => {
    const { top: paddingTop } = useSafeAreaInsets();

    useEffect(() => {
        console.log('ScannerNavigation');
    }, []);

    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tab.Screen name="Camera" component={Camera} options={{ title: 'Camara' }} />
            <Tab.Screen name="Inventory" component={Inventory} options={{ title: 'Inventario' }} />
            <Tab.Screen name="+" component={AddProduct} options={{ title: '+' }} />
        </Tab.Navigator>

    );
};