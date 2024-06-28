import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';
import { EmptyMessageCardStyles } from '../../theme/UI/cardsStyles';

interface EmptyMessageCardInterface {
    title: string;
    message: string;
    icon?: string
}

export const EmptyMessageCard = ({
    message,
    title,
    icon = 'close-outline'
}: EmptyMessageCardInterface) => {

    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black"

    return (
        <View style={EmptyMessageCardStyles(theme).EmptyMessageCard}>
            <View style={EmptyMessageCardStyles(theme).iconContainer}>
                <Icon name={icon} size={24} color={iconColor} style={EmptyMessageCardStyles(theme).icon} />
            </View>

            <Text style={EmptyMessageCardStyles(theme).title}>{title}</Text>
            <Text style={EmptyMessageCardStyles(theme).message}>{message}</Text>
        </View>
    );
};
