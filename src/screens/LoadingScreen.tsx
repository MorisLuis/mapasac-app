import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { useTheme } from '../context/ThemeContext';

interface LoadingScreenInterface {
    message?: string;
    loading: boolean
};

export const LoadingScreen = ({
    message,
    loading
}: LoadingScreenInterface) => {

    const { theme } = useTheme();
    const iconColor = theme.color_tertiary;
    console.log({loading})

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.background_color,
            height: "100%"
        }}>
            <ActivityIndicator
                size="large"
                color={iconColor}
                style={{ marginBottom: 10 }}
            />
            <Text style={{ color: theme.text_color}}>{message}</Text>
        </View>
    )
}
