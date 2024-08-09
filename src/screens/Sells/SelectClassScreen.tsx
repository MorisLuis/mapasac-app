import React, { useRef, useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { buttonStyles } from '../../theme/UI/buttons';
import { useNavigation } from '@react-navigation/native';
import { SelectScreenTheme } from '../../theme/SelectScreenTheme';
import { getProductsSellsFromFamily } from '../../services/productsSells';
import ClassInterface from '../../interface/class';

interface SelectAmountScreenInterface {
    route?: {
        params: {
            valueDefault: ClassInterface;
            cvefamilia?: number;
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
    const [value, setValue] = useState<ClassInterface>(valueDefault as ClassInterface);
    const [classes, setClasses] = useState<ClassInterface[]>();
    const [optionSelected, setOptionSelected] = useState<ClassInterface>();
    const buttondisabled = false;
    const isCapa = classes?.[0]?.rcapa?.trim() !== "";

    const handleSelectOption = (value: ClassInterface) => {
        setValue({
            rcapa: value.rcapa,
            ridinvearts: value.ridinvearts,
            rproducto: value.rproducto,
            ridinveclas: value.ridinveclas,
            clase: value.clase
        });
        setOptionSelected({
            rcapa: value?.rcapa?.trim(),
            ridinvearts: value.ridinvearts,
            rproducto: value.rproducto,
            ridinveclas: value.ridinveclas,
            clase: value.clase
        })
    };

    const handleSave = () => {
        navigation.navigate('SellsDataScreen', { typeClass: value, productSellData: { idinvearts: value.ridinvearts, capa: value.rcapa, idinveclas: value.ridinveclas } });
    };

    const renderItem = ({ item }: { item: ClassInterface }) => {
        const sameValue = (item.rcapa && item.rcapa.trim() !== "") ? item.rcapa.trim() === optionSelected?.rcapa.trim() : item.ridinveclas === optionSelected?.ridinveclas;
        return (
            <TouchableOpacity style={[SelectScreenTheme(theme, typeTheme).optionsContainer]} onPress={() => handleSelectOption(item)}>
                <Text style={SelectScreenTheme(theme, typeTheme).optionText}>{(item.rcapa && item.rcapa.trim() !== "") ? item?.rcapa?.trim() : item.clase}</Text>
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
            setClasses(classesData)
        };
        handleGetClasess();
    }, []);


    return classes ? (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.select({ ios: 60, android: 80 })}
        >
            <View style={SelectScreenTheme(theme, typeTheme).SelectScreen}>
                <View style={SelectScreenTheme(theme, typeTheme).header}>
                    <Text style={SelectScreenTheme(theme, typeTheme).headerTitle}>Selecciona {isCapa ? "la capa" : "el tipo"}.</Text>
                </View>

                <FlatList
                    data={classes}
                    renderItem={renderItem}
                    keyExtractor={product => `${(product.rcapa && product.rcapa.trim() !== "") ? product.rcapa : product.ridinveclas}`}
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
    )
    :
    <View style={SelectScreenTheme(theme, typeTheme).SelectScreen}>
        <Text>Cargando...</Text>
    </View>
};
