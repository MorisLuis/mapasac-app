import React, { useContext, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ProductInventoryCard } from '../../Cards/ProductInventoryCard'
import { InventoryBagContext } from '../../../context/Inventory/InventoryBagContext'
import PorductInterface from '../../../interface/product'
import { postInventory, postInventoryDetails } from '../../../services/inventory'
import { LoadingScreen } from '../../../screens/LoadingScreen'

interface InventoryBagInterface {
    onClose: () => void
}

export const InventoryBag = ({
    onClose
}: InventoryBagInterface) => {


    const { bag, cleanBag, numberOfItems, removeProduct } = useContext(InventoryBagContext)
    const [createInventaryLoading, setCreateInventaryLoading] = useState(false)

    const handleCleanTemporal = () => {
        cleanBag()
        onClose()
    }

    const onDelete = (product: PorductInterface) => {
        removeProduct(product)
    }

    const onPostInventary = async () => {
        setCreateInventaryLoading(true)
        await postInventory();
        await postInventoryDetails(bag);
        cleanBag();
        onClose();
        setCreateInventaryLoading(false)
    }

    return !createInventaryLoading ? (
        <View>
            <Text style={styles.title}>Nuevo Inventario</Text>

            {
                bag.map((product) =>
                    <ProductInventoryCard
                    key={`${product.Codigo}-${product.Id_Marca}-${product.Marca}-${product.Id_Almacen}`}
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

            <TouchableOpacity
                style={styles.postInventoryButton}
                onPress={onPostInventary}
            >
                <Text style={styles.buttonText}>Crear Inventario</Text>
            </TouchableOpacity>
        </View>
    ) 
    :
    <LoadingScreen/>
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
    },
    postInventoryButton: {
        backgroundColor: "green",
        width: "100%",
        color: "white",
        borderRadius: 5,
        marginBottom: 10
    },
});