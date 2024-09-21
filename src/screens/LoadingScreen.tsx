import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { useTheme } from '../context/ThemeContext';
import CustomText from '../components/Ui/CustumText';

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
            <CustomText style={{ color: theme.text_color }}>{message}</CustomText>
        </View>
    )
}
