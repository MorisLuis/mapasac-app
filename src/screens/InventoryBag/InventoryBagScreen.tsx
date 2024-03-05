import React, { useContext, useState } from 'react'
import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext'
import PorductInterface from '../../interface/product'
import { ProductInventoryCard } from '../../components/Cards/ProductInventoryCard'
import { buttonStyles } from '../../theme/UI/buttons'
import { colores, globalStyles } from '../../theme/appTheme'
import { LoadingScreen } from '../LoadingScreen'
import { InventoryFooter } from './InventoryFooter'

export const InventoryBagScreen = () => {


    const { bag, cleanBag, numberOfItems, removeProduct, postInventory, postInventoryDetails } = useContext(InventoryBagContext)
    const [createInventaryLoading, setCreateInventaryLoading] = useState(false)

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
        <SafeAreaView style={styles.InventoryBagScreen}>
            <View style={styles.content}>
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
            <InventoryFooter buttonBackAvailable={false}/>
        </SafeAreaView>
    )
        :
        <LoadingScreen />
}


const styles = StyleSheet.create({
    InventoryBagScreen: {
        backgroundColor: colores.background_color,
        height: "100%",
        //backgroundColor:"red",
    },
    
    content:{
        padding: globalStyles.globalPadding.padding,
        minHeight: "auto",
        height: "90%"
    }
});