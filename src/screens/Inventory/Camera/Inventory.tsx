import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FlatList, SafeAreaView, Text, View } from 'react-native'

import { getProducts, getTotalProducts } from '../../../services/products';
import { ProductInventoryCard } from '../../../components/Cards/ProductInventoryCard';
import ProductInterface from '../../../interface/product';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProductInventoryCardSkeleton } from '../../../components/Skeletons/ProductInventoryCardSkeleton';
import { SettingsContext } from '../../../context/settings/SettingsContext';
import { useTheme } from '../../../context/ThemeContext';
import { InventoryScreenStyles } from '../../../theme/InventoryScreenTheme';
import useErrorHandler from '../../../hooks/useErrorHandler';
import { InventoryNavigationProp } from '../../../navigator/InventoryNavigation';

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

            if (products.error) {
                handleError(products.error);
                return;
            }

            setProductsInInventory((prevProducts) => {
                const newProducts = products?.filter(
                    (product: any) =>
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

    const renderLoader = () => {
        return (
            isLoading ?
                Array.from({ length: 10 }).map((_, index) => (
                    <ProductInventoryCardSkeleton key={index} />
                ))
                : null
        );
    };

    const resetInventory = useCallback(() => {
        setCurrentPage(1);
    }, []);

    const renderFooter = () => {
        return (
            <View style={InventoryScreenStyles(theme).footerContent}>
                {
                    productsInInventory.length > 0 && productsInInventory.length >= totalProducts ?
                        <Text style={InventoryScreenStyles(theme).footerMessage}>Estos son todos los productos que tienes.({totalProducts})</Text>
                        :
                        renderLoader()
                }
            </View>
        );
    };

    useFocusEffect(
        useCallback(() => {
            handleGetProductsByStock();
            return () => {};
        }, [currentPage])
    );

    useEffect(() => {
        const getTotalCountOfProducts = async () => {
            const total = await getTotalProducts();
            if (total.error) {
                handleError(total.error);
                return;
            }
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


    return (
        <SafeAreaView style={InventoryScreenStyles(theme).Inventory}>
            <View style={InventoryScreenStyles(theme).content}>

                <View style={InventoryScreenStyles(theme).header}>
                    <Text style={InventoryScreenStyles(theme).title}>Inventario</Text>
                    <View style={InventoryScreenStyles(theme).actions}>
                        <Icon
                            name="search-outline"
                            size={30}
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
    )
}

