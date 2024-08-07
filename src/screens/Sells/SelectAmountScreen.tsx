import React, { useRef, useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { buttonStyles } from '../../theme/UI/buttons';
import { SelectAmountScreenTheme } from '../../theme/SelectAmountScreenTheme';
import { useNavigation } from '@react-navigation/native';

interface SelectAmountScreenInterface {
    route?: {
        params: {
            valueDefault: string;
            unit?: string;
            from: string
        };
    };
}

export const SelectAmountScreen = ({
    route
}: SelectAmountScreenInterface) => {
    const { theme, typeTheme } = useTheme();
    const { valueDefault, unit, from } = route?.params ?? {};
    const navigation = useNavigation<any>();

    const inputRef = useRef<TextInput>(null);
    const [value, setValue] = useState<string>(valueDefault as string);
    const buttondisabled = false;

    const handleInputChange = (value: string) => {
        setValue(value);
    };

    const handleSave = () => {
        if (from === 'pieces') {
            navigation.navigate('SellsDataScreen', { pieces: value });
        } else {
            navigation.navigate('SellsDataScreen', { price: value });
        }
    };

    useEffect(() => {
        setValue(valueDefault as string);

        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.select({ ios: 60, android: 80 })}
        >
            <View style={SelectAmountScreenTheme(theme, typeTheme).SelectAmountScreen}>
                <View style={SelectAmountScreenTheme(theme, typeTheme).header}>
                    <Text style={SelectAmountScreenTheme(theme, typeTheme).headerTitle}>Escribe la cantidad.</Text>
                </View>

                <View style={SelectAmountScreenTheme(theme, typeTheme).amountContent}>
                    <View style={SelectAmountScreenTheme(theme, typeTheme).amountContainer}>
                        <TextInput
                            ref={inputRef}
                            value={value}
                            onChangeText={handleInputChange}
                            keyboardType="numeric"
                            style={SelectAmountScreenTheme(theme, typeTheme).amountNumber}
                        />
                        {unit && <Text>{unit}</Text>}
                    </View>
                </View>

                <View style={{ paddingBottom: Platform.select({ ios: "20%", android: "20%" }) }}>
                    <TouchableOpacity
                        style={[buttonStyles(theme).button, buttonStyles(theme).yellow, { display: 'flex', flexDirection: 'row' }, ...(buttondisabled ? [buttonStyles(theme).disabled] : [])]}
                        onPress={handleSave}
                        disabled={buttondisabled}
                    >
                        <Text style={buttonStyles(theme, typeTheme).buttonTextSecondary}>Guardar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};
