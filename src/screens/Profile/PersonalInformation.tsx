import React, { useContext, useEffect } from 'react'

import { StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../../context/auth/AuthContext';
import { colores, globalFont, globalStyles } from '../../theme/appTheme';


export const PersonalInformation = () => {

    const { user } = useContext(AuthContext);

    useEffect(() => {
        console.log('Personal Information effect');
    }, [])

    return (
        <View style={styles.PersonalInformation}>
            <View style={styles.profile}>

                <View style={styles.circle}>
                    <View style={styles.circleContent}>
                        <Text style={styles.circleText}>{user?.Nombre.slice(0, 1)}</Text>
                    </View>
                </View>

                <View>
                    <Text style={styles.name}>{user?.Nombre}</Text>
                    <Text>{user?.Company}</Text>
                </View>

            </View>

            <View style={styles.information}>
                <View style={styles.data}>
                    <Text style={styles.label}>Nombre:</Text>
                    <Text>{user?.Nombre}</Text>
                    <View style={styles.separator} />
                </View>

                <View style={styles.data}>
                    <Text style={styles.label}>Compañia:</Text>
                    <Text>{user?.Company}</Text>
                    <View style={styles.separator} />
                </View>

                <View style={styles.data}>
                    <Text style={styles.label}>Usuario:</Text>
                    <Text>{user?.Id_UsuarioOOL}</Text>
                    <View style={styles.separator} />
                </View>

                <View style={styles.data}>
                    <Text style={styles.label}>Almacen:</Text>
                    <Text>{user?.Id_Almacen}</Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    PersonalInformation: {
        padding: globalStyles.globalPadding.padding,
        backgroundColor: colores.background_color,
        height: '100%'
    },

    profile: {
        backgroundColor: "transparent",
        borderRadius: 5,
        display: "flex",
        flexDirection: "row",
        alignItems:"center",
        gap: 20,
        marginBottom: globalStyles.globalMarginBottom.marginBottom
    },

    circle: {
        backgroundColor: colores.color_tertiary,
        padding: 6,
        borderRadius: 100,
        width: 50,
        height: 50,
    },

    circleContent: {
        backgroundColor: colores.color_tertiary,
        //padding: 5,
        borderRadius: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent:"center",
        textAlign: "center",
        alignItems: "center",
        height: "100%",
        borderWidth: 1,
        borderColor: colores.background_color
    },

    circleText: {
        color: colores.text_color_secondary,
        fontSize: globalFont.font_normal,
        borderRadius: 100,
    },

    name: {
        fontWeight: "bold"
    },

    information: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: colores.background_color_secondary,
        borderWidth: 1,
        borderColor: `${colores.color_border}${Math.round(0.3 * 255).toString(16)}`,
        borderRadius: 5,
        marginBottom: globalStyles.globalMarginBottom.marginBottom
    },
    data: {
        display: "flex",
        flexDirection: "row",
        paddingVertical: 10,
        position: "relative"
    },
    label: {
        fontWeight: 'bold',
        marginRight: 10
    },
    separator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 1,
        borderBottomWidth: 1,
        borderBottomColor: `${colores.color_tertiary}${Math.round(0.25 * 255).toString(16)}`,
    },
})