import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ProductInventoryCard } from '../../Cards/ProductInventoryCard'
import { InventoryBagContext } from '../../../context/Inventory/InventoryBagContext'
import PorductInterface from '../../../interface/product'

interface InventoryBagInterface {
    onClose: () => void
}

export const InventoryBag = ({
    onClose
}: InventoryBagInterface) => {

    const { bag, cleanBag, numberOfItems, removeProduct } = useContext(InventoryBagContext)

    const handleCleanTemporal = () => {
        cleanBag()
        onClose()
    }

    const onDelete = (product: PorductInterface) => {
        removeProduct(product)
    }

    return (
        <View>
            <Text style={styles.title}> Nuevo Inventario </Text>

            {
                bag.map((product) =>
                    <ProductInventoryCard
                        key={`${product.Codigo}-${product.Id_Marca}`}
                        product={product}
                        onDelete={onDelete}
                        showDelete
                    />
                )
            }

            {
                numberOfItems > 0 &&
                <TouchableOpacity
                    style={styles.toogleButton}
                    onPress={handleCleanTemporal}
                >
                    <Text style={styles.buttonText}>Limpiar carrito</Text>
                </TouchableOpacity>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    title: {

    },
    toogleButton: {
        backgroundColor: "blue",
        width: "100%",
        color: "white",
        borderRadius: 5,
        marginBottom: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
        display: "flex",
        textAlign: "center"
    }
});