import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native';
import { Text } from 'react-native'
import { View } from 'react-native'
import { InventoryFooter } from './InventoryFooter';
import { colores, globalStyles } from '../../theme/appTheme';

export const TypeMovementScreen = () => {

    return (
        <SafeAreaView style={styles.TypeMovementScreen}>
            <View style={styles.content}>
                <Text>TypeMovementScreen</Text>
            </View>
            <InventoryFooter buttonNextAvailable={false} />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    TypeMovementScreen: {
        backgroundColor: colores.background_color,
        height: "100%",
        //backgroundColor:"red",
    },

    content: {
        padding: globalStyles.globalPadding.padding,
        minHeight: "auto",
        height: "90%"
    }
});