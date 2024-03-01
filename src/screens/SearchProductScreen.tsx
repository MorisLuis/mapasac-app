import React, { useEffect, useLayoutEffect, useState } from 'react'

import { FlatList, SafeAreaView, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { getSearchProductInStock } from '../services/Search/products';
import PorductInterface from '../interface/product';
import { ProductItemSearch } from '../components/Cards/ProductItemSearch';
import { LoadingScreen } from './LoadingScreen';

export const SearchProductScreen = () => {

    const navigation = useNavigation<any>();
    const [productsInInventory, setProductsInInventory] = useState<PorductInterface[]>([])
    const [currentPage, setCurrentPage] = useState(1);

    const getSearchData = async (searchTerm: string) => {
        const products = await getSearchProductInStock(searchTerm ? searchTerm : "")
        setProductsInInventory(products);
    }

    const renderItem = ({ item }: { item: PorductInterface }) => {
        return (
            <ProductItemSearch product={item} onClick={() => handlePress(item)} />
        );
    };

    const loadMoreItem = () => {
        setCurrentPage(currentPage + 1);
    };

    const navigateToProduct = (selectedProduct: PorductInterface) => {
        navigation.navigate('InventoryDetails', { selectedProduct });
    };

    const handlePress = (item: PorductInterface) => {
        navigateToProduct(item)
    };

    useEffect(() => {
        getSearchData("")
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLargeTitle: true,
            headerTitle: "Productos",
            headerSearchBarOptions: {
                placeholder: "Buscar producto...",
                onChangeText: (event: any) => {
                    getSearchData(event.nativeEvent.text);
                },
            },
        });
    }, [navigation]);


    return  (productsInInventory && productsInInventory.length > 0) ? (
        <SafeAreaView>
            <View
                style={{
                    padding: 20
                }}
            >
                <FlatList
                    data={productsInInventory}
                    renderItem={renderItem}
                    keyExtractor={product => `${product.Codigo}-${product.Id_Marca}-${product.Marca}-${product.Id_Almacen}-${product.Id_ListaPrecios}`}
                    onEndReached={loadMoreItem}
                    onEndReachedThreshold={0}
                />
            </View>
        </SafeAreaView>
    )
    :
    <LoadingScreen/>
}
