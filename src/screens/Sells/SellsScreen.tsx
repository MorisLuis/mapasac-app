import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Text, View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { getProductsSells, getTotalProductSells } from '../../services/productsSells';
import { ProductSellsSquareCard } from '../../components/Cards/ProductSellsSquareCard';
import { ProductSellsInterface } from '../../interface/productSells';
import { globalStyles } from '../../theme/appTheme';
import { SellsScreenStyles } from '../../theme/SellsScreenTheme';
import { SellsBagContext } from '../../context/Sells/SellsBagContext';
import { useFocusEffect } from '@react-navigation/native';


export const SellsScreen = () => {

    const { typeTheme, theme } = useTheme();
    const [products, setProducts] = useState<ProductSellsInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { handleUpdateSummary } = useContext(SellsBagContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);

    const loadMoreItem = () => {
        if (products.length < totalProducts) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleGetProducts = async () => {
        setIsLoading(true);

        const products = await getProductsSells(currentPage);

        setProducts((prevProducts) => {
            const newProducts = products?.filter(
                (product: ProductSellsInterface) =>
                    !prevProducts.some(
                        (prevProduct) =>
                            prevProduct.idinvefami === product.idinvefami
                    )
            );

            return prevProducts ? [...prevProducts, ...newProducts] : newProducts;
        });

        setIsLoading(false);
    };

    const renderFooter = useCallback(() => (
        isLoading ? <ActivityIndicator size="large" color={theme.color_primary} /> : null
    ), [isLoading, theme.color_primary]);

    const renderItem = useCallback(({ item }: { item: ProductSellsInterface }) => (
        <ProductSellsSquareCard product={item} />
    ), []);

    useEffect(() => {
        const getTotalCountOfProducts = async () => {
            const total = await getTotalProductSells();
            setTotalProducts(Number(total));
        }
        getTotalCountOfProducts()
    }, [])

    useFocusEffect(
        useCallback(() => {
            handleGetProducts();
            handleUpdateSummary()
            return () => { };
        }, [currentPage])
    );

    return (
        <SafeAreaView style={[SellsScreenStyles(theme, typeTheme).SellsScreen]}>
            <View style={SellsScreenStyles(theme).content}>

                { products.length > 1 ?
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
                                ListFooterComponent={renderFooter}
                                onEndReached={loadMoreItem}
                                onEndReachedThreshold={0}
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


