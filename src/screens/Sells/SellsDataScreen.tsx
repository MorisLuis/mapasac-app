import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { RouteProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalFont } from '../../theme/appTheme';
import { format } from '../../utils/currency';
import { SellsDataScreenTheme } from '../../theme/SellsDataScreenTheme';
import { buttonStyles } from '../../theme/UI/buttons';
import { getIdinveartsProduct, getProductByEnlacemob, getProductsSellsFromFamily, getTotalClassesSells } from '../../services/productsSells';
import ProductInterface from '../../interface/product';
import { UnitData } from '../../interface/units';
import ClassInterface from '../../interface/class';
import EnlacemobInterface from '../../interface/enlacemob';
import { AuthContext } from '../../context/auth/AuthContext';
import { SellsBagContext } from '../../context/Sells/SellsBagContext';
import { SellsNavigationStackParamList } from '../../navigator/SellsNavigation';
import useErrorHandler from '../../hooks/useErrorHandler';

type SellsDataScreenRouteProp = RouteProp<SellsNavigationStackParamList, 'SellsDataScreen'>;

type FormType = {
    pieces: string;
    price: string;
    typeClass: ClassInterface;
    units: UnitData;
    capa: string;
    idinveclas?: number;
};

interface SellsDataScreenInterface {
    route: SellsDataScreenRouteProp
};

