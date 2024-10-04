import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window'); // Obtén la altura de la pantalla

export const TestScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.modal}>
                <Text style={styles.text}>Este es un modal que ocupa el 50% de la pantalla</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '100%', // Ancho del modal
        height: height * 0.5, // 50% de la altura de la pantalla
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
    },
});
