import React, { useContext, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ProductInventoryCard } from '../../Cards/ProductInventoryCard'
import { InventoryBagContext } from '../../../context/Inventory/InventoryBagContext'
import PorductInterface from '../../../interface/product'
import { LoadingScreen } from '../../../screens/LoadingScreen'
import { buttonStyles } from '../../../theme/UI/buttons'
import { globalStyles } from '../../../theme/appTheme'

interface InventoryBagInterface {
    onClose: () => void
}

export const InventoryBag = ({
    onClose
}: InventoryBagInterface) => {


    const { bag, cleanBag, numberOfItems, removeProduct, postInventory, postInventoryDetails } = useContext(InventoryBagContext)
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
                    style={[buttonStyles.button, buttonStyles.white, globalStyles.globalMarginBottomSmall]}
                    onPress={handleCleanTemporal}
                >
                    <Text style={buttonStyles.buttonTextSecondary}>Limpiar carrito</Text>
                </TouchableOpacity>
            }

            <TouchableOpacity
                style={[buttonStyles.button, buttonStyles.black]}
                onPress={onPostInventary}
            >
                <Text style={buttonStyles.buttonText}>Crear Inventario</Text>
            </TouchableOpacity>
        </View>
    )
        :
        <LoadingScreen />
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