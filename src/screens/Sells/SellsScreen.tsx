import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Text, View, FlatList, SafeAreaView, Button } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { getProductsSells, getTotalProductSells } from '../../services/productsSells';
import { ProductSellsSquareCard } from '../../components/Cards/ProductSellsSquareCard';
import { ProductSellsInterface } from '../../interface/productSells';
import { globalStyles } from '../../theme/appTheme';
import { SellsScreenStyles } from '../../theme/SellsScreenTheme';
import { SellsBagContext } from '../../context/Sells/SellsBagContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


export const SellsScreen = () => {

    const { typeTheme, theme } = useTheme();
    const iconColor = theme.color_tertiary;
    const { navigate } = useNavigation<any>();

    const [products, setProducts] = useState<ProductSellsInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const { handleUpdateSummary } = useContext(SellsBagContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);

    const loadMoreItem = () => {
        if (products.length < totalProducts) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleGetProducts = async () => {
        setLoading(true);

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

        setLoading(false);
    };

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


