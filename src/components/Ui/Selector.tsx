
import React from 'react'
import RNPickerSelect from 'react-native-picker-select';
import { selectStyles } from '../../theme/UI/inputs';
import { StyleSheet, Text, View } from 'react-native'
import { globalFont, globalStyles } from '../../theme/appTheme';

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

    const handleValueChange = (value: string) => {
        if (value == null) return;
        onValueChange(parseInt(value));
    }

    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <RNPickerSelect
                style={selectStyles}
                onValueChange={handleValueChange}
                placeholder={{
                    label: 'Selecciona una opción...',
                    value: null,
                }}
                items={items}
                onDonePress={onDone}
                //fixAndroidTouchableBug
                //touchableWrapperProps={{ onAccessibilityAction: onDone }}
            >
                <View style={selectStyles.inputIOS}>
                    <Text>
                        {value}
                    </Text>
                </View>
            </RNPickerSelect>
        </View>
    )
}

const styles = StyleSheet.create({
    label:{
        fontWeight: 'bold',
        fontSize: globalFont.font_normal,
        marginBottom: globalStyles.globalMarginBottomSmall.marginBottom
    }
})