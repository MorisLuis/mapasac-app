import React, { useState } from 'react';

import CustomCamera from '../screens/Camera/Camera';
import { LogBox, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Inventory } from '../screens/Camera/Inventory';
import { AddProduct } from '../screens/Camera/AddProduct';
import { SafeAreaView } from 'react-native-safe-area-context';

LogBox.ignoreLogs(['Sending'])

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
                <TouchableOpacity onPress={() => setSelectedTab('Camera')} style={[styles.menuItem, selectedTab === 'Camera' && styles.selectedTabContent]}>
                    <Text style={styles.tabContent}>Camara</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedTab('Inventory')} style={[styles.menuItem, selectedTab === 'Inventory' && styles.selectedTabContent]}>
                    <Text style={styles.tabContent}>Inventario</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedTab('AddProduct')} style={[styles.menuItem, selectedTab === 'AddProduct' && styles.selectedTabContent]}>
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
        height: "100%"
    },
    menu: {
        flexDirection: 'row',
        alignItems: 'center',
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
    selectedTabContent: {
        backgroundColor: "orange"
    }
});