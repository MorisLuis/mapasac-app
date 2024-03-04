import React, { useContext, useState } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext'
import PorductInterface from '../../interface/product'
import { ProductInventoryCard } from '../../components/Cards/ProductInventoryCard'
import { buttonStyles } from '../../theme/UI/buttons'
import { globalStyles } from '../../theme/appTheme'
import { LoadingScreen } from '../LoadingScreen'
import { useNavigation } from '@react-navigation/native'

export const InventoryBagScreen = () => {


    const { bag, cleanBag, numberOfItems, removeProduct, postInventory, postInventoryDetails } = useContext(InventoryBagContext)
    const [createInventaryLoading, setCreateInventaryLoading] = useState(false)
    const { navigate } = useNavigation<any>();

    const handleCleanTemporal = () => {
        cleanBag()
        //onClose()
    }

    const onDelete = (product: PorductInterface) => {
        removeProduct(product)
    }

    const onPostInventary = async () => {
        setCreateInventaryLoading(true)
        await postInventory();
        await postInventoryDetails(bag);
        cleanBag();
        //onClose();
        setCreateInventaryLoading(false)
    }

    return !createInventaryLoading ? (
        <View>
            <Button title="Siguiente" onPress={() => navigate('TypeMovement')} />

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
                numberOfItems > 0 ?
                    <>
                        <TouchableOpacity
                            style={[buttonStyles.button, buttonStyles.white, globalStyles.globalMarginBottomSmall]}
                            onPress={handleCleanTemporal}
                        >
                            <Text style={buttonStyles.buttonTextSecondary}>Limpiar carrito</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[buttonStyles.button, buttonStyles.black]}
                            onPress={onPostInventary}
                        >
                            <Text style={buttonStyles.buttonText}>Crear Inventario</Text>
                        </TouchableOpacity>
                    </>
                    :
                    <View>
                        <Text>Agrega productos al inventario</Text>
                    </View>
            }


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