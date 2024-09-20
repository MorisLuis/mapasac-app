import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { AuthContext } from '../../context/auth/AuthContext';
import { PersonalInformationStyles } from '../../theme/PersonalInformationTheme';
import { useTheme } from '../../context/ThemeContext';


export const PersonalInformation = () => {
    const { user } = useContext(AuthContext);
    const { theme, typeTheme } = useTheme();

    return (
        <View style={PersonalInformationStyles(theme).PersonalInformation}>
            <View style={PersonalInformationStyles(theme).profile}>
                <View style={PersonalInformationStyles(theme).circle}>
                    <View style={PersonalInformationStyles(theme).circleContent}>
                        <Text style={PersonalInformationStyles(theme).circleText}>
                            {user?.usr?.slice(0, 1)}
                        </Text>
                    </View>
                </View>

                <View>
                    <Text style={PersonalInformationStyles(theme).name}>{user?.nombres}</Text>
                    {/* <Text style={{ color: theme.text_color }}>{user?.Company}</Text> */}
                </View>
            </View>

            <View style={PersonalInformationStyles(theme, typeTheme).information}>
                <View style={PersonalInformationStyles(theme).data}>
                    <Text style={PersonalInformationStyles(theme).label}>Empresa:</Text>
                    <Text style={{ color: theme.text_color }}>{user?.empresa}</Text>
                    <View style={PersonalInformationStyles(theme).separator} />
                </View>

                <View style={PersonalInformationStyles(theme).data}>
                    <Text style={PersonalInformationStyles(theme).label}>Razón Social:</Text>
                    <Text style={{ color: theme.text_color }}>{user?.razonsocial}</Text>
                    <View style={PersonalInformationStyles(theme).separator} />
                </View>

                {(user?.usr) && (
                    <View style={PersonalInformationStyles(theme).data}>
                        <Text style={PersonalInformationStyles(theme).label}>Usuario:</Text>
                        <Text style={{ color: theme.text_color }}>{user?.usr}</Text>
                        <View style={PersonalInformationStyles(theme).separator} />
                    </View>
                )}

                {(user?.idsucursal) && (
                    <View style={PersonalInformationStyles(theme).data}>
                        <Text style={PersonalInformationStyles(theme).label}>Sucursal:</Text>
                        <Text style={{ color: theme.text_color }}>{user?.idsucursal}</Text>
                        <View style={PersonalInformationStyles(theme).separator} />
                    </View>
                )}

                <View style={PersonalInformationStyles(theme).data}>
                    <Text style={PersonalInformationStyles(theme).label}>Servidor:</Text>
                    <Text style={{ color: theme.text_color }}>{user?.svr}</Text>
                    <View style={PersonalInformationStyles(theme).separator} />
                </View>

                <View style={PersonalInformationStyles(theme).data}>
                    <Text style={PersonalInformationStyles(theme).label}>Base de datos:</Text>
                    <Text style={{ color: theme.text_color }}>{user?.usrdba}</Text>
                </View>
            </View>

        </View>
    );
};
