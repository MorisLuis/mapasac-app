import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalFont, globalStyles } from '../../theme/appTheme';
import { format } from '../../utils/currency';
import { SellsDataScreenTheme } from '../../theme/SellsDataScreenTheme';
import { buttonStyles } from '../../theme/UI/buttons';
import { getProductSellsDetailsBycvefamilia } from '../../services/productsSells';
import ProductInterface from '../../interface/product';
import { UnitData } from '../../interface/units';
import { ClassData } from '../../interface/class';


interface SellsDataScreenInterface {
    route?: {
        params: {
            cvefamilia?: number;
            pieces?: string;
            price?: string;
            typeClass?: ClassData;
            units?: UnitData;
        };
    };
}

export const SellsDataScreen = ({ route }: SellsDataScreenInterface) => {
    const { pieces, price, typeClass, units, cvefamilia } = route?.params ?? {};
    const { typeTheme, theme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : theme.text_color_light;

    console.log({cvefamilia})

    const navigation = useNavigation<any>();
    const [classType, setClassType] = useState<ClassData>();
    const [piecesValue, setPiecesValue] = useState<string>();
    const [priceValue, setPriceValue] = useState<string>();
    const [unitValue, setUnitValue] = useState<UnitData>()
    const buttondisabled = false;

    const onSubmit = (data: any) => {
        console.log("Form Data:", data);
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
                rproducto: typeClass.rproducto
            })
        }

        if (units) {
            setValue('units', units);
            setUnitValue({
                unidad: units?.unidad as number,
                descripcio: units?.descripcio?.trim() as string
            })
        }
    }, [pieces, price, typeClass, units]);


    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            pieces: pieces,
            price: price,
            typeClass: typeClass,
            units: units
        },
    });


    useEffect(() => {
        const handleGetProducts = async () => {
            const product: ProductInterface = await getProductSellsDetailsBycvefamilia(cvefamilia as number);
            setValue('price', product?.precio1.toString());
            setPriceValue(product?.precio1.toString())

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

        };
        handleGetProducts();
    }, []);


    return (
        <View style={SellsDataScreenTheme(theme, typeTheme).SellsDataScreen}>
            <View style={SellsDataScreenTheme(theme, typeTheme).imageContainer}>
                <View style={SellsDataScreenTheme(theme, typeTheme).image}>
                    <Image
                        source={require('../../assets/apple.jpg')}
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: globalStyles(theme).borderRadius.borderRadius,
                            borderWidth: 0.5,
                            borderColor: theme.color_border_secondary
                        }}
                    />
                </View>
            </View>

            <View style={SellsDataScreenTheme(theme, typeTheme).titleContent}>
                <Text style={SellsDataScreenTheme(theme, typeTheme).title}>Calabaza</Text>
            </View>

            <TouchableOpacity
                style={SellsDataScreenTheme(theme, typeTheme).inputContainer}
                onPress={() => navigation.navigate('classScreen', { from: "typeClass", valueDefault: classType, cvefamilia: cvefamilia })}
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
                            <Text>{value?.rcapa ? value?.rcapa?.trim() : value?.rproducto}</Text>
                        )}
                    />
                    <Icon name={'code'} color={iconColor} size={globalFont.font_normal} style={{ transform: [{ rotate: '90deg' }] }} />
                </View>
            </TouchableOpacity>


            <TouchableOpacity
                style={SellsDataScreenTheme(theme, typeTheme).inputContainer}
                onPress={() => navigation.navigate('piecesScreen', { from: "pieces", valueDefault: piecesValue, unit: 'PZA' })}
            >
                <View style={SellsDataScreenTheme(theme, typeTheme).inputContainer_left}>
                    <Icon name={'bag-handle'} color={iconColor} size={globalFont.font_normal} />
                    <Text style={SellsDataScreenTheme(theme, typeTheme).label}>Cantidad:</Text>
                </View>
                <Controller
                    control={control}
                    name="pieces"
                    render={({ field: { value } }) => (
                        <Text>{value}</Text>
                    )}
                />
            </TouchableOpacity>


            <TouchableOpacity
                style={SellsDataScreenTheme(theme, typeTheme).inputContainer}
                onPress={() => navigation.navigate('unitScreen', { from: "units", valueDefault: unitValue })}
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
                            <Text>{value?.descripcio}</Text>
                        )}
                    />
                    <Icon name={'code'} color={iconColor} size={globalFont.font_normal} style={{ transform: [{ rotate: '90deg' }] }} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={SellsDataScreenTheme(theme, typeTheme).inputContainer}
                onPress={() => navigation.navigate('priceScreen', { from: "price", valueDefault: priceValue, unit: 'MXN' })}
            >
                <View style={SellsDataScreenTheme(theme, typeTheme).inputContainer_left}>
                    <Icon name={'pricetags'} color={iconColor} size={globalFont.font_normal} />
                    <Text style={SellsDataScreenTheme(theme, typeTheme).label}>Precio:</Text>
                </View>
                <Controller
                    control={control}
                    name="price"
                    render={({ field: { value } }) => (
                        <Text>{format(Number(value))}</Text>
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
        </View>
    );
};