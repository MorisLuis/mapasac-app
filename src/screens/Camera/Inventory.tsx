import React, { useEffect, useState } from 'react'
import { FlatList, StatusBar, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../../theme/UI/cardsStyles';
import { getProductsByStock } from '../../services/products';
import { ProductInventoryCard } from '../../components/Cards/ProductInventoryCard';
import PorductInterface from '../../interface/product';
import { useNavigation } from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { InventoryNavigationStackParamList } from '../../navigator/InventoryNavigation';


export const Inventory = () => {

    const [productsInInventory, setProductsInInventory] = useState<PorductInterface[]>()
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const {navigate} = useNavigation<NativeStackNavigationProp<InventoryNavigationStackParamList>>();

    const navigateToInventaryDetails = () => {
        navigate('InventaryDetails')
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
        console.log(`Elemento presionado: ${item.Codigo}`)
        navigateToInventaryDetails()
    };

    useEffect(() => {
        handleGetProductsByStock()
    }, [currentPage])

    return (
        <SafeAreaView style={{
            padding: 10,
            paddingTop: 80
        }}>
            <Text style={styles.title}> Inventario </Text>
            <StatusBar backgroundColor="#000" />
            <FlatList
                data={productsInInventory}
                renderItem={renderItem}
                keyExtractor={product => `${product.Codigo}-${product.Id_Marca}-${product.Marca}-${product.Id_Almacen}`}
                ListFooterComponent={renderLoader}
                onEndReached={loadMoreItem}
                onEndReachedThreshold={0}
            />
        </SafeAreaView>
    )
}
