import React from 'react'
import RNPickerSelect from 'react-native-picker-select';
import { selectStyles } from '../../theme/UI/inputs';
import { Text, View } from 'react-native'
import { globalFont, globalStyles } from '../../theme/appTheme';
import { useTheme } from '../../context/ThemeContext';


interface SelectorInterface {
    items: any[];
    onDone?: () => void;
    onValueChange: (value: number) => void;
    value: string;
    label: string
}

export const Selector = ({
    items,
    onDone,
    onValueChange,
    value,
    label
}: SelectorInterface) => {

    const { theme } = useTheme();

    const handleValueChange = (value: string) => {
        if (value == null) return;
        onValueChange(parseInt(value));
    }

    return (
        <View>
            <Text style={{
                fontSize: globalFont.font_normal,
                marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom / 2,
                color: theme.text_color
            }}
            >{label}</Text>

            <RNPickerSelect
                onValueChange={handleValueChange}
                placeholder={{
                    label: 'Selecciona una opción...',
                    value: null,
                }}
                items={items}
                onDonePress={onDone}
            >
                <View style={selectStyles(theme).input}>
                    <Text style={{ color: theme.text_color }}>
                        {value}
                    </Text>
                </View>
            </RNPickerSelect>
        </View>
    )
};