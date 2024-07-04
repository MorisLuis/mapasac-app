import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useTheme } from '../context/ThemeContext';

export const LoadingScreen = () => {

    const { typeTheme, theme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black"

    return (
        <View style={{ 
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.background_color,
            height: "100%"
        }}>
            <ActivityIndicator 
                size={ 50 }
                color={iconColor}
            />
        </View>
    )
}
