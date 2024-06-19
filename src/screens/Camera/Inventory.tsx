import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'

import { getProductsByStock } from '../../services/products';
import { ProductInventoryCard } from '../../components/Cards/ProductInventoryCard';
import PorductInterface from '../../interface/product';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colores, globalFont, globalStyles } from '../../theme/appTheme';
import { AuthContext } from '../../context/auth/AuthContext';
import { ProductInventoryCardSkeleton } from '../../components/Skeletons/ProductInventoryCardSkeleton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const Inventory = () => {

    const { handleCodebarScannedProcces } = useContext(AuthContext);
    const { navigate } = useNavigation<any>();
    
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
        navigate('inventoryDetailsScreen', { selectedProduct });
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
            if(productsInInventory.length <= 0) return;
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
        <SafeAreaView style={styles.Inventory}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}> Inventario </Text>
                    <View style={styles.actions}>
                        <Icon
                            name="search-outline"
                            size={30}
                            style={styles.iconSearch}
                            onPress={() => navigate('searchProductScreen')}
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

const styles = StyleSheet.create({
    Inventory: {
        backgroundColor: colores.background_color
    },
    content: {
        paddingHorizontal: globalStyles.globalPadding.padding,
        backgroundColor: colores.background_color,
        height: "100%"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: hp("2.5%"),
        marginTop: hp("7.5%")
    },
    title: {
        display: "flex",
        fontSize: globalFont.font_med
    },
    actions: {
        display: "flex",
        flexDirection: "row"
    },
    iconSearch: {
        marginLeft: 15
    }
})