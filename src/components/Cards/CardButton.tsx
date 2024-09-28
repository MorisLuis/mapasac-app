import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from '../Ui/CustumText';
import { Control, Controller } from 'react-hook-form';
import { useTheme } from '../../context/ThemeContext';
import { SellsDataScreenTheme } from '../../theme/SellsDataScreenTheme';
import { globalFont } from '../../theme/appTheme';
import { FormType } from '../../screens/Sells/SellsDataScreen';
import { format } from '../../utils/currency';
import { UnitType } from '../../navigator/SellsNavigation';

interface CardButtonInterface {
    onPress: () => void;
    label: string;
    valueDefault: string;
    color: 'purple' | 'green' | 'red' | 'blue' | 'black';
    control?: Control<FormType, any>;
    controlValue?: keyof FormType;
    icon?: string;
    isPrice?: boolean;
    specialValue?: string;
}

const CardButton = ({
    onPress,
    label,
    valueDefault,
    color,
    control,
    controlValue,
    icon,
    isPrice,
    specialValue
}: CardButtonInterface) => {
    const { typeTheme, theme } = useTheme();
    const [currentValue, setCurrentValue] = useState<string | number>(valueDefault);

    // Asegurarnos de devolver un string o number
    const handleValue = (value: string | UnitType | number): string | number => {
        if (typeof value === 'object' && 'value' in value) {
            return value?.value?.trim();
        }

        if (isPrice) {
            return format(Number(value));
        }

        if (typeof value === 'number') {
            return value;
        }

        return value;
    };

    // Verifica si el valor actual es el valor por defecto
    const isDefaultValue = currentValue === valueDefault;

    // Condicional para cambiar 'black' a 'white' en modo 'dark'
    const resolvedColor = (color === 'black' && typeTheme === 'dark') ? 'white' : color;

    return (
        <TouchableOpacity
            style={[
                SellsDataScreenTheme(theme, typeTheme).inputContainer,
                isDefaultValue && { borderColor: theme.color_border_tertiary, borderWidth: 1 }
            ]}
            onPress={onPress}
        >
            <View style={SellsDataScreenTheme(theme, typeTheme).inputContainer_left}>
                {icon && (
                    <Icon name={icon} color={theme[`color_${resolvedColor}`]} size={globalFont.font_normal} />
                )}
                <CustomText
                    style={[SellsDataScreenTheme(theme, typeTheme).label, { color: theme[`color_${resolvedColor}`] }]}
                >
                    {label}
                </CustomText>
            </View>
            {
                (control && controlValue) ?
                    <Controller
                        control={control}
                        name={controlValue}
                        render={({ field: { value } }) => {
                            const newValue = value ? handleValue(value) : valueDefault;
                            useEffect(() => {
                                setCurrentValue(newValue);
                            }, [newValue]);
                            return (
                                <CustomText style={SellsDataScreenTheme(theme, typeTheme).labelValue}>
                                    {specialValue ? specialValue : newValue}
                                </CustomText>
                            );
                        }}
                    />
                    : specialValue ?
                        <CustomText style={SellsDataScreenTheme(theme, typeTheme).labelValue}>
                            {specialValue}
                        </CustomText>
                        :
                        null
            }
        </TouchableOpacity>
    );
};

export default CardButton;
