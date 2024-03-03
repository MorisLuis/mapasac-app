import React, { useContext, useEffect } from 'react'

import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/auth/AuthContext';
import { globalFont, globalStyles } from '../../theme/appTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { buttonStyles } from '../../theme/UI/buttons';


export const ProfileScreen = () => {

    const { logOut } = useContext(AuthContext);
    const { navigate } = useNavigation<any>();

    useEffect(() => {
        console.log('Personal Information effect');
    }, [])

    const onClick = () => {
        navigate('personalInformation');
    }

    return (
        <View style={styles.ProfileScreen}>
            <SafeAreaView style={styles.content}>
                <TouchableOpacity onPress={onClick} style={styles.section}>
                    <Text>Información Personal</Text>
                    <Icon name="chevron-forward-outline" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={onClick} style={[styles.section, globalStyles.globalMarginBottom]}>
                    <Text>Soporte</Text>
                    <Icon name="help-circle-outline" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={logOut} style={[buttonStyles.button, globalStyles.globalMarginBottom]}>
                    <Text style={buttonStyles.buttonText}>Cerrar sesión</Text>
                </TouchableOpacity>

                <View>
                    <Text>Version: v56.6</Text>
                </View>
            </SafeAreaView>
        </View>
    )
}


const styles = StyleSheet.create({
    ProfileScreen: {
        flex: 1,
        padding: globalStyles.globalPadding.padding,
    },
    content: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },
    section: {
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: "transparent",
        borderBottomColor: 'black',
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
    }
})