import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { buttonStyles } from '../../theme/UI/buttons';
import { useTheme } from '../../context/ThemeContext';
import { CameraPermissionStyles } from '../../theme/ExtraScreens/CameraPermissionTheme';

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

    const { theme } = useTheme();

    return (
        <View style={CameraPermissionStyles(theme).CameraPermission}>

            <View style={CameraPermissionStyles(theme).messageContent}>
                <Text style={CameraPermissionStyles(theme).messageText}>{message}</Text>
            </View>

            {
                availableAuthorization &&
                <View>
                    <TouchableOpacity style={buttonStyles(theme).button_small} onPress={requestPermissions}>
                        <Text style={{ color: theme.text_color }}>Autorizar camara</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}
