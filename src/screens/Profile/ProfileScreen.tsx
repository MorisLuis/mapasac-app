import React, { useContext, useEffect } from 'react'

import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/auth/AuthContext';
import { globalStyles } from '../../theme/appTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { buttonStyles } from '../../theme/UI/buttons';
import { ProfileScreenStyles } from '../../theme/ProfileScreenTheme';
import { useTheme } from '../../context/ThemeContext';
import DeviceInfo from 'react-native-device-info';
import { SellsBagContext } from '../../context/Sells/SellsBagContext';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';
import { ProfileNavigationProp } from '../../navigator/ProfileNavigation';


export const ProfileScreen = () => {

    const { logOut } = useContext(AuthContext);
    const { handleCleanState } = useContext(SellsBagContext);
    const { handleCleanState: handleCleanStateInventory } = useContext(InventoryBagContext);

    const version = DeviceInfo.getVersion(); // Esto obtiene la versión de la aplicación

    const { theme, typeTheme } = useTheme();
    const { navigate } = useNavigation<ProfileNavigationProp>();

    const iconColor = typeTheme === 'dark' ? "white" : "black";

    const handleLogOut = async ( ) => {
        await logOut()
        handleCleanState()
        handleCleanStateInventory()
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

                <TouchableOpacity onPress={handleLogOut} style={[buttonStyles(theme, typeTheme).button, globalStyles(theme).globalMarginBottom, { marginTop: globalStyles(theme).globalMarginBottom.marginBottom * 2 }]}>
                    <Text style={buttonStyles(theme, typeTheme).buttonText}>Cerrar sesión</Text>
                </TouchableOpacity>

                <View>
                    <Text style={{ color: theme.text_color }}>Version: {version}</Text>
                </View>

            </SafeAreaView>
        </View>
    )
}