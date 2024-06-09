import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colores, globalFont, globalStyles } from '../../theme/appTheme';
import { buttonStyles } from '../../theme/UI/buttons';

interface CameraPermissionInterface {
    requestPermissions: () => Promise<void>;
    message: string;
    availableAuthorization?: boolean
}
export const CameraPermission = ({
    requestPermissions,
    message,
    availableAuthorization = false
}: CameraPermissionInterface) => {
    return (
        <View style={styles.CameraPermission}>

            <View style={styles.messageContent}>
                <Text style={styles.messageText}>{message}</Text>
            </View>

            {
                availableAuthorization &&
                <View>
                    <TouchableOpacity style={buttonStyles.button_small} onPress={requestPermissions}>
                        <Text>Autorizar camara</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}


export const styles = StyleSheet.create({
    CameraPermission: {
        flex: 1,
        backgroundColor: colores.color_black,
        justifyContent: 'center',
        alignItems: "center"
    },
    messageContent: {
        marginBottom: globalStyles.globalMarginBottom.marginBottom
    },
    messageText: {
        color: colores.text_color_secondary,
        fontSize: globalFont.font_normal
    }

})