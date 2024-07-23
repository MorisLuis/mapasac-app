import React from 'react'
import { Image, Text, View } from 'react-native'
import { StartupScreenTheme } from '../../theme/UI/StartupScreenTheme';
import { useTheme } from '../../context/ThemeContext';

export const StartupScreen = () => {

    const { theme } = useTheme();

    return (
        <View style={StartupScreenTheme(theme).StartupScreen}>
            <View style={StartupScreenTheme(theme).imageContainer}>
                <Text>MAPASAC</Text>
                {/* <Image
                    style={StartupScreenTheme(theme).logo}
                    source={require('../../assets/logo01.png')}
                /> */}
            </View>
        </View>
    )
}