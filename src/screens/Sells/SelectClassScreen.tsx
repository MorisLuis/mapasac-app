import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { buttonStyles } from '../../theme/UI/buttons';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { SelectScreenTheme } from '../../theme/SelectScreenTheme';
import { getProductsSellsFromFamily } from '../../services/productsSells';
import ClassInterface from '../../interface/class';
import { SellsNavigationProp, SellsNavigationStackParamList } from '../../navigator/SellsNavigation';
import useErrorHandler from '../../hooks/useErrorHandler';
import CustomText from '../../components/Ui/CustumText';
import ButtonCustum from '../../components/Inputs/ButtonCustum';
import CardSelect from '../../components/Cards/CardSelect';

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
            <CardSelect
                onPress={() => handleSelectOption(item)}
                message={(item.rcapa && item.rcapa.trim() !== "") ? item?.rcapa?.trim() : item.clase}
                sameValue={sameValue}
            />
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
                    <CustomText style={SelectScreenTheme(theme, typeTheme).headerTitle}>Selecciona {isCapa ? "la capa" : "el tipo"}.</CustomText>
                </View>

                <FlatList
                    data={classes}
                    renderItem={renderItem}
                    keyExtractor={product => `${(product.rcapa && product.rcapa.trim() !== "") ? product.rcapa : product.ridinveclas}`}
                    onEndReachedThreshold={0}
                />

                <View style={{ paddingBottom: Platform.select({ ios: "20%", android: "20%" }) }}>
                    <ButtonCustum
                        title='Seleccionar'
                        onPress={handleSave}
                        buttonColor='green'
                        disabled={buttondisabled}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
        :
        <View style={SelectScreenTheme(theme, typeTheme).SelectScreen}>
            <CustomText>Cargando...</CustomText>
        </View>
};
