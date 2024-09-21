import React from 'react'
import { buttonStyles } from '../../theme/UI/buttons'
import { useTheme } from '../../context/ThemeContext'
import CustomText from '../Ui/CustumText'
import Icon from 'react-native-vector-icons/Ionicons';
import { globalFont } from '../../theme/appTheme'
import { TouchableOpacity } from 'react-native';
import DotLoader from '../Ui/DotLaoder';

interface ButtonCustumInterface {
    onPress: () => void;
    title: string;

    disabled?: boolean;
    buttonColor: 'black' | "white" | "red" | 'yellow';
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
    disabled
}: ButtonCustumInterface) => {

    const { theme, typeTheme } = useTheme();

    return (
        <TouchableOpacity
            style={[buttonStyles(theme).button, buttonStyles(theme, typeTheme)[buttonColor], { ...extraStyles }]}
            onPress={onPress}
            disabled={disabled}
        >
            {
                (iconName && !disabled) && <Icon name={iconName} color={iconColor} size={globalFont.font_normal} />
            }
            {
                disabled ?
                    <CustomText style={buttonStyles(theme, typeTheme).buttonText}>
                        {disabled ? <DotLoader /> : title}
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