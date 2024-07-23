import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { useTheme } from '../../context/ThemeContext';

interface SellsScreenInterface {
    message?: string
};

export const SellsScreen = ({
    message
}: SellsScreenInterface) => {

    const { typeTheme, theme } = useTheme();
    const iconColor = theme.color_tertiary

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.background_color,
            height: "100%"
        }}>
            <Text>Ventas</Text>
            <Text style={{ color: theme.text_color}}>{message}</Text>
        </View>
    )
}
