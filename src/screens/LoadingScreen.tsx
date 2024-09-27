import React from 'react'
import { ActivityIndicator, Image, View } from 'react-native'
import { useTheme } from '../context/ThemeContext';
import CustomText from '../components/Ui/CustumText';
import { LoadingScreenStyles } from '../theme/LoadingScreenTheme';

interface LoadingScreenInterface {
    message?: string;
    loading?: boolean
};

export const LoadingScreen = ({
    message = "Cargando...",
    loading
}: LoadingScreenInterface) => {

    const { theme } = useTheme();
    return (
        <View style={LoadingScreenStyles(theme).LoadingScreen}>
            <View></View>
            <Image
                style={LoadingScreenStyles(theme).logo}
                source={require('../assets/ic_launcher_monochrome.png')}
            />
            <View style={LoadingScreenStyles(theme).LoadingMessage}>
                <ActivityIndicator
                    size="small"
                    color={theme.text_color}
                />
                <CustomText style={{ color: theme.text_color }}>{message}</CustomText>
            </View>
        </View>
    )
}
