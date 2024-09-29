import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FlatList, SafeAreaView, View } from 'react-native'

import { getProducts, getTotalProducts } from '../../../services/products';
import ProductInterface from '../../../interface/product';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SettingsContext } from '../../../context/settings/SettingsContext';
import { useTheme } from '../../../context/ThemeContext';
import { InventoryScreenStyles } from '../../../theme/InventoryScreenTheme';
import useErrorHandler from '../../../hooks/useErrorHandler';
import CustomText from '../../../components/Ui/CustumText';
import LayoutGrandient from '../../../components/Layouts/LayoutGrandient';
import { globalFont } from '../../../theme/appTheme';
import Tag from '../../../components/Ui/Tag';
import { ProductInventoryCard } from '../../../components/Cards/ProductCard/ProductInventoryCard';
import InventorySkeleton from '../../../components/Skeletons/Screens/InventorySkeleton';
import { InventoryNavigationProp } from '../../../interface/navigation';

export const Inventory = () => {

    const { handleCodebarScannedProcces } = useContext(SettingsContext);
    const { handleError } = useErrorHandler()

    const { navigate } = useNavigation<InventoryNavigationProp>();
    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black"

    const [productsInInventory, setProductsInInventory] = useState<ProductInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);

    const handleGetProductsByStock = async () => {

        try {
            setIsLoading(true);
            const products = await getProducts(currentPage);
            if (products?.error) return handleError(products.error);
            setProductsInInventory((prevProducts) => {
                const newProducts = products?.filter(
                    (product: ProductInterface) =>
                        !prevProducts.some(
                            (prevProduct) =>
                                prevProduct.idinvearts === product.idinvearts
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

    const loadMoreItem = () => {
        if (productsInInventory.length < totalProducts) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePressProduct = (selectedProduct: ProductInterface) => {
        handleCodebarScannedProcces(false);
        navigate('[ProductDetailsPage] - inventoryDetailsScreen', { selectedProduct, fromModal: false });
    };

    const renderItem = ({ item }: { item: ProductInterface }) => {
        return <ProductInventoryCard product={item} onClick={() => handlePressProduct(item)} />;
    };

    /* const renderLoader = () => {
        return (
            isLoading ?
                Array.from({ length: 10 }).map((_, index) => (
                    <CardSelectSkeleton />
                ))
                : null
        );
    }; */

    const resetInventory = useCallback(() => {
        setCurrentPage(1);
    }, []);

    const renderFooter = () => {
        return (
            <View>
                <CustomText style={InventoryScreenStyles(theme).footerMessage}>Estos son todos los productos que tienes.({totalProducts})</CustomText>
            </View>
        );
    };

    useFocusEffect(
        useCallback(() => {
            handleGetProductsByStock();
            return () => { };
        }, [currentPage])
    );

    useEffect(() => {
        const getTotalCountOfProducts = async () => {
            const total = await getTotalProducts();
            if (total?.error) return handleError(total.error);
            setTotalProducts(Number(total));
        }
        getTotalCountOfProducts()
    }, [])

    useFocusEffect(
        useCallback(() => {
            resetInventory();
            handleGetProductsByStock();
        }, [])
    );

    if (productsInInventory.length <= 0) {
        return <InventorySkeleton />
    }


    return (
        <LayoutGrandient color="green">
            <SafeAreaView>
                <View style={InventoryScreenStyles(theme).content}>

                    <View style={InventoryScreenStyles(theme).header}>
                        <View style={InventoryScreenStyles(theme).headerContent}>
                            <CustomText style={InventoryScreenStyles(theme).title}>Inventario</CustomText>
                            <View style={InventoryScreenStyles(theme).subtitle}>
                                <Tag message={`${totalProducts} Productos`} color='green' />
                            </View>
                        </View>

                        <View style={InventoryScreenStyles(theme).actions}>
                            <Icon
                                name="search-outline"
                                size={globalFont.font_big}
                                style={InventoryScreenStyles(theme).iconSearch}
                                onPress={() => navigate('searchProductScreen', { modal: false, isModal: false })}
                                color={iconColor}
                            />
                        </View>
                    </View>

                    <FlatList
                        data={productsInInventory}
                        renderItem={renderItem}
                        keyExtractor={product => `${product.idinvearts}`}
                        ListFooterComponent={renderFooter}
                        onEndReached={loadMoreItem}
                        onEndReachedThreshold={0}
                    />

                </View>
            </SafeAreaView>
        </LayoutGrandient>
    )
}

