import React, { useContext, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Alert, Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalFont } from '../../theme/appTheme';
import { format } from '../../utils/currency';
import { SellsDataScreenTheme } from '../../theme/SellsDataScreenTheme';
import { buttonStyles } from '../../theme/UI/buttons';
import { getIdinveartsProduct, getProductByEnlacemob, getProductsSellsFromFamily, getTotalProductsSells } from '../../services/productsSells';
import ProductInterface from '../../interface/product';
import { UnitData } from '../../interface/units';
import ClassInterface from '../../interface/class';
import EnlacemobInterface from '../../interface/enlacemob';
import { AuthContext } from '../../context/auth/AuthContext';
import { SellsBagContext } from '../../context/Sells/SellsBagContext';

type ProductSellData = {
    idinvearts: number,
    capa: string,
    idinveclas: number
}

interface SellsDataScreenInterface {
    route?: {
        params: {
            image: string;
            descripcio: string;
            cvefamilia?: number;
            pieces?: string;
            price?: string;
            typeClass?: ClassInterface;
            units?: UnitData;
            productSellData?: ProductSellData;
        };
    };
};

export const SellsDataScreen = ({ route }: SellsDataScreenInterface) => {
    const { pieces, price, typeClass, units, cvefamilia, productSellData, descripcio, image } = route?.params ?? {};
    const { typeTheme, theme } = useTheme();
    const { user } = useContext(AuthContext);
    const { addProductSell } = useContext(SellsBagContext);
    const iconColor = typeTheme === 'dark' ? "white" : theme.text_color_light;
    const navigation = useNavigation<any>();

    const [title, setTitle] = useState<string>();
    const [imageValue, setImageValue] = useState<string>();
    const [classType, setClassType] = useState<ClassInterface>();
    const [piecesValue, setPiecesValue] = useState<string>();
    const [priceValue, setPriceValue] = useState<string>();
    const [unitValue, setUnitValue] = useState<UnitData>();
    const [classValue, setClassValue] = useState<number>();
    const [capaValue, setCapaValue] = useState<string>();
    const [cvefamiliaValue, setCvefamiliaValue] = useState<number>();
    const [idinveartsValue, setIdinveartsValue] = useState<number>();
    const [totalClasses, setTotalClasses] = useState<number>();

    const continueWithoutClass = totalClasses !== undefined && totalClasses !== null && totalClasses < 1;
    const buttondisabled = continueWithoutClass ? !(!classValue && unitValue && priceValue && piecesValue) : !(classValue && unitValue && priceValue && piecesValue)

    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            pieces: pieces,
            price: price,
            typeClass: typeClass,
            units: units
        },
    });

    const onSubmit = () => {
        const bagProduct: EnlacemobInterface = {
            idinvearts: classType?.ridinvearts as number || idinveartsValue as number,
            unidad: units?.unidad as number || unitValue?.unidad as number,
            cantidad: parseInt(pieces as string) || parseInt(piecesValue as string),
            precio: parseInt(price as string) || parseInt(priceValue as string),
            idusrmob: user?.idusrmob as number,
            idinveclas: classValue,
            capa: capaValue
        }

        navigation.goBack()
        addProductSell(bagProduct)
    };

    const handleGetTotal = async () => {
        if (!cvefamilia) return;
        const total: string = await getTotalProductsSells(cvefamilia);
        console.log({ total })

        if (total === "1") {
            const classesData = await getProductsSellsFromFamily(cvefamilia);
            const clases = classesData[0]
            const { ridinvearts: idinvearts, rcapa: capa, ridinveclas: idinveclas } = clases ?? {};

            setValue('typeClass', {
                rcapa: clases?.rcapa?.trim(),
                ridinvearts: clases.ridinvearts,
                rproducto: clases.rproducto,
                ridinveclas: clases.ridinveclas,
                clase: clases.clase
            });

            setClassType({
                rcapa: clases?.rcapa?.trim(),
                ridinvearts: clases.ridinvearts,
                rproducto: clases.rproducto,
                ridinveclas: clases.ridinveclas,
                clase: clases.clase
            });

            handleGetProduct({ idinvearts, capa, idinveclas });
        } else if (total === "0") {
            const product = await getIdinveartsProduct(cvefamilia);
            setIdinveartsValue(product.idinvearts)
        }
        setTotalClasses(parseFloat(total));
    };

    const handleGetProduct = async ({ idinvearts, capa, idinveclas }: any) => {
        const product: ProductInterface = await getProductByEnlacemob({ idinvearts, capa, idinveclas });

        setValue('price', product?.precio.toString());
        setPriceValue(product?.precio.toString())

        setValue('units',
            {
                unidad: product?.unidad as number,
                descripcio: product?.unidad_nombre?.trim() as string
            }
        );

        setUnitValue({
            unidad: product?.unidad as number,
            descripcio: product?.unidad_nombre?.trim() as string
        })

        setValue('pieces', product?.cantidad?.toString());
        setPiecesValue(product?.cantidad?.toString())

        setCapaValue(capa);
        setClassValue(idinveclas)
    };

    useEffect(() => {
        if (pieces) {
            setValue('pieces', pieces);
            setPiecesValue(pieces);
        }

        if (price) {
            setValue('price', price);
            setPriceValue(price)
        }

        if (typeClass) {
            setValue('typeClass', typeClass);
            setClassType({
                rcapa: typeClass?.rcapa?.trim(),
                ridinvearts: typeClass.ridinvearts,
                rproducto: typeClass.rproducto,
                ridinveclas: typeClass.ridinveclas,
                clase: typeClass.clase
            })
        }

        if (units) {
            setValue('units', units);
            setUnitValue({
                unidad: units?.unidad as number,
                descripcio: units?.descripcio?.trim() as string
            })
        }

        if (cvefamilia) {
            setCvefamiliaValue(cvefamilia)
        };

        if (descripcio) {
            setTitle(descripcio)
        }

        if (image) {
            setImageValue(image)
        }

        handleGetTotal()

    }, [pieces, price, typeClass, units, cvefamilia, image]);

    useEffect(() => {
        if (!productSellData) return;
        const { idinvearts, capa, idinveclas } = productSellData ?? {};
        handleGetProduct({ idinvearts, capa, idinveclas });
    }, [productSellData]);

    useEffect(() => {
        if (classValue) return;
        if (!cvefamiliaValue) return;
        if (!totalClasses) return;
        if (totalClasses <= 1) return;

        const handleGoToClass = () => {
            navigation.navigate('[Modal] - ClassScreen', { from: "typeClass", valueDefault: classType, cvefamilia: cvefamiliaValue })
        };

        handleGoToClass()
    }, [cvefamiliaValue, totalClasses])

    console.log({unitValue})

    return (
        <View style={SellsDataScreenTheme(theme, typeTheme).SellsDataScreen}>
            <View style={SellsDataScreenTheme(theme, typeTheme).imageContainer}>
                {
                    imageValue ? (
                        <Image source={{ uri: `data:image/png;base64,${imageValue}` }} style={SellsDataScreenTheme(theme, typeTheme).image} />
                    )
                        :
                        <View style={SellsDataScreenTheme(theme, typeTheme).notImage}></View>
                }
            </View>

            <View style={SellsDataScreenTheme(theme, typeTheme).titleContent}>
                <Text style={SellsDataScreenTheme(theme, typeTheme).title}>{title}</Text>
            </View>

            <TouchableOpacity
                style={SellsDataScreenTheme(theme, typeTheme).inputContainer}
                onPress={() => {
                    if (totalClasses && totalClasses > 1) {
                        navigation.navigate('[Modal] - ClassScreen', { from: "typeClass", valueDefault: classType, cvefamilia: cvefamiliaValue })
                    } else if (totalClasses && totalClasses < 1) {
                        Alert.alert(
                            'No tiene clase este producto',
                            '',
                            [
                                { text: 'Cerrar', style: 'cancel' },
                            ]
                        );
                    }
                }}
            >
                <View style={SellsDataScreenTheme(theme, typeTheme).inputContainer_left}>
                    <Icon name={'resize-outline'} color={iconColor} size={globalFont.font_normal} />
                    <Text style={SellsDataScreenTheme(theme, typeTheme).label}>Clase:</Text>
                </View>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 6
                    }}
                >
                    <Controller
                        control={control}
                        name="typeClass"
                        render={({ field: { value } }) => (
                            <Text>{value ? ((value?.rcapa && value?.rcapa?.trim() !== "") ? value?.rcapa?.trim() : value?.clase?.trim()) : "Selecciona la clase"}</Text>
                        )}
                    />
                    <Icon name={'code'} color={iconColor} size={globalFont.font_normal} style={{ transform: [{ rotate: '90deg' }] }} />
                </View>
            </TouchableOpacity>


            {
                (classType || continueWithoutClass) &&
                <>
                    <TouchableOpacity
                        style={SellsDataScreenTheme(theme, typeTheme).inputContainer}
                        onPress={() => navigation.navigate('[Modal] - PiecesScreen', { from: "pieces", valueDefault: piecesValue, unit: 'PZA' })}
                    >
                        <View style={SellsDataScreenTheme(theme, typeTheme).inputContainer_left}>
                            <Icon name={'bag-handle'} color={iconColor} size={globalFont.font_normal} />
                            <Text style={SellsDataScreenTheme(theme, typeTheme).label}>Cantidad:</Text>
                        </View>
                        <Controller
                            control={control}
                            name="pieces"
                            render={({ field: { value } }) => (
                                <Text>{value ? value : "Seleccion cantidad"}</Text>
                            )}
                        />
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={SellsDataScreenTheme(theme, typeTheme).inputContainer}
                        onPress={() => navigation.navigate('[Modal] - UnitScreen', { from: "units", valueDefault: unitValue })}
                    >
                        <View style={SellsDataScreenTheme(theme, typeTheme).inputContainer_left}>
                            <Icon name={'shapes'} color={iconColor} size={globalFont.font_normal} />
                            <Text style={SellsDataScreenTheme(theme, typeTheme).label}>Unidad:</Text>
                        </View>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 6
                            }}
                        >
                            <Controller
                                control={control}
                                name="units"
                                render={({ field: { value } }) => (
                                    <Text>{value?.descripcio ? value.descripcio : "Seleccion Unidad"}</Text>
                                )}
                            />
                            <Icon name={'code'} color={iconColor} size={globalFont.font_normal} style={{ transform: [{ rotate: '90deg' }] }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={SellsDataScreenTheme(theme, typeTheme).inputContainer}
                        onPress={() => navigation.navigate('[Modal] - PriceScreen', { from: "price", valueDefault: priceValue, unit: 'MXN' })}
                    >
                        <View style={SellsDataScreenTheme(theme, typeTheme).inputContainer_left}>
                            <Icon name={'pricetags'} color={iconColor} size={globalFont.font_normal} />
                            <Text style={SellsDataScreenTheme(theme, typeTheme).label}>Precio:</Text>
                        </View>
                        <Controller
                            control={control}
                            name="price"
                            render={({ field: { value } }) => (
                                <Text>{value ? format(Number(value)) : "Selecciona precio"}</Text>
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
            }

        </View>
    );
};