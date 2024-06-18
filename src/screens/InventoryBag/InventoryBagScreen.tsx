import React, { useCallback, useContext, useState, useEffect, useRef } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';
import { ProductInventoryCard } from '../../components/Cards/ProductInventoryCard';
import { buttonStyles } from '../../theme/UI/buttons';
import { colores, globalStyles } from '../../theme/appTheme';
import { LoadingScreen } from '../LoadingScreen';
import { EmptyMessageCard } from '../../components/Cards/EmptyMessageCard';
import ModalDecision from '../../components/Modals/ModalDecision';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { PorductInterfaceBag } from '../../interface/product';
import { inputStyles } from '../../theme/UI/inputs';
import Icon from 'react-native-vector-icons/Ionicons';

export const InventoryBagScreen = () => {
    const { bag, cleanBag, numberOfItems, removeProduct, postInventory, postInventoryDetails } = useContext(InventoryBagContext);
    const { handleCameraAvailable } = useContext(SettingsContext);
    const { navigate } = useNavigation<any>();

    const [createInventaryLoading, setCreateInventaryLoading] = useState(false);
    const [openModalDecision, setOpenModalDecision] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [filteredBag, setFilteredBag] = useState<PorductInterfaceBag[]>(bag);
    const inputRef = useRef<TextInput>(null);

    const handleCleanTemporal = () => {
        setOpenModalDecision(false);
        cleanBag();
    };

    const onPostInventary = async () => {
        setCreateInventaryLoading(true);
        await postInventory();
        await postInventoryDetails(bag);
        cleanBag();
        setOpenModalDecision(false);
        setCreateInventaryLoading(false);
        navigate('Scanner');
        navigate('succesMessageScreen');
    };

    const closeModalHandler = useCallback(() => {
        handleCameraAvailable(true);
    }, []);

    const renderItem = useCallback(({ item }: { item: PorductInterfaceBag }) => (
        <ProductInventoryCard
            product={item}
            onDelete={() => removeProduct(item)}
            showDelete
        />
    ), [removeProduct]);

    useFocusEffect(
        useCallback(() => {
            return () => {
                closeModalHandler();
            };
        }, [])
    );

    useEffect(() => {
        if (searchText === '') {
            setFilteredBag(bag);
        } else {
            setFilteredBag(bag.filter(product =>
                product.Descripcion.toLowerCase().includes(searchText.toLowerCase())
            ));
        }
    }, [searchText, bag]);

    return !createInventaryLoading ? (
        <>
            <SafeAreaView style={styles.InventoryBagScreen}>

                {/* SEARCH BAR */}
                {
                    bag.length > 0 &&
                    <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
                        <View style={[styles.searchBar, inputStyles.input]}>
                            <Icon name={'search'} color="gray" />
                            <TextInput
                                ref={inputRef}
                                style={{ width: "100%"}}
                                placeholder="Buscar producto..."
                                value={searchText}
                                onChangeText={setSearchText}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                }

                {/* PRODUCTS */}
                {
                    filteredBag.length > 0 &&
                    <FlatList
                        style={styles.content}
                        data={filteredBag}
                        renderItem={renderItem}
                        keyExtractor={product => `${product.Codigo}-${product.Id_Marca}-${product.Marca}-${product.Id_Almacen}-${product.key}`}
                        onEndReachedThreshold={0}
                    />
                }

                {
                    bag.length > 0 && filteredBag.length < 1 &&
                    <View style={styles.message}>
                        <EmptyMessageCard
                            title="No hay productos con ese nombre."
                            message='Intenta escribiendo algo diferente.'
                            icon='sad-outline'
                        />
                    </View>
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
    ) : (
        <LoadingScreen />
    );
};

const styles = StyleSheet.create({

    InventoryBagScreen: {
        backgroundColor: colores.background_color,
        height: "100%",
    },
    searchBar: {
        marginHorizontal: globalStyles.globalPadding.padding,
        marginTop: globalStyles.globalMarginBottomSmall.marginBottom,
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        alignItems: 'center'
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
        maxHeight: 150,
        width: "100%",
        position: "absolute",
        bottom: 0,
        display: "flex",
        borderTopWidth: 1,
        borderColor: colores.color_border
    }
});
