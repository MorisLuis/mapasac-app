import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import CustomCamera from '../screens/Camera/Camera';
import { LogBox, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Inventory } from '../screens/Camera/Inventory';
import { AddProduct } from '../screens/Camera/AddProduct';
import { CustomTabBar } from '../components/Common/CustomTabBar';
import { SafeAreaView } from 'react-native-safe-area-context';


LogBox.ignoreLogs(['Sending'])
const Tab = createMaterialTopTabNavigator();


export const ScannerNavigation = () => {

    const [selectedTab, setSelectedTab] = useState('Camera');

    const renderScreen = () => {
        switch (selectedTab) {
            case 'Camera':
                return <CustomCamera />;
            case 'Inventory':
                return <Inventory />;
            case 'AddProduct':
                return <AddProduct />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.menu}>
                <TouchableOpacity onPress={() => setSelectedTab('Camera')}  style={styles.menuItem}>
                    <Text style={styles.tabContent}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedTab('Inventory')}  style={styles.menuItem}>
                    <Text style={styles.tabContent}>Inventario</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedTab('AddProduct')}  style={styles.menuItem}>
                    <Text style={styles.tabContent}>+</Text>
                </TouchableOpacity>
            </SafeAreaView>

            {renderScreen()}
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "orange",
        height: "100%"
    },
    menu: {
        flexDirection: 'row',
        //justifyContent: 'space-around',
        alignItems: 'center',
        height: 100,
        position: 'absolute',
        width: '100%',
        top: 0,
        backgroundColor: 'transparent',
        zIndex: 1
    },
    menuItem: {
        backgroundColor: "yellow",
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
});