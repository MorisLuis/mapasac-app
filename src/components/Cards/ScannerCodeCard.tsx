import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface ScannerCodeCardInterface {
    scannedCodes?: string,
    visible: boolean
}

export const ScannerCodeCard = ({
    scannedCodes,
    visible
}: ScannerCodeCardInterface) => {

    return visible ? (
        <View style={styles.ScannerCodeCard}>
            <Text>{scannedCodes}</Text>
        </View>
    )
        :
        null
};

const styles = StyleSheet.create({
    ScannerCodeCard: {
        backgroundColor: "white",
        paddingVertical: 10,
        borderRadius: 5,
        position: "absolute",
        top: "20%",
        left: "50%",
        width: 200,
        transform: [{ translateX: -100 }, { translateY: 0 }],
        display: "flex",
        textAlign: "center",
        alignItems: "center"
    },
    scannerCodeText: {
        color: "black",
    }
})
