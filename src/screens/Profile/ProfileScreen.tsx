import React, { useContext, useEffect } from 'react'

import { Alert, Button, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/auth/AuthContext';
import { globalStyles } from '../../theme/appTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { buttonStyles } from '../../theme/UI/buttons';
import { DbAuthContext } from '../../context/dbAuth/DbAuthContext';
import { ProfileScreenStyles } from '../../theme/ProfileScreenTheme';
import { useTheme } from '../../context/ThemeContext';
import DeviceInfo from 'react-native-device-info';


export const ProfileScreen = () => {

    const { logOut } = useContext(AuthContext);
    const version = DeviceInfo.getVersion(); // Esto obtiene la versión de la aplicación

    const { logOut: logOutDB } = useContext(DbAuthContext);
    const { theme, typeTheme, toggleTheme} = useTheme();
    const { navigate } = useNavigation<any>();

    const iconColor = typeTheme === 'dark' ? "white" : "black"


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
                {
                    text: "Aceptar", onPress: async () => {
                        await logOutDB();
                        await logOut();
                    }
                }
            ],
            { cancelable: false } // Puedes ponerlo en true para permitir cerrar el diálogo tocando fuera de él
        );
    }

    return (
        <View style={ProfileScreenStyles(theme, typeTheme).ProfileScreen}>
            <SafeAreaView style={ProfileScreenStyles(theme, typeTheme).content}>

                <Text style={ProfileScreenStyles(theme, typeTheme).title}>Configuación</Text>

                <TouchableOpacity onPress={() => navigate('[ProfileNavigation] - personalInformationScreen')} style={ProfileScreenStyles(theme, typeTheme).section}>
                    <Text style={{ color: theme.text_color }}>Información Personal</Text>
                    <Icon name="person-outline" size={22} color={iconColor}/>
                </TouchableOpacity>

                <View style={ProfileScreenStyles(theme, typeTheme).divider}></View>


                <TouchableOpacity onPress={() => navigate('[ProfileNavigation] - settingsSceen')} style={[ProfileScreenStyles(theme, typeTheme).section]}>
                    <Text style={{ color: theme.text_color }}>Configuración General</Text>
                    <Icon name="settings-outline" size={22} color={iconColor}/>
                </TouchableOpacity>

                <View style={ProfileScreenStyles(theme, typeTheme).divider}></View>


                <Text style={ProfileScreenStyles(theme, typeTheme).title}>Legal</Text>

                <TouchableOpacity onPress={() => navigate('[ProfileNavigation] - privacyScreen')} style={[ProfileScreenStyles(theme, typeTheme).section]}>
                    <Text style={{ color: theme.text_color }}>Aviso de privacidad</Text>
                    <Icon name="book-outline" size={22} color={iconColor}/>
                </TouchableOpacity>

                <View style={ProfileScreenStyles(theme, typeTheme).divider}></View>

                <TouchableOpacity onPress={logOut} style={[buttonStyles(theme, typeTheme).button, globalStyles(theme).globalMarginBottom, { marginTop: globalStyles(theme).globalMarginBottom.marginBottom * 2 }]}>
                    <Text style={buttonStyles(theme, typeTheme).buttonText}>Cerrar sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={logOutDataBase} style={[ProfileScreenStyles(theme, typeTheme).logOutDB, { marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom }]}>
                    <Text style={ProfileScreenStyles(theme, typeTheme).logOutDBText}>Cambiar base de datos</Text>
                </TouchableOpacity>

                <View>
                    <Text style={{ color: theme.text_color }}>Version: {version}</Text>
                </View>

                <Button title='toggle' onPress={toggleTheme}/>
            </SafeAreaView>
        </View>
    )
}