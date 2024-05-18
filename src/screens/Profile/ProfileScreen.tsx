import React, { useContext, useEffect } from 'react'

import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/auth/AuthContext';
import { colores, globalFont, globalStyles } from '../../theme/appTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { buttonStyles } from '../../theme/UI/buttons';
import { DbAuthContext } from '../../context/dbAuth/DbAuthContext';


export const ProfileScreen = () => {

    const { logOut } = useContext(AuthContext);
    const { logOut: logOutDB } = useContext(DbAuthContext);

    const { navigate } = useNavigation<any>();

    useEffect(() => {
        console.log('Personal Information effect');
    }, [])

    const logOutDataBase = () => {

        Alert.alert(
            "Cambiar la base de datos", // Título del cuadro de diálogo
            "¿Estás seguro de que deseas cambiar la base de datos? Se cerrara la actual.", // Mensaje del cuadro de diálogo
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Aceptar", onPress: () => {
                    logOutDB()
                    logOut()
                } }
            ],
            { cancelable: false } // Puedes ponerlo en true para permitir cerrar el diálogo tocando fuera de él
        );
    }

    return (
        <View style={styles.ProfileScreen}>
            <SafeAreaView style={styles.content}>
                <Text style={styles.title}>Configuación</Text>

                <TouchableOpacity onPress={() => navigate('personalInformation')} style={styles.section}>
                    <Text>Información Personal</Text>
                    <Icon name="person-outline" size={22} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigate('settingsSceen')} style={[styles.section, globalStyles.globalMarginBottom]}>
                    <Text>Configuración General</Text>
                    <Icon name="settings-outline" size={22} color="black" />
                </TouchableOpacity>

                <Text style={styles.title}>Legal</Text>

                <TouchableOpacity onPress={() => navigate('privacyScreen')} style={[styles.section]}>
                    <Text>Aviso de privacidad</Text>
                    <Icon name="book-outline" size={22} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigate('termsOfUseScreen')} style={[styles.section, globalStyles.globalMarginBottom, { marginBottom: 40 }]}>
                    <Text>Terminos de uso</Text>
                    <Icon name="book-outline" size={22} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={logOut} style={[buttonStyles.button, globalStyles.globalMarginBottom]}>
                    <Text style={buttonStyles.buttonText}>Cerrar sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={logOutDataBase} style={[styles.logOutDB, { marginBottom: globalStyles.globalMarginBottomSmall.marginBottom }]}>
                    <Text style={styles.logOutDBText}>Cambiar base de datos</Text>
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
        backgroundColor: colores.background_color
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
        borderBottomWidth: 0.7
    },
    title: {
        fontSize: globalFont.font_med,
        fontWeight: "bold",
        paddingTop: globalStyles.globalPadding.padding
    },
    logOutDB: {

    },
    logOutDBText: {
        textDecorationLine: "underline"
    }
})