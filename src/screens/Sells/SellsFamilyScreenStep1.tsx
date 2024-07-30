import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { ProductSellsFamilyInterface } from '../../interface/productSells';
import { getProductsSellsFromFamily } from '../../services/productsSells';
import { buttonStyles } from '../../theme/UI/buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../../theme/appTheme';
import { SellsFamilyScreenStepStyles } from '../../theme/SellsFamilyScreenStep';
import { useFocusEffect } from '@react-navigation/native';

interface SellsFamilyScreenStep1Interface {
    route?: {
        params: {
            cvefamilia?: number;
            descripcio?: string
        };
    };
    visible: boolean;
    move: () => void;
    back: () => void;
    cvefamilia?: number;
    descripcio?: string
}

export const SellsFamilyScreenStep1 = ({
    route,
    visible,
    move,
    back,
    cvefamilia,
    descripcio
}: SellsFamilyScreenStep1Interface) => {

    const { theme, typeTheme } = useTheme();
    const [products, setProducts] = useState<ProductSellsFamilyInterface[]>([]);
    const [optionSelected, setOptionSelected] = useState<number>()
    const buttondisabled = optionSelected !== undefined ? false : true


    useFocusEffect(
        useCallback(() => {
            const handleGetProductsFamily = async () => {
                const products = await getProductsSellsFromFamily(cvefamilia as number);
                setProducts(products)
            };
    
            handleGetProductsFamily()
        }, [])
    );

    return visible && (
        <View style={SellsFamilyScreenStepStyles(theme, typeTheme).SellsFamilyScreenStep}>
            <View style={SellsFamilyScreenStepStyles(theme, typeTheme).header}>
                <Text style={SellsFamilyScreenStepStyles(theme, typeTheme).headerTitle}>Selecciona la clase.</Text>
                <Text style={SellsFamilyScreenStepStyles(theme, typeTheme).headerSubtitle}>{descripcio}</Text>
            </View>

            {/* OPCIONES */}
            <View style={SellsFamilyScreenStepStyles(theme, typeTheme).SellsFamilyScreenStep1_grid}>

                {
                    products.map((item: ProductSellsFamilyInterface, index: number) => (
                        <TouchableOpacity
                            onPress={() => setOptionSelected(index)}
                            key={`${item.ridinveclas}_${item?.rcapa ? item?.rcapa : 0}`}
                            style={[
                                SellsFamilyScreenStepStyles(theme, typeTheme).SellsFamilyScreenStep1_card,
                                optionSelected === index ? { backgroundColor: theme.color_tertiary } : { backgroundColor: theme.background_color }
                            ]}
                        >
                            <Text style={SellsFamilyScreenStepStyles(theme, typeTheme).SellsFamilyScreenStep1_card_text}>
                                {
                                    item?.rcapa ?
                                        item?.rcapa?.trim() :
                                        item?.clase?.trim()
                                }
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </View>

            <TouchableOpacity
                style={[buttonStyles(theme).button, buttonStyles(theme).yellow, { display: 'flex', flexDirection: 'row' },
                ...(buttondisabled ? [buttonStyles(theme).disabled] : [])
                ]}
                onPress={move}
                disabled={buttondisabled}
            >
                <Text style={buttonStyles(theme, typeTheme).buttonTextSecondary}>Siguiente</Text>
                <Icon name="arrow-forward-outline" size={16} color={"black"} style={{ marginRight: 10 }} />
            </TouchableOpacity>
        </View>
    )
};
