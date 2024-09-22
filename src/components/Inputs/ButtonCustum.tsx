import React, { useContext } from 'react'
import { buttonStyles } from '../../theme/UI/buttons'
import { useTheme } from '../../context/ThemeContext'
import CustomText from '../Ui/CustumText'
import Icon from 'react-native-vector-icons/Ionicons';
import { globalFont } from '../../theme/appTheme'
import { TouchableOpacity } from 'react-native';
import DotLoader from '../Ui/DotLaoder';
import { SettingsContext } from '../../context/settings/SettingsContext';

interface ButtonCustumInterface {
    onPress: () => void;
    title: string;

    disabled?: boolean;
    loading?: boolean;
    buttonColor: 'green' | "white" | "red" | 'yellow' | 'purple';
    iconName?: string;
    iconColor?: string;
    extraStyles?: any;
}

const ButtonCustum = ({
    onPress,
    title,
    buttonColor,
    iconName,
    iconColor,
    extraStyles,
    disabled,
    loading
}: ButtonCustumInterface) => {

    const { theme, typeTheme } = useTheme();
    const { actualModule } = useContext(SettingsContext);

    // Modify the color of the button depends of the module.
    const modifyButtonColor = () => {
        let buttonColorNew = buttonColor;

        if( buttonColor === 'green' ){
            buttonColorNew = actualModule === 'Sells' ? 'purple' : 'green'
        };

        return buttonColorNew
    }

    return (
        <TouchableOpacity
            style={[buttonStyles(theme).button, buttonStyles(theme, typeTheme)[modifyButtonColor()], { ...extraStyles }]}
            onPress={onPress}
            disabled={disabled}
        >
            {
                (iconName && !disabled) && <Icon name={iconName} color={iconColor} size={globalFont.font_normal} />
            }
            {
                disabled ?
                    <CustomText style={buttonStyles(theme, typeTheme).buttonText}>
                        {loading ? <DotLoader /> : title}
                    </CustomText>
                    :
                    <CustomText style={buttonStyles(theme, typeTheme).buttonText}>
                        {title}
                    </CustomText>
            }

        </TouchableOpacity>
    )
}

export default ButtonCustum