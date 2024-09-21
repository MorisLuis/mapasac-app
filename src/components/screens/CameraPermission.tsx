import React from 'react'
import { TouchableOpacity, View } from 'react-native';
import { buttonStyles } from '../../theme/UI/buttons';
import { useTheme } from '../../context/ThemeContext';
import { CameraPermissionStyles } from '../../theme/ExtraScreens/CameraPermissionTheme';
import CustomText from '../Ui/CustumText';

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
                <CustomText style={CameraPermissionStyles(theme).messageText}>{message}</CustomText>
            </View>

            {
                availableAuthorization &&
                <View>
                    <TouchableOpacity style={buttonStyles(theme).button_small} onPress={requestPermissions}>
                        <CustomText style={{ color: theme.text_color }}>Autorizar camara</CustomText>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}
