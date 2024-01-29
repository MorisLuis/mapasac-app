import React, { useState } from 'react';

import CustomCamera from '../screens/Camera/Camera';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { InventoryNavigation } from './InventoryNavigation';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';

export const ScannerNavigation = () => {

    const TopTabs = createMaterialTopTabNavigator();
    const navigate = useNavigation();

    return (
        <TopTabs.Navigator>
            <TopTabs.Screen name="camera" options={{ title: "Camara" }} component={CustomCamera} />
            <TopTabs.Screen name="inventary" options={{ title: "Inventario", }} component={InventoryNavigation} />
        </TopTabs.Navigator>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%"
    },
    menu: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        width: '70%',
        top: 0,
        backgroundColor: 'transparent',
        zIndex: 1
    },
    menuItem: {
        backgroundColor: "#068fff8c",
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
        marginHorizontal: 5
    },
    tabContent: {
        fontSize: 14,
        minHeight: 20,
        minWidth: 60,
        flex: 1,
        textAlign: 'center',
    },
    selectedTabContent: {
        backgroundColor: "#068FFF",
    }
});