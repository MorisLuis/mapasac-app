import React, { useContext, useEffect } from 'react'

import { Alert, Button, Platform, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/auth/AuthContext';
import { globalStyles } from '../../theme/appTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { buttonStyles } from '../../theme/UI/buttons';
import { DbAuthContext } from '../../context/dbAuth/DbAuthContext';
import { ProfileScreenStyles } from '../../theme/ProfileScreenTheme';
import { useTheme } from '../../context/ThemeContext';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';


export const ProfileScreen = () => {

    const { logOut } = useContext(AuthContext);
    const { addMultipleProducts } = useContext(InventoryBagContext);

    const { logOut: logOutDB } = useContext(DbAuthContext);
    const { theme, typeTheme } = useTheme();
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
                        await logOut();
                        await logOutDB();
                    }
                }
            ],
            { cancelable: false } // Puedes ponerlo en true para permitir cerrar el diálogo tocando fuera de él
        );
    }

    return (
        <View style={ProfileScreenStyles(theme).ProfileScreen}>
            <SafeAreaView style={ProfileScreenStyles(theme).content}>

                <Button onPress={addMultipleProducts} title='add productos'/>

                <Text style={ProfileScreenStyles(theme).title}>Configuación</Text>

                <TouchableOpacity onPress={() => navigate('[ProfileNavigation] - personalInformationScreen')} style={ProfileScreenStyles(theme).section}>
                    <Text style={{ color: theme.text_color }}>Información Personal</Text>
                    <Icon name="person-outline" size={22} color={iconColor}/>
                </TouchableOpacity>

                <View style={ProfileScreenStyles(theme).divider}></View>


                <TouchableOpacity onPress={() => navigate('[ProfileNavigation] - settingsSceen')} style={[ProfileScreenStyles(theme).section]}>
                    <Text style={{ color: theme.text_color }}>Configuración General</Text>
                    <Icon name="settings-outline" size={22} color={iconColor}/>
                </TouchableOpacity>

                <View style={ProfileScreenStyles(theme).divider}></View>


                <Text style={ProfileScreenStyles(theme).title}>Legal</Text>

                <TouchableOpacity onPress={() => navigate('[ProfileNavigation] - privacyScreen')} style={[ProfileScreenStyles(theme).section]}>
                    <Text style={{ color: theme.text_color }}>Aviso de privacidad</Text>
                    <Icon name="book-outline" size={22} color={iconColor}/>
                </TouchableOpacity>

                <View style={ProfileScreenStyles(theme).divider}></View>

                <TouchableOpacity onPress={() => navigate('[ProfileNavigation] - termsOfUseScreen')} style={[ProfileScreenStyles(theme).section]}>
                    <Text style={{ color: theme.text_color }}>Terminos de uso</Text>
                    <Icon name="book-outline" size={22} color={iconColor}/>
                </TouchableOpacity>

                <View style={ProfileScreenStyles(theme).divider}></View>

                <TouchableOpacity onPress={logOut} style={[buttonStyles(theme).button, globalStyles(theme).globalMarginBottom, { marginTop: globalStyles(theme).globalMarginBottom.marginBottom * 2 }]}>
                    <Text style={buttonStyles(theme).buttonText}>Cerrar sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={logOutDataBase} style={[ProfileScreenStyles(theme).logOutDB, { marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom }]}>
                    <Text style={ProfileScreenStyles(theme).logOutDBText}>Cambiar base de datos</Text>
                </TouchableOpacity>

                <View>
                    <Text style={{ color: theme.text_color }}>Version: {Platform.Version}</Text>
                </View>
            </SafeAreaView>
        </View>
    )
}