import React, { useRef, useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { buttonStyles } from '../../theme/UI/buttons';
import { useNavigation } from '@react-navigation/native';
import { SelectScreenTheme } from '../../theme/SelectScreenTheme';
import { getProductSellsDetailsBycvefamilia, getProductsSellsFromFamily, getUnits } from '../../services/productsSells';
import ClassInterface, { ClassData } from '../../interface/class';

interface SelectAmountScreenInterface {
    route?: {
        params: {
            valueDefault: ClassData;
            cvefamilia?: number
        };
    };
}

export const SelectClassScreen = ({
    route
}: SelectAmountScreenInterface) => {
    const { theme, typeTheme } = useTheme();
    const { valueDefault, cvefamilia } = route?.params ?? {};
    const navigation = useNavigation<any>();

    const inputRef = useRef<TextInput>(null);
    const [value, setValue] = useState<ClassData>(valueDefault as ClassData);
    const [classes, setClasses] = useState<ClassInterface[]>()
    const [optionSelected, setOptionSelected] = useState<ClassData>()
    const buttondisabled = false;

    const handleSelectOption = (value: ClassData) => {
        setValue({
            rcapa: value.rcapa,
            ridinvearts: value.ridinvearts,
            rproducto: value.rproducto
        });
        setOptionSelected({
            rcapa: value?.rcapa?.trim(),
            ridinvearts: value.ridinvearts,
            rproducto: value.rproducto
        })
    };

    const handleSave = () => {
        navigation.navigate('sellsDataScreen', { typeClass: value });
    };

    const renderItem = ({ item }: { item: ClassData }) => {
        const sameValue = item.rcapa ? item.rcapa.trim() === optionSelected?.rcapa : item.ridinvearts === optionSelected?.ridinvearts
        return (
            <TouchableOpacity style={[SelectScreenTheme(theme, typeTheme).optionsContainer]} onPress={() => handleSelectOption(item)}>
                <Text style={SelectScreenTheme(theme, typeTheme).optionText}>{item?.rcapa?.trim()}</Text>
                <View style={[sameValue ? SelectScreenTheme(theme, typeTheme).optionCheckActive : SelectScreenTheme(theme, typeTheme).optionCheck]}></View>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        if (!valueDefault) return;
        setValue(valueDefault);
        setOptionSelected(valueDefault)

        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        const handleGetClasess = async () => {
            const classesData = await getProductsSellsFromFamily(cvefamilia as number);
            //console.log({classesData: JSON.stringify(classesData, null, 2)})
            setClasses(classesData)
        };
        handleGetClasess();
    }, []);

    console.log({optionSelected})
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.select({ ios: 60, android: 80 })}
        >
            <View style={SelectScreenTheme(theme, typeTheme).SelectScreen}>
                <View style={SelectScreenTheme(theme, typeTheme).header}>
                    <Text style={SelectScreenTheme(theme, typeTheme).headerTitle}>Selecciona la unidad.</Text>
                </View>

                <FlatList
                    data={classes}
                    renderItem={renderItem}
                    keyExtractor={product => `${product.rcapa ? product.rcapa : product.ridinveclas}`}
                    onEndReachedThreshold={0}
                />

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
