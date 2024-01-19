import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../../theme/UI/cardsStyles';
import { getProductsByStock } from '../../services/products';
import { ProductInventoryCard } from '../../components/Cards/ProductInventoryCard';
import PorductInterface from '../../interface/product';

export const Inventory = () => {

    const [productsInInventory, setProductsInInventory] = useState<PorductInterface[]>()

    const handleGetProductsByStock = async () => {
        const porducts = await getProductsByStock()
        setProductsInInventory(porducts)
    }

    useEffect(() => {
        console.log('Inventary');
        handleGetProductsByStock()
    }, [])

    return (
        <SafeAreaView style={{
            padding: 10,
            paddingTop: 80
        }}>
            <Text style={styles.title}> Inventario </Text>

            {
                productsInInventory?.map((product) =>
                    <ProductInventoryCard
                        key={`${product.Codigo}-${product.Id_Marca}-${product.Marca}-${product.Id_Almacen}`}
                        product={product}
                    />
                )
            }
        </SafeAreaView>
    )
}
