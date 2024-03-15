import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colores, globalFont, globalStyles } from '../theme/appTheme'
import { buttonStyles } from '../theme/UI/buttons'
import Icon from 'react-native-vector-icons/Ionicons';


export const SuccesMessage = () => {

    return (
        <SafeAreaView style={[styles.SuccesMessage]}>
            <TouchableOpacity style={[styles.header]} onPress={() => console.log("close")}>
                <Icon name="close-outline" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.content}>
                <Text style={styles.title}>Tu inventario ha sido exitoso</Text>
                <Text style={styles.text}>Tu inventario con el folio ### ha sido realizado y lo ha recibido.</Text>
                <TouchableOpacity style={[buttonStyles.button_small, styles.actions]} onPress={() => console.log("close")}>
                    <Text style={buttonStyles.buttonTextSecondary}>Ver resumen</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    SuccesMessage: {
        display: "flex",
        height: "100%",
        width: "100%",
        backgroundColor: colores.background_color,
        zIndex: 9999,
        padding: globalStyles.globalPadding.padding,
        justifyContent: "center"
    },
    header: {
        position: 'absolute',
        top: 0,
        left: globalStyles.globalPadding.padding,
        backgroundColor: colores.background_color_tertiary,
        borderWidth: 1,
        borderColor: colores.color_border_secondary,
        borderRadius: 100,
        padding: 8
    },
    content: {
        padding: globalStyles.globalPadding.padding,
    },
    title: {
        fontSize: globalFont.font_big,
        width: "80%",
        color: colores.color_tertiary,
        fontWeight: "bold",
        marginBottom: globalStyles.globalMarginBottom.marginBottom
    },
    text: {
        fontSize: globalFont.font_normal,
        width: "80%",
        color: colores.color_tertiary,
        marginBottom: globalStyles.globalMarginBottom.marginBottom
    },
    actions: {
        width: "40%",
    }
})