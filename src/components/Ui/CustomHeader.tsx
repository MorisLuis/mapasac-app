import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colores, globalStyles } from '../../theme/appTheme';

export const CustomHeader = ({ navigation, title, backAvailable = true }: any) => {
    return (
        <SafeAreaView style={styles.CustomHeader}>
            {
                backAvailable &&
                <TouchableOpacity
                    style={styles.back}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="chevron-back-outline" size={20} color="black" />
                    <Text style={styles.backText}>Atrás</Text>
                </TouchableOpacity>
            }
            <Text style={styles.titleHeader}>{title}</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    CustomHeader: {
        backgroundColor: colores.background_color,
        borderBottomWidth: 1,
        borderBottomColor: colores.background_color,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: globalStyles.globalPadding.padding,
        position: "relative",
        width: "100%"
    },
    back: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        left: 10,
        bottom: 0
    },
    backText: {
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 3,

    },
    titleHeader: {
        fontWeight: 'bold',
        fontSize: 16
    }
})