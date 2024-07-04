import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { counterStyles } from '../../theme/UI/counterStyles';
import { useTheme } from '../../context/ThemeContext';

interface CounterInterface {
    counter: number,
    setCounter: React.Dispatch<React.SetStateAction<number>> | ((value: number) => void)
}

export const Counter = ({
    counter,
    setCounter
}: CounterInterface) => {

    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black"

    const addProduct = () => {
        setCounter(counter + 1)
    }

    const handleInputChange = (value: string) => {
        const numericValue = parseInt(value) || 0;
        setCounter(numericValue);
    }

    const subtractProduct = () => {
        if (counter === 0) return;
        setCounter(counter - 1)
    }

    return (
        <View style={counterStyles(theme).counter}>

            <TouchableOpacity onPress={subtractProduct} style={counterStyles(theme).counterButton}>
                <Icon name="remove-outline" size={hp("3.5%")} color={iconColor} />
            </TouchableOpacity>

            <TextInput
                style={counterStyles(theme).input}
                value={counter.toString()}
                onChangeText={handleInputChange}
                keyboardType="numeric"
            />
            <TouchableOpacity onPress={addProduct} style={counterStyles(theme).counterButton}>
                <Icon name="add-outline" size={hp("3.5%")} color={iconColor} />
            </TouchableOpacity>
        </View>
    )
}