import React from 'react'
import { Text, View } from 'react-native'
import { useTheme } from '../context/ThemeContext';

export const ClosingScreen = () => {

    const { theme } = useTheme();

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: "100%",
            backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fondo semi-transparente para simular blur
        }}>
            <Text style={{ color: theme.text_color }}>Cerrando sesion...</Text>
        </View>
    )
}