export const SellsDataScreen = ({ route }: SellsDataScreenInterface) => {
    const { pieces, price, typeClass, units, cvefamilia, productSellData, descripcio, image, totalClasses: totalClassesProp } = route?.params ?? {};
    const { typeTheme, theme } = useTheme();
    const { user } = useContext(AuthContext);
    const { addProductSell } = useContext(SellsBagContext);
    const navigation = useNavigation<any>();
    const { handleError } = useErrorHandler()

    const [title, setTitle] = useState<string>();
    const [imageValue, setImageValue] = useState<string>();

    const [idinveartsValue, setIdinveartsValue] = useState<number>();
    const [cvefamiliaValue, setCvefamiliaValue] = useState<number>();
    const [totalClasses] = useState<number>(totalClassesProp as number);

    const { control, handleSubmit, setValue, getValues, watch } = useForm<FormType>({
        defaultValues: {
            pieces: pieces,
            price: price,
            typeClass: typeClass,
            units: units,
            capa: typeClass?.rcapa,
            idinveclas: undefined
        },
    });

    const iconColor = typeTheme === 'dark' ? "white" : theme.text_color;
    const haveClasses = totalClasses > 0;
    const completeTheForm = watch("typeClass") && watch('units') && watch('price') && watch('pieces');
    const buttondisabled = !haveClasses ? !(watch('units') && watch('price') && watch('pieces')) : !completeTheForm;

    const onSubmit = useCallback(() => {
        if (!getValues('idinveclas') && haveClasses) return;

        const bagProduct: EnlacemobInterface = {
            cantidad: parseFloat(getValues('pieces')),
            precio: parseFloat(getValues('price')),
            idinvearts: getValues('typeClass')?.ridinvearts || idinveartsValue as number,
            unidad: getValues('units')?.unidad,
            capa: getValues('capa'),
            idusrmob: user?.idusrmob as number,
            idinveclas: getValues('idinveclas')
        };

        navigation.goBack();
        addProductSell(bagProduct);
    }, [getValues, haveClasses, idinveartsValue, navigation, addProductSell, user?.idusrmob]);

    const handleGetTotal = useCallback(async () => {
        if (!cvefamilia) return;

        try {
            const total = await getTotalClassesSells(cvefamilia);
            if (total.error) return handleError(total.error);


            if (total === "1") {
                const classesData = await getProductsSellsFromFamily(cvefamilia);
                if (classesData.error) return handleError(classesData.error);

                const clases = classesData[0];
                const { ridinvearts: idinvearts, rcapa: capa, ridinveclas: idinveclas } = clases ?? {};

                setValue('typeClass', {
                    rcapa: clases?.rcapa?.trim(),
                    ridinvearts: clases.ridinvearts,
                    rproducto: clases.rproducto,
                    ridinveclas: clases.ridinveclas,
                    clase: clases.clase
                });

                handleGetProduct({ idinvearts, capa, idinveclas });
            } else if (total === "0") {
                const product = await getIdinveartsProduct(cvefamilia);
                if (product.error) return handleError(product.error);

                setIdinveartsValue(product.idinvearts);
            }
        } catch (error) {
            handleError(error);
        }

    }, [cvefamilia, setValue]);

    const handleGetProduct = useCallback(async ({ idinvearts, capa, idinveclas }: any) => {

        try {            
            const product = await getProductByEnlacemob({ idinvearts, capa, idinveclas });
            if (product.error) return handleError(product.error);
            setValue('price', product?.precio.toString());
            setValue('units', {
                unidad: product?.unidad as number,
                descripcio: product?.unidad_nombre?.trim() as string
            });
    
            if (typeClass) {
                setValue('typeClass', {
                    rcapa: typeClass?.rcapa?.trim(),
                    ridinvearts: typeClass?.ridinvearts,
                    rproducto: typeClass.rproducto,
                    ridinveclas: typeClass.ridinveclas,
                    clase: typeClass.clase
                });
            }
    
            setValue('capa', capa);
            setValue("idinveclas", idinveclas);
        } catch (error) {
            handleError(error);
        }
    }, [setValue, typeClass]);

    const handleGoToClassScreen = useCallback(() => {
        if (totalClasses && totalClasses > 1) {
            navigation.navigate('[Modal] - ClassScreen', { from: "typeClass", valueDefault: getValues('typeClass'), cvefamilia: cvefamiliaValue });
        }
    }, [totalClasses, cvefamiliaValue, getValues, navigation]);

    useEffect(() => {
        // Actualiza los valores usando setValue solo para los casos en que el setter se necesita
        if (pieces) setValue('pieces', pieces);
        if (price) setValue('price', price);
        if (typeClass) setValue('typeClass', typeClass);
        if (units) setValue('units', units);

        // Actualiza valores usando setters específicos
        if (cvefamilia) setCvefamiliaValue(cvefamilia);
        if (descripcio) setTitle(descripcio);
        if (image) setImageValue(image);
        handleGetTotal();
    }, [pieces, price, typeClass, units, cvefamilia, descripcio, image]);

    useEffect(() => {
        if (!productSellData) return;
        const { idinvearts, capa, idinveclas } = productSellData ?? {};
        handleGetProduct({ idinvearts, capa, idinveclas });
    }, [productSellData]);

    return (
        <View style={SellsDataScreenTheme(theme, typeTheme).SellsDataScreen}>
            <View style={SellsDataScreenTheme(theme, typeTheme).imageContainer}>
                {
                    imageValue ? <Image source={{ uri: `data:image/png;base64,${imageValue}` }} style={SellsDataScreenTheme(theme, typeTheme).image} />
                        : <View style={SellsDataScreenTheme(theme, typeTheme).notImage}></View>
                }
            </View>

            <View style={SellsDataScreenTheme(theme, typeTheme).titleContent}>
                <Text style={SellsDataScreenTheme(theme, typeTheme).title}>{title}</Text>
            </View>

            <TouchableOpacity
                style={SellsDataScreenTheme(theme, typeTheme).inputContainer}
                onPress={handleGoToClassScreen}
                disabled={!haveClasses}
            >
                <View style={SellsDataScreenTheme(theme, typeTheme).inputContainer_left}>
                    <Icon name={'resize-outline'} color={iconColor} size={globalFont.font_normal} />
                    <Text style={SellsDataScreenTheme(theme, typeTheme).label}>Clase:</Text>
                </View>
                <View style={SellsDataScreenTheme(theme, typeTheme).inputContainer_right}>
                    <Controller
                        control={control}
                        name="typeClass"
                        render={({ field: { value } }) => (
                            <Text style={SellsDataScreenTheme(theme, typeTheme).label}>
                                {
                                    !haveClasses ? "No tiene clase" :
                                        value ? ((value?.rcapa && value?.rcapa?.trim() !== "") ? value?.rcapa?.trim() : value?.clase?.trim())
                                            : "Selecciona la clase"
                                }
                            </Text>
                        )}
                    />
                    <Icon name={'code'} color={iconColor} size={globalFont.font_normal} style={{ transform: [{ rotate: '90deg' }] }} />
                </View>
            </TouchableOpacity>


            {
                (watch('typeClass') || (totalClasses !== undefined && totalClasses !== null && !haveClasses)) ?
                    <>
                        <TouchableOpacity
                            style={SellsDataScreenTheme(theme, typeTheme).inputContainer}
                            onPress={() => navigation.navigate('[Modal] - PiecesScreen', { from: "pieces", valueDefault: getValues('pieces'), unit: 'PZA' })}
                        >
                            <View style={SellsDataScreenTheme(theme, typeTheme).inputContainer_left}>
                                <Icon name={'bag-handle'} color={iconColor} size={globalFont.font_normal} />
                                <Text style={SellsDataScreenTheme(theme, typeTheme).label}>Cantidad:</Text>
                            </View>
                            <Controller
                                control={control}
                                name="pieces"
                                render={({ field: { value } }) => (
                                    <Text style={SellsDataScreenTheme(theme, typeTheme).label}>{value ? value : "Seleccion cantidad"}</Text>
                                )}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={SellsDataScreenTheme(theme, typeTheme).inputContainer}
                            onPress={() => navigation.navigate('[Modal] - UnitScreen', { from: "units", valueDefault: getValues('units') })}
                        >
                            <View style={SellsDataScreenTheme(theme, typeTheme).inputContainer_left}>
                                <Icon name={'shapes'} color={iconColor} size={globalFont.font_normal} />
                                <Text style={SellsDataScreenTheme(theme, typeTheme).label}>Unidad:</Text>
                            </View>
                            <View style={SellsDataScreenTheme(theme, typeTheme).inputContainer_right}>
                                <Controller
                                    control={control}
                                    name="units"
                                    render={({ field: { value } }) => (
                                        <Text style={SellsDataScreenTheme(theme, typeTheme).label}>{value?.descripcio ? value.descripcio : "Seleccion Unidad"}</Text>
                                    )}
                                />
                                <Icon name={'code'} color={iconColor} size={globalFont.font_normal} style={{ transform: [{ rotate: '90deg' }] }} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={SellsDataScreenTheme(theme, typeTheme).inputContainer}
                            onPress={() => navigation.navigate('[Modal] - PriceScreen', { from: "price", valueDefault: getValues('price'), unit: 'MXN' })}
                        >
                            <View style={SellsDataScreenTheme(theme, typeTheme).inputContainer_left}>
                                <Icon name={'pricetags'} color={iconColor} size={globalFont.font_normal} />
                                <Text style={SellsDataScreenTheme(theme, typeTheme).label}>Precio:</Text>
                            </View>
                            <Controller
                                control={control}
                                name="price"
                                render={({ field: { value } }) => (
                                    <Text style={SellsDataScreenTheme(theme, typeTheme).label}>{value ? format(Number(value)) : "Selecciona precio"}</Text>
                                )}
                            />
                        </TouchableOpacity>

                        <View style={{ paddingBottom: Platform.select({ ios: "20%", android: "20%" }) }}>
                            <TouchableOpacity
                                style={[buttonStyles(theme).button, buttonStyles(theme).yellow, { display: 'flex', flexDirection: 'row' }, ...(buttondisabled ? [buttonStyles(theme).disabled] : [])]}
                                onPress={handleSubmit(onSubmit)}
                                disabled={buttondisabled}
                            >
                                <Text style={buttonStyles(theme, typeTheme).buttonTextSecondary}>Publicar</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                    :
                    <View>
                        <Text>Cargando...</Text>
                    </View>
            }
        </View>
    );
};