import React, { useRef, useState, useEffect, useContext } from 'react';
import { View, TextInput, FlatList, SafeAreaView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { SelectScreenTheme } from '../../theme/SelectScreenTheme';
import { getProductsSellsFromFamily } from '../../services/productsSells';
import ClassInterface from '../../interface/class';
import useErrorHandler from '../../hooks/useErrorHandler';
import CustomText from '../../components/Ui/CustumText';
import CardSelect from '../../components/Cards/CardSelect';
import FooterScreen from '../../components/Navigation/FooterScreen';
import { SellsBagContext } from '../../context/Sells/SellsBagContext';
import SelectClassSkeleton from '../../components/Skeletons/Screens/SelectClassSkeleton';
import { SellsDataScreenTypeProps, SellsRestaurantNavigationProp } from '../../interface';
import { SellsRestaurantsNavigationStackParamList } from '../../navigator/SellsRestaurantsNavigation';

type SelectRestaClassScreenRouteProp = RouteProp<SellsRestaurantsNavigationStackParamList, '[SellsRestaurants] - ClassScreen'>;

interface SelectRestaurantClassScreenInterface {
    route: SelectRestaClassScreenRouteProp
}

export const SelectRestaurantClassScreen = ({
    route
}: SelectRestaurantClassScreenInterface) => {

    const { valueDefault, cvefamilia, descripcio, image, totalClasses } = route.params;
    const navigation = useNavigation<SellsRestaurantNavigationProp>();
    const { theme, typeTheme } = useTheme();
    const { updateFormData } = useContext(SellsBagContext);

    const { handleError } = useErrorHandler()

    const inputRef = useRef<TextInput>(null);
    const [value, setValue] = useState<ClassInterface>(valueDefault as ClassInterface);
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
        const data: SellsDataScreenTypeProps = {
            totalClasses: totalClasses,
            descripcio: descripcio,
            image: image,
            cvefamilia: cvefamilia,
            typeClass: {
                id: value.ridinvearts,
                value: value.rproducto
            },
            productSellData: {
                idinvearts: value.ridinvearts,
                capa: value.rcapa,
                idinveclas: value.ridinveclas
            }
        };

        updateFormData(data)
        navigation.goBack();
        navigation.navigate('SellsRestaurantsDataScreen');
    };

    const handleGetClasess = async () => {
        const classesData = await getProductsSellsFromFamily(cvefamilia as number);
        if (classesData.error) return handleError(classesData.error);
        setClasses(classesData)
    };

    const renderItem = ({ item }: { item: ClassInterface }) => {
        const sameValue = (item.rcapa && item?.rcapa?.trim() !== "") ? item?.rcapa?.trim() === optionSelected?.rcapa?.trim() : item.ridinveclas === optionSelected?.ridinveclas;
        return (
            <CardSelect
                onPress={() => handleSelectOption(item)}
                message={(item.rcapa && item?.rcapa?.trim() !== "") ? item?.rcapa?.trim() : item.clase}
                sameValue={sameValue}
            />
        )
    }

    useEffect(() => {
        setValue(valueDefault as ClassInterface);
        setOptionSelected(valueDefault)

        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        handleGetClasess();
    }, []);

    if (!classes) {
        return <SelectClassSkeleton/>
    }

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color }} >
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

                <FooterScreen
                    buttonTitle="Agregar"
                    buttonOnPress={handleSave}
                    buttonDisabled={buttondisabled}
                />
            </View>
        </SafeAreaView>
    )
};