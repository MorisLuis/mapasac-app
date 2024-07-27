import React, { useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { counterStyles } from '../../theme/UI/counterStyles';
import { useTheme } from '../../context/ThemeContext';

interface CounterInterface {
    counter: number,
    setCounter: React.Dispatch<React.SetStateAction<number>> | ((value: number) => void),
    unit?: string
}

export const Counter = ({
    counter,
    setCounter,
    unit
}: CounterInterface) => {

    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black";
    const inputRef = useRef<TextInput>(null);
    const [prevValue, setPrevValue] = useState<string>(counter.toString());

    const addProduct = () => {
        setCounter(Number(counter) + 1)
    }

    const handleInputChange = (value: string) => {
        let numericValue;
        const normalizedValue = value.replace(',', '.');
        const decimalCount = (normalizedValue.match(/\./g) || []).length;

        if( decimalCount > 1) return;

        if(value.endsWith('.')){
            numericValue = Number(value.concat("1"));
        } else {
            numericValue = Number(value);
        }

        setPrevValue(numericValue.toString());
        setCounter(numericValue);
    }

    const subtractProduct = () => {
        if (counter <= 0) return 0;
        setCounter(Number(counter) - 1)
    }

    const modifyUnit = () => {
        if (!unit) return;
        let unitModified = unit?.trim();

        if (unitModified === "PIEZA") {
            unitModified = "PZA";
        }

        return unitModified;
    }

    return (
        <View style={counterStyles(theme).counter}>

            <TouchableOpacity onPress={subtractProduct} style={counterStyles(theme).counterButton}>
                <Icon name="remove-outline" size={hp("3.5%")} color={iconColor} />
            </TouchableOpacity>

            <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
                <View style={[counterStyles(theme).inputContainer]}>
                    <TextInput
                        ref={inputRef}
                        value={`${counter.toString()}`}
                        onChangeText={handleInputChange}
                        keyboardType="numeric"
                        style={counterStyles(theme).inputText}
                    />
                    {
                        unit &&
                        <Text style={counterStyles(theme).unitText}>{modifyUnit()}</Text>
                    }
                </View>
            </TouchableWithoutFeedback>

            <TouchableOpacity onPress={addProduct} style={counterStyles(theme).counterButton}>
                <Icon name="add-outline" size={hp("3.5%")} color={iconColor} />
            </TouchableOpacity>
        </View>
    )
}

export default Counter;
