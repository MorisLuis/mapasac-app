import React, { useContext, useEffect } from 'react'

import { Button, Text, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../../context/auth/AuthContext';
import { DbAuthContext } from '../../context/dbAuth/DbAuthContext';
import { buttonStyles } from '../../theme/UI/buttons';
import { PersonalInformationStyles } from '../../theme/PersonalInformationTheme';
import { useTheme } from '../../context/ThemeContext';

interface PersonalInformationInterface {
    route: {
        params: {
            fromLogIn?: boolean;
        };
    };
}

export const PersonalInformation = ({ route }: PersonalInformationInterface) => {

    const { user } = useContext(AuthContext);
    const { user: userFromDB, logOut } = useContext(DbAuthContext);
    const { fromLogIn } = route.params || {};
    const { theme, toggleTheme, typeTheme } = useTheme();

    useEffect(() => {
        console.log('Personal Information effect');
    }, [])

    return (
        <View style={PersonalInformationStyles(theme).PersonalInformation}>
            <View style={PersonalInformationStyles(theme).profile}>
                <View style={PersonalInformationStyles(theme).circle}>
                    <View style={PersonalInformationStyles(theme).circleContent}>
                        <Text style={PersonalInformationStyles(theme).circleText}>{user?.Nombre?.slice(0, 1) || userFromDB?.Nombre?.slice(0, 1)}</Text>
                    </View>
                </View>

                <View>
                    <Text style={PersonalInformationStyles(theme).name}>{user?.Nombre || userFromDB?.Nombre}</Text>
                    <Text style={{ color: theme.text_color }}>{user?.Company}</Text>
                </View>

            </View>

            <View style={PersonalInformationStyles(theme, typeTheme).information}>
                <View style={PersonalInformationStyles(theme).data}>
                    <Text style={PersonalInformationStyles(theme).label}>Razón Social:</Text>
                    <Text style={{ color: theme.text_color }}>{user?.RazonSocial || userFromDB?.RazonSocial}</Text>
                    <View style={PersonalInformationStyles(theme).separator} />
                </View>

                <View style={PersonalInformationStyles(theme).data}>
                    <Text style={PersonalInformationStyles(theme).label}>Usuario:</Text>
                    <Text style={{ color: theme.text_color }}>{user?.Id_UsuarioOOL || userFromDB?.Id_UsuarioOOL}</Text>
                    <View style={PersonalInformationStyles(theme).separator} />
                </View>

                <View style={PersonalInformationStyles(theme).data}>
                    <Text style={PersonalInformationStyles(theme).label}>Almacen:</Text>
                    <Text style={{ color: theme.text_color }}>{user?.Id_Almacen || userFromDB?.Id_Almacen}</Text>
                    <View style={PersonalInformationStyles(theme).separator} />
                </View>

                <View style={PersonalInformationStyles(theme).data}>
                    <Text style={PersonalInformationStyles(theme).label}>Servidor:</Text>
                    <Text style={{ color: theme.text_color }}>{user?.ServidorSQL || userFromDB?.ServidorSQL}</Text>
                    <View style={PersonalInformationStyles(theme).separator} />
                </View>

                <View style={PersonalInformationStyles(theme).data}>
                    <Text style={PersonalInformationStyles(theme).label}>Base de datos:</Text>
                    <Text style={{ color: theme.text_color }}>{user?.BaseSQL || userFromDB?.BaseSQL}</Text>
                </View>
            </View>

            {
                fromLogIn &&
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[buttonStyles(theme).button, buttonStyles(theme).black]}
                    onPress={logOut}
                >
                    <Text style={buttonStyles(theme).buttonText} >Cerrar sesión de base de datos</Text>
                </TouchableOpacity>
            }
        </View>
    )
}