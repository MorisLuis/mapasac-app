import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colores, globalFont, globalStyles } from '../../theme/appTheme';
import Icon from 'react-native-vector-icons/Ionicons';

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

    return (
        <View style={styles.EmptyMessageCard}>
            <View style={styles.iconContainer}>
                <Icon name={icon} size={24} color="black" style={styles.icon} />
            </View>

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    EmptyMessageCard: {
        backgroundColor: colores.background_color,
        borderWidth: 1,
        borderColor: colores.color_border,
        width: "100%",
        padding: globalStyles.globalPadding.padding,
        minHeight: "40%",
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: globalFont.font_med,
        marginBottom: globalStyles.globalMarginBottomSmall.marginBottom
    },
    iconContainer: {
        backgroundColor: colores.background_color_secondary,
        borderWidth: 1,
        borderColor: colores.color_border,
        width: 40, 
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: globalStyles.globalMarginBottom.marginBottom
    },
    icon: {
        textAlign: "center"
    },
    message: {
    }
});
