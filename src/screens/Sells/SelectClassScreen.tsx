import React, { useRef, useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { buttonStyles } from '../../theme/UI/buttons';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { SelectScreenTheme } from '../../theme/SelectScreenTheme';
import { getProductsSellsFromFamily } from '../../services/productsSells';
import ClassInterface from '../../interface/class';
import { SellsNavigationProp, SellsNavigationStackParamList } from '../../navigator/SellsNavigation';
import useErrorHandler from '../../hooks/useErrorHandler';

type SelectClassScreenRouteProp = RouteProp<SellsNavigationStackParamList, '[Modal] - ClassScreen'>;

interface SelectClassScreenInterface {
    route: SelectClassScreenRouteProp
}

export const SelectClassScreen = ({
    route
}: SelectClassScreenInterface) => {

    const { valueDefault, cvefamilia, descripcio, image, totalClasses } = route.params;
    const { theme, typeTheme } = useTheme();
    const navigation = useNavigation<SellsNavigationProp>();
    const { handleError } = useErrorHandler()

    const inputRef = useRef<TextInput>(null);
    const [value, setValue] = useState<ClassInterface>(valueDefault);
    const [classes, setClasses] = useState<ClassInterface[]>();
    const [optionSelected, setOptionSelected] = useState<ClassInterface>();
    const isCapa = classes?.[0]?.rcapa?.trim() !== "";
    const buttondisabled = !value ? true : false;

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
        navigation.goBack();
        navigation.navigate('SellsDataScreen',
            {
                totalClasses: totalClasses,
                cvefamilia: cvefamilia,
                typeClass: value,
                descripcio: descripcio,
                image: image,
                productSellData: { idinvearts: value.ridinvearts, capa: value.rcapa, idinveclas: value.ridinveclas }
            }
        );
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
        setValue(valueDefault);
        setOptionSelected(valueDefault)

        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        const handleGetClasess = async () => {
            const classesData = await getProductsSellsFromFamily(cvefamilia as number);
            if (classesData.error) return handleError(classesData.error);
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
                        <Text style={buttonStyles(theme, typeTheme).buttonTextSecondary}>Seleccionar</Text>
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
