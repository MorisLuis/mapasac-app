import React, { useContext } from 'react'

import { SafeAreaView, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/auth/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProfileScreenStyles } from '../../theme/ProfileScreenTheme';
import { useTheme } from '../../context/ThemeContext';
import DeviceInfo from 'react-native-device-info';
import { SellsBagContext } from '../../context/Sells/SellsBagContext';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';
import { ProfileNavigationProp } from '../../navigator/ProfileNavigation';
import CustomText from '../../components/Ui/CustumText';
import ButtonCustum from '../../components/Inputs/ButtonCustum';


export const ProfileScreen = () => {

    const { logOut } = useContext(AuthContext);
    const { handleCleanState } = useContext(SellsBagContext);
    const { handleCleanState: handleCleanStateInventory } = useContext(InventoryBagContext);

    const version = DeviceInfo.getVersion(); // Esto obtiene la versión de la aplicación

    const { theme, typeTheme } = useTheme();
    const { navigate } = useNavigation<ProfileNavigationProp>();

    const iconColor = typeTheme === 'dark' ? "white" : "black";

    const handleLogOut = async () => {
        await logOut()
        handleCleanState()
        handleCleanStateInventory()
    }

    return (
        <SafeAreaView>
            <View style={ProfileScreenStyles(theme, typeTheme).ProfileScreen}>
                <CustomText style={ProfileScreenStyles(theme, typeTheme).title}>Configuación</CustomText>

                <TouchableOpacity onPress={() => navigate('[ProfileNavigation] - personalInformationScreen')} style={ProfileScreenStyles(theme, typeTheme).section}>
                    <CustomText style={{ color: theme.text_color }}>Información Personal</CustomText>
                    <Icon name="person-outline" size={22} color={iconColor} />
                </TouchableOpacity>

                <View style={ProfileScreenStyles(theme, typeTheme).divider}></View>


                <TouchableOpacity onPress={() => navigate('[ProfileNavigation] - settingsSceen')} style={[ProfileScreenStyles(theme, typeTheme).section]}>
                    <CustomText style={{ color: theme.text_color }}>Configuración General</CustomText>
                    <Icon name="settings-outline" size={22} color={iconColor} />
                </TouchableOpacity>

                <View style={ProfileScreenStyles(theme, typeTheme).divider}></View>

                <CustomText style={ProfileScreenStyles(theme, typeTheme).title}>Legal</CustomText>

                <TouchableOpacity onPress={() => navigate('[ProfileNavigation] - privacyScreen')} style={[ProfileScreenStyles(theme, typeTheme).section]}>
                    <CustomText style={{ color: theme.text_color }}>Aviso de privacidad</CustomText>
                    <Icon name="book-outline" size={22} color={iconColor} />
                </TouchableOpacity>

                <View style={ProfileScreenStyles(theme, typeTheme).divider}></View>

                <View style={ProfileScreenStyles(theme, typeTheme).closeSession}>
                    <ButtonCustum
                        title="Cerrar sesión"
                        onPress={handleLogOut}
                        buttonColor='white'
                    />
                </View>

                <View>
                    <CustomText style={{ color: theme.text_color }}>Version: {version}</CustomText>
                </View>

            </View>
        </SafeAreaView>
    )
}