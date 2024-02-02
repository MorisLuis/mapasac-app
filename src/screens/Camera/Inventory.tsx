import React, { useEffect, useState } from 'react'
import { FlatList, StatusBar, Text, View } from 'react-native'
import { styles } from '../../theme/UI/cardsStyles';
import { getProductsByStock } from '../../services/products';
import { ProductInventoryCard } from '../../components/Cards/ProductInventoryCard';
import PorductInterface from '../../interface/product';
import { useNavigation } from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';


export const Inventory = () => {

    const [productsInInventory, setProductsInInventory] = useState<PorductInterface[]>()
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const {navigate} = useNavigation<any>();

    const navigateToInventaryDetails = (selectedProduct: PorductInterface) => {
        navigate('InventoryDetails', { selectedProduct });
    };

    const handleGetProductsByStock = async () => {
        setIsLoading(true);
        const porducts = await getProductsByStock(currentPage)
        setProductsInInventory(productsInInventory ? [...productsInInventory, ...porducts] : porducts)
        setIsLoading(false);
    }


    const renderItem = ({ item }: { item: PorductInterface }) => {
        return (
            <ProductInventoryCard product={item} onClick={() => handlePress(item)} />
        );
    };

    const renderLoader = () => {
        return (
            isLoading ?
                <View>
                    <Text>Cargando...</Text>
                </View> : null
        );
    };

    const loadMoreItem = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePress = (item: PorductInterface) => {
        navigateToInventaryDetails(item)
    };

    useEffect(() => {
        handleGetProductsByStock()
    }, [currentPage])

    return (
        <View style={{
            padding: 10
        }}>
            <Text style={styles.title}> Inventario </Text>
            <FlatList
                data={productsInInventory}
                renderItem={renderItem}
                keyExtractor={product => `${product.Codigo}-${product.Id_Marca}-${product.Marca}-${product.Id_Almacen}-${product.Id_ListaPrecios}`}
                ListFooterComponent={renderLoader}
                onEndReached={loadMoreItem}
                onEndReachedThreshold={0}
            />
        </View>
    )
}
