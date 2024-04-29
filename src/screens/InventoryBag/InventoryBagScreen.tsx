import React, { useContext, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext'
import { ProductInventoryCard } from '../../components/Cards/ProductInventoryCard'
import { buttonStyles } from '../../theme/UI/buttons'
import { colores, globalStyles } from '../../theme/appTheme'
import { LoadingScreen } from '../LoadingScreen'
import { EmptyMessageCard } from '../../components/Cards/EmptyMessageCard'
import ModalDecision from '../../components/Modals/ModalDecision'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { SettingsContext } from '../../context/settings/SettingsContext'
import PorductInterface from '../../interface/product'

export const InventoryBagScreen = () => {

    const { bag, cleanBag, numberOfItems, removeProduct, postInventory, postInventoryDetails } = useContext(InventoryBagContext)
    const { handleCameraAvailable } = useContext(SettingsContext);
    const { navigate } = useNavigation<any>();

    const [createInventaryLoading, setCreateInventaryLoading] = useState(false)
    const [openModalDecision, setOpenModalDecision] = useState(false)


    const handleCleanTemporal = () => {
        setOpenModalDecision(false)
        cleanBag()
    }

    const onPostInventary = async () => {
        setCreateInventaryLoading(true);
        await postInventory();
        await postInventoryDetails(bag);
        cleanBag();
        setOpenModalDecision(false);
        setCreateInventaryLoading(false);
        navigate('Scanner');
        navigate('SuccesMessage');
    }

    const closeModalHandler = React.useCallback(() => {
        handleCameraAvailable(true)
    }, []);


    // Renders
    const renderItem = ({ item }: { item: PorductInterface }) => {
        return (
            <ProductInventoryCard
                product={item}
                onDelete={() => removeProduct(item)}
                showDelete
            />
        )
    };

    // Este efecto se ejecutará cuando la pantalla reciba el foco
    useFocusEffect(
        React.useCallback(() => {
            return () => {
                closeModalHandler();
            };
        }, [])
    );

    return !createInventaryLoading ? (
        <>
            <SafeAreaView style={styles.InventoryBagScreen}>

                {/* PRODUCTS */}
                {
                    bag.length > 0 &&
                    <FlatList
                        style={styles.content}
                        data={bag}
                        renderItem={renderItem}
                        keyExtractor={product => `${product.Codigo}-${product.Id_Marca}-${product.Marca}-${product.Id_Almacen}`}
                        onEndReachedThreshold={0}
                    />
                }

                {/* FOOTER */}
                {
                    numberOfItems > 0 ?
                        <View style={styles.footer}>
                            <TouchableOpacity
                                style={[buttonStyles.button, buttonStyles.white, globalStyles.globalMarginBottomSmall]}
                                onPress={() => setOpenModalDecision(true)}
                            >
                                <Text style={buttonStyles.buttonTextSecondary}>Limpiar carrito</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[buttonStyles.button, buttonStyles.black]}
                                onPress={onPostInventary}
                            >
                                <Text style={buttonStyles.buttonText}>Crear Inventario</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.message}>
                            <EmptyMessageCard
                                title="No tienes productos en inventario"
                                message='Agrega productos al inventario'
                                icon='albums-outline'
                            />
                        </View>
                }
            </SafeAreaView>


            <ModalDecision
                visible={openModalDecision}
                message="Seguro de limpiar el inventario actual?"
            >
                <TouchableOpacity
                    style={[buttonStyles.button, buttonStyles.red, globalStyles.globalMarginBottomSmall]}
                    onPress={handleCleanTemporal}
                >
                    <Text style={buttonStyles.buttonTextRed}>Limpiar carrito</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[buttonStyles.button, buttonStyles.white]}
                    onPress={() => setOpenModalDecision(false)}
                >
                    <Text style={buttonStyles.buttonTextSecondary}>Cancelar</Text>
                </TouchableOpacity>
            </ModalDecision>
        </>
    )
        :
        <LoadingScreen />
}


const styles = StyleSheet.create({
    InventoryBagScreen: {
        backgroundColor: colores.background_color,
        height: "100%",
    },

    content: {
        minHeight: "auto",
        height: "85%",
        padding: globalStyles.globalPadding.padding,
        marginBottom: "37.5%"
    },
    message: {
        padding: globalStyles.globalPadding.padding
    },
    footer: {
        backgroundColor: colores.background_color_tertiary,
        padding: globalStyles.globalPadding.padding,
        height: "25%",
        width: "100%",
        position: "absolute",
        bottom: 0,
        display: "flex",
        borderTopWidth: 1,
        borderColor: colores.color_border
    }
});