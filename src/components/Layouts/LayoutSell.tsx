import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
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
import useErrorHandler from '../../hooks/useErrorHandler';
import CustomText from '../Ui/CustumText';
import LayoutGrandient from './LayoutGrandient';
import { AuthContext } from '../../context/auth/AuthContext';
import { ProductSellsSquareCardSkeleton } from '../Skeletons/ProductSquareCardSkeleton';
import LayoutSellSkeleton from '../Skeletons/Screens/LayoutSellSkeleton';

interface LayoutSellInterface {
    renderItem: ({ item }: { item: ProductSellsInterface }) => React.JSX.Element;
    opcion: number
}

export const LayoutSell = ({
    renderItem,
    opcion
}: LayoutSellInterface) => {

    const { theme } = useTheme();
    const { status } = useContext(AuthContext);
    const { handleUpdateSummary, productAdded } = useContext(SellsBagContext);

    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<ProductSellsInterface[]>([]);

    const { handleError } = useErrorHandler();

    const loadMoreItem = () => {
        if (products.length < totalProducts) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleGetPrice = async () => {
        console.log("handleGetPrice")
        try {
            const totalprice = await getTotalPriceBag({ opcion: 2, mercado: true });
            if (totalprice?.error) return handleError(totalprice.error)
            setTotalPrice(parseFloat(totalprice ?? 0));
        } catch (error: any) {
            console.log({ error })
            handleError(error);
        };
    };

    const handleGetProducts = async () => {
        try {
            setIsLoading(true);
            const products = await getProductsSells(currentPage);
            if (products.error) return handleError(products.error);

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

        } catch (error) {
            handleError(error)
        } finally {
            setIsLoading(false);
        }
    };

    const renderFooter = useCallback(() => (
        isLoading ? <ActivityIndicator size="large" color={theme.color_primary} /> : null
    ), [isLoading, theme.color_primary]);

    useEffect(() => {
        const getTotalCountOfProducts = async () => {
            const total = await getTotalProductSells();
            if (total?.error) return handleError(total.error);
            setTotalProducts(Number(total));
        }
        getTotalCountOfProducts()
    }, [])

    useFocusEffect(
        useCallback(() => {
            handleGetProducts();
            handleUpdateSummary();
            return () => { };
        }, [currentPage])
    );

    useEffect(() => {
        if (status !== 'authenticated') return;
        handleGetPrice();
    }, [productAdded]);


    if (products.length < 1) {
        return <LayoutSellSkeleton/>
    }

    return (
        <LayoutGrandient color="purple">
            <SafeAreaView>
                <View style={SellsScreenStyles(theme).SellsScreen}>
                    <View style={SellsScreenStyles(theme).header}>
                        <CustomText style={SellsScreenStyles(theme).header_title}>Ventas</CustomText>
                        <CustomText style={SellsScreenStyles(theme).header_subtitle}>Total de venta</CustomText>
                        <CustomText style={[SellsScreenStyles(theme).header_total]}>
                            {
                                productAdded ? 'Calculando...' : format(totalPrice)
                            }
                        </CustomText>
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
                </View>
            </SafeAreaView>
        </LayoutGrandient>
    )
}

