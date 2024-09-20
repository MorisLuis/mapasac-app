import React, { useRef, useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { buttonStyles } from '../../theme/UI/buttons';
import { SelectAmountScreenTheme } from '../../theme/SelectAmountScreenTheme';
import { RouteProp, useNavigation } from '@react-navigation/native';
import {CounterSecondary} from '../../components/Ui/CounterSecondary';
import { SellsNavigationProp, SellsNavigationStackParamList } from '../../navigator/SellsNavigation';

type PiecesScreenRouteProp = RouteProp<SellsNavigationStackParamList, '[Modal] - PiecesScreen'>;
type PriceScreenRouteProp = RouteProp<SellsNavigationStackParamList, '[Modal] - PriceScreen'>;

interface SelectAmountScreenInterface {
    route: PiecesScreenRouteProp | PriceScreenRouteProp
}

export const SelectAmountScreen = ({
    route
}: SelectAmountScreenInterface) => {

    const { theme, typeTheme } = useTheme();
    const { valueDefault, unit, from } = route.params;
    const navigation = useNavigation<SellsNavigationProp>();

    const inputRef = useRef<TextInput>(null);
    const [value, setValue] = useState<string>(valueDefault ?? "0");
    const buttondisabled = false;

    const handleSave = () => {
        if (from === 'pieces') {
            navigation.navigate('SellsDataScreen', { pieces: value });
        } else {
            navigation.navigate('SellsDataScreen', { price: value });
        }
    };

    useEffect(() => {
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
                        <CounterSecondary
                            counter={value}
                            unit={unit}
                            setValue={setValue}
                        />
                    </View>
                </View>

                <View style={{ paddingBottom: Platform.select({ ios: "20%", android: "20%" }) }}>
                    <TouchableOpacity
                        style={[buttonStyles(theme).button, buttonStyles(theme).yellow, { display: 'flex', flexDirection: 'row' }, ...(buttondisabled ? [buttonStyles(theme).disabled] : [])]}
                        onPress={handleSave}
                        disabled={buttondisabled}
                    >
                        <Text style={buttonStyles(theme, typeTheme).buttonTextSecondary}>Agregar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};
