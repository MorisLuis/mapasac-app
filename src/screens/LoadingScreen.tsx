import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { useTheme } from '../context/ThemeContext';
import { useProtectPage } from '../hooks/useProtectPage';

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

    const { protectThisPage } = useProtectPage({
        anotherCondition: loading === false ? true : false,
        navigatePage: 'back'
    })


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
            <Text style={{ color: theme.text_color }}>{message}</Text>
        </View>
    )
}
