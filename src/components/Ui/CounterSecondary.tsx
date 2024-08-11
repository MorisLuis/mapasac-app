import React, { useRef, useCallback, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { counterSecondaryStyles } from '../../theme/UI/counterStyles';
import { useTheme } from '../../context/ThemeContext';
import { buttonStyles } from '../../theme/UI/buttons';

interface CounterInterface {
    counter: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    unit?: string;
    secondaryDesign?: boolean;
}

const formatValue = (input: string): string => {
    const decimalPlaces = 2;
    const regex = new RegExp(`^\\d*(\\.\\d{0,${decimalPlaces}})?`);
    const formattedValue = input.match(regex)?.[0] || '';
    return formattedValue;
};

export const CounterSecondary: React.FC<CounterInterface> = ({
    counter,
    setValue,
    unit,
    secondaryDesign = false,
}) => {
    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? 'white' : 'black';
    const inputRef = useRef<TextInput>(null);


    const addProduct = useCallback(() => {
        const newValue = parseFloat(counter) + 1;
        setValue(formatValue(newValue.toString()));
    }, [counter, setValue]);

    const subtractProduct = useCallback(() => {
        const currentValue = parseFloat(counter);
        if (currentValue <= 0) return;
        const newValue = currentValue - 1;
        setValue(formatValue(newValue.toString()));
    }, [counter, setValue]);

    const handleClean = useCallback(() => {
        const newValue = formatValue("0");
        setValue(newValue);
    }, [counter, setValue]);

    const handleInputChange = useCallback((input: string) => {
        if (!isNaN(parseFloat(input))) {
            const newValue = formatValue(input);
            setValue(newValue);
        }
    }, [setValue]);

    return (
        <View>
            <View style={counterSecondaryStyles(theme).counter}>
                <TouchableOpacity onPress={subtractProduct} style={counterSecondaryStyles(theme).counterButton}>
                    <Icon name="remove-outline" size={hp('3.5%')} color={iconColor} />
                </TouchableOpacity>

                <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
                    <View style={[counterSecondaryStyles(theme).inputContainer, secondaryDesign && { backgroundColor: theme.background_color }]}>
                        <TextInput
                            ref={inputRef}
                            value={counter}
                            onChangeText={handleInputChange}
                            keyboardType="numeric"
                            style={[counterSecondaryStyles(theme).inputText]}
                        />
                        {unit && <Text style={counterSecondaryStyles(theme).unitText}>{unit}</Text>}
                    </View>
                </TouchableWithoutFeedback>

                <TouchableOpacity onPress={addProduct} style={counterSecondaryStyles(theme).counterButton}>
                    <Icon name="add-outline" size={hp('3.5%')} color={iconColor} />
                </TouchableOpacity>
            </View>

            <View style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                <View style={{ width: "40%", minWidth: 100 }}>
                    <TouchableOpacity
                        onPress={handleClean}
                        style={[buttonStyles(theme).button_small, buttonStyles(theme).light]}
                    >
                        <Text style={buttonStyles(theme).buttonTextClear}>Limpiar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
