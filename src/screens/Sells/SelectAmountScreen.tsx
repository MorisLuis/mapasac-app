import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { SelectAmountScreenTheme } from '../../theme/SelectAmountScreenTheme';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { CounterSecondary } from '../../components/Inputs/CounterSecondary';
import { SellsNavigationProp, SellsNavigationStackParamList } from '../../navigator/SellsNavigation';
import CustomText from '../../components/Ui/CustumText';
import ButtonCustum from '../../components/Inputs/ButtonCustum';
import FooterScreen from '../../components/Navigation/FooterScreen';

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
            keyboardVerticalOffset={Platform.select({ ios: 120, android: 120 })}
        >
            <View style={SelectAmountScreenTheme(theme, typeTheme).SelectAmountScreen}>
                <View style={SelectAmountScreenTheme(theme, typeTheme).header}>
                    <CustomText style={SelectAmountScreenTheme(theme, typeTheme).headerTitle}>Escribe la cantidad.</CustomText>
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


                <FooterScreen
                    buttonTitle="Publicar"
                    buttonOnPress={handleSave}
                    buttonDisabled={buttondisabled}
                />
            </View>
        </KeyboardAvoidingView>
    );
};
