import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';
import { ProductDetailsStyles } from '../../theme/ProductDetailsTheme';
import { CodebarUpdateScreenStyles } from '../../theme/CodebarUpdateScreenTheme';
import CustomText from '../Ui/CustumText';

interface CodebarUpdateOptionCardInterface {
    message: string;
    icon?: string;
    onClick: () => void;
    active: boolean;
    visible?: boolean;
}

export const CodebarUpdateOptionCard = ({
    message,
    icon = 'close-outline',
    onClick,
    active,
    visible = true
}: CodebarUpdateOptionCardInterface) => {

    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black"

    return visible && (
        <TouchableOpacity
            style={[ProductDetailsStyles(theme).optionCodebar, active && ProductDetailsStyles(theme).selectedOption]}
            onPress={onClick}
        >
            <Icon
                name={icon}
                size={24}
                color={iconColor} style={ProductDetailsStyles(theme).optionCodebar_icon}
            />
            <CustomText
                style={CodebarUpdateScreenStyles(theme, typeTheme).optionCodebarText}
            >
                {message}
            </CustomText>
        </TouchableOpacity>
    );
};
