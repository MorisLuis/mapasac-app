import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { SellsScreenStyles } from '../../theme/SellsScreenTheme';
import { useTheme } from '../../context/ThemeContext';
import { ProductSellsInterface } from '../../interface/productSells';
import { format } from '../../utils/currency';
import { globalStyles } from '../../theme/appTheme';
import { ActivityIndicator } from 'react-native-paper';
import { getTotalPriceBag } from '../../services/bag';
import { SellsBagContext } from '../../context/Sells/SellsBagContext';
import { getProductsSells, getTotalProductSells } from '../../services/productsSells';
import { useFocusEffect } from '@react-navigation/native';

interface LayoutSellInterface {
    renderItem:  ({ item }: { item: ProductSellsInterface }) => React.JSX.Element;
    opcion: number
}

export const LayoutSell = ({
    renderItem,
    opcion
}: LayoutSellInterface) => {

    const { typeTheme, theme } = useTheme();
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const { handleUpdateSummary } = useContext(SellsBagContext);
    const [totalProducts, setTotalProducts] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<ProductSellsInterface[]>([]);

    const loadMoreItem = () => {
        if (products.length < totalProducts) {
            setCurrentPage(currentPage + 1);
        }
    };

    useEffect(() => {
        const getTotalCountOfProducts = async () => {
            const total = await getTotalProductSells();
            setTotalProducts(Number(total));
        }
        getTotalCountOfProducts()
    }, [])

    const handleGetPrice = async () => {
        const totalprice = await getTotalPriceBag({ opcion: 2, mercado: true });
        setTotalPrice(parseFloat(totalprice));
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


    useFocusEffect(
        useCallback(() => {
            handleGetProducts();
            handleUpdateSummary();
            return () => { };
        }, [currentPage])
    );

    useEffect(() => {
        handleGetPrice();
    }, [handleUpdateSummary]);

    return (
        <SafeAreaView style={[SellsScreenStyles(theme, typeTheme).SellsScreen]}>
            <View style={SellsScreenStyles(theme).content}>

                {products.length > 1 ?
                    <>
                        <View style={SellsScreenStyles(theme).header}>
                            <Text style={SellsScreenStyles(theme).header_subtitle}>Total de venta</Text>
                            <Text style={SellsScreenStyles(theme).header_total}>{format(totalPrice)}</Text>
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
}
