import React, { useCallback, useContext, useState } from 'react'
import { Button, FlatList, SafeAreaView, Text, View } from 'react-native'

import { getProductsByStock } from '../../services/products';
import { ProductInventoryCard } from '../../components/Cards/ProductInventoryCard';
import PorductInterface from '../../interface/product';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProductInventoryCardSkeleton } from '../../components/Skeletons/ProductInventoryCardSkeleton';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { useTheme } from '../../context/ThemeContext';
import { InventoryScreenStyles } from '../../theme/InventoryScreenTheme';


export const Inventory = () => {

    const { handleCodebarScannedProcces } = useContext(SettingsContext);
    const { navigate } = useNavigation<any>();
    const { theme, typeTheme, toggleTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black"

    const [productsInInventory, setProductsInInventory] = useState<PorductInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const handleGetProductsByStock = async () => {
        setIsLoading(true);

        const products = await getProductsByStock(currentPage)
        setProductsInInventory(prevProducts =>
            prevProducts ? [...prevProducts, ...products] : products
        );
        setIsLoading(false);
    }

    const loadMoreItem = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePressProduct = (selectedProduct: PorductInterface) => {
        handleCodebarScannedProcces(false);
        navigate('[ProductDetailsPage] - inventoryDetailsScreen', { selectedProduct });
    };

    // Renders
    const renderItem = ({ item }: { item: PorductInterface }) => {
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
        setProductsInInventory([]);
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            if (productsInInventory.length <= 0) return;
            handleGetProductsByStock()
        }, [currentPage])
    )

    useFocusEffect(
        useCallback(() => {
            resetInventory();
            handleGetProductsByStock();
        }, [])
    )

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
                            onPress={() => navigate('searchProductScreen')}
                            color={iconColor}
                        />
                    </View>
                </View>

                <FlatList
                    data={productsInInventory}
                    renderItem={renderItem}
                    keyExtractor={product => `${product.Codigo}-${product.Id_Marca}-${product.Marca}-${product.Id_Almacen}-${product.Id_ListaPrecios}`}
                    ListFooterComponent={renderLoader}
                    onEndReached={loadMoreItem}
                    onEndReachedThreshold={0}
                />
            </View>
        </SafeAreaView>
    )
}

