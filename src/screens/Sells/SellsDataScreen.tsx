import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { getProductSellsDetails, getProductsSellsFromFamily, getUnits } from '../../services/productsSells';
import { SellsDataScreenTheme } from '../../theme/SellsDataScreenTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalFont, globalStyles } from '../../theme/appTheme';
import { format } from '../../utils/currency';

interface SellsDataScreenInterface {
    route?: {
        params: {
            cvefamilia?: number;
            descripcio?: string
        };
    };
}

export const SellsDataScreen = ({ route }: SellsDataScreenInterface) => {

    const { cvefamilia, descripcio } = route?.params ?? {};
    const { typeTheme, theme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : theme.text_color_light

    const navigation = useNavigation<any>();

    /* useEffect(() => {
        const handleGetUnits = async () => {
            const units = await getUnits();
        }

        const handleGetProductsSellsFromFamily = async () => {
            if(!cvefamilia) return;
            const productFromFamily = await getProductsSellsFromFamily(cvefamilia);
            console.log({productFromFamily: productFromFamily[0]})

            const idinveart = productFromFamily[0].ridinvearts

            console.log({idinveart})
            const handleGetProductDetails = async () => {
                const product = await getProductSellsDetails(idinveart);
                console.log({produc: JSON.stringify(product, null, 2)})
            }

            handleGetProductDetails()
        }


        handleGetUnits()
        handleGetProductsSellsFromFamily()
    }, []) */


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


                <TouchableOpacity style={SellsDataScreenTheme(theme, typeTheme).inputContainer} onPress={() => navigation.navigate('piecesScreen', {valueDefault : "100", unit: "PZA"})}>
                    <View style={SellsDataScreenTheme(theme, typeTheme).inputContainer_left}>
                        <Icon name={'bag-handle'} color={iconColor} size={globalFont.font_normal} />
                        <Text style={SellsDataScreenTheme(theme, typeTheme).label}>Cantidad:</Text>
                    </View>
                    <Text>100</Text>
                </TouchableOpacity>

                <TouchableOpacity style={SellsDataScreenTheme(theme, typeTheme).inputContainer} onPress={() => navigation.navigate('priceScreen', {valueDefault : "200", unit: "MXN"})}>
                    <View style={SellsDataScreenTheme(theme, typeTheme).inputContainer_left}>
                        <Icon name={'pricetags'} color={iconColor} size={globalFont.font_normal} />
                        <Text style={SellsDataScreenTheme(theme, typeTheme).label}>Precio:</Text>
                    </View>
                    <Text>{format(200)}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={SellsDataScreenTheme(theme, typeTheme).inputContainer}>
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
                        <Text>PZA</Text>
                        <Icon name={'code'} color={iconColor} size={globalFont.font_normal} style={{ transform: [{ rotate: '90deg' }] }} />
                    </View>
                </TouchableOpacity>

            </View>
    )
};
