import React, { useState, useEffect, useMemo, useCallback } from 'react';
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

    /* Optional */
    specialValue?: string;
    control?: Control<FormType, any>;
    controlValue?: keyof FormType;
    icon?: string;
    isPrice?: boolean;
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

    // Memorizamos el valor resuelto del color y el valor por defecto
    const resolvedColor = useMemo(
        () => (color === 'black' && typeTheme === 'dark') ? 'white' : color,
        [color, typeTheme]
    );

    const handleValue = useCallback((value: string | UnitType | number): string | number => {
        if (typeof value === 'object' && 'value' in value) {
            return value?.value?.trim();
        }
        if (isPrice) {
            return format(Number(value));
        }
        return typeof value === 'number' ? value : value;
    }, [isPrice]);

    const isDefaultValue = useMemo(() => currentValue === valueDefault, [currentValue, valueDefault]);

    useEffect(() => {
        if (control && controlValue) {
            setCurrentValue(valueDefault);
        }
    }, [valueDefault, control, controlValue]);


    return (
        <TouchableOpacity
            style={[
                SellsDataScreenTheme(theme, typeTheme).inputContainer,
                isDefaultValue && { borderColor: theme.color_border_secondary, borderWidth: 1 }
            ]}
            onPress={onPress}
        >
            {/* LABEL */}
            <View style={SellsDataScreenTheme(theme, typeTheme).inputContainer_left}>
                {icon && <Icon name={icon} color={theme[`color_${resolvedColor}`]} size={globalFont.font_normal} />}
                <CustomText
                    style={[SellsDataScreenTheme(theme, typeTheme).label, { color: theme[`color_${resolvedColor}`] }]}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                >
                    {label}
                </CustomText>
            </View>

            {/* VALUE */}
            {control && controlValue ? (
                <Controller
                    control={control}
                    name={controlValue}
                    render={({ field: { value } }) => {

                        const newValue = value ? handleValue(value) : valueDefault;
                        useEffect(() => {
                            setCurrentValue(newValue);
                        }, [newValue]);

                        return (
                            <CustomText
                                style={SellsDataScreenTheme(theme, typeTheme).labelValue}
                                ellipsizeMode="tail"
                                numberOfLines={1}
                            >
                                {specialValue || newValue}
                            </CustomText>
                        );
                    }}
                />
            ) : specialValue ? (
                <CustomText
                    style={SellsDataScreenTheme(theme, typeTheme).labelValue}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                >
                    {specialValue}
                </CustomText>
            ) : null}
        </TouchableOpacity>
    );
};

export default CardButton;
