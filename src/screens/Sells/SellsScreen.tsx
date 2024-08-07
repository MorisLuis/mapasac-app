import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, SafeAreaView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { getProductsSells } from '../../services/productsSells';
import { ProductSellsSquareCard } from '../../components/Cards/ProductSellsSquareCard';
import { ProductSellsInterface } from '../../interface/productSells';
import { globalStyles } from '../../theme/appTheme';
import { SellsScreenStyles } from '../../theme/SellsScreenTheme';


export const SellsScreen = () => {

    const { typeTheme, theme } = useTheme();
    const iconColor = theme.color_tertiary;

    const [products, setProducts] = useState<ProductSellsInterface[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleGetProducts = async () => {
            const products = await getProductsSells(1);
            setProducts(products);
            setLoading(false);
        };
        handleGetProducts();
    }, []);

    const renderItem = ({ item }: { item: ProductSellsInterface }) => (
        <ProductSellsSquareCard product={item} />
    );

    return (
        <SafeAreaView style={[SellsScreenStyles(theme, typeTheme).SellsScreen]}>
            <View style={SellsScreenStyles(theme).content}>

                {
                    products.length > 1 ?
                        <>
                            <View style={SellsScreenStyles(theme).header}>
                                <Text style={{ color: theme.text_color, fontSize: 20 }}>Ventas</Text>
                            </View>


                            <FlatList
                                data={products}
                                numColumns={2}
                                renderItem={renderItem}
                                keyExtractor={(item: ProductSellsInterface) => item.idinvefami.toString()}
                                contentContainerStyle={{ gap: globalStyles(theme).globalPadding.padding }}
                                columnWrapperStyle={{ gap: globalStyles(theme).globalPadding.padding }}
                            />
                        </>
                        :
                        <View style={SellsScreenStyles(theme).header}>
                            <Text>Cargando...</Text>
                        </View>
                }
            </View>
        </SafeAreaView>
    )
};


