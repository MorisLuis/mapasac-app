import React, { useCallback, useContext, useState, useEffect, useRef } from 'react';
import { Button, FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';
import { ProductInventoryCard } from '../../components/Cards/ProductInventoryCard';
import { buttonStyles } from '../../theme/UI/buttons';
import { globalStyles } from '../../theme/appTheme';
import { LoadingScreen } from '../LoadingScreen';
import { EmptyMessageCard } from '../../components/Cards/EmptyMessageCard';
import ModalDecision from '../../components/Modals/ModalDecision';
import { useNavigation } from '@react-navigation/native';
import { PorductInterfaceBag } from '../../interface/product';
import { inputStyles } from '../../theme/UI/inputs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';
import { InventoryBagScreenStyles } from '../../theme/InventoryBagScreenTheme';

export const InventoryBagScreen = () => {
    const { bag, cleanBag, numberOfItems, removeProduct, postInventory, postInventoryDetails } = useContext(InventoryBagContext);
    const { navigate } = useNavigation<any>();
    const { theme, toggleTheme, typeTheme } = useTheme();

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
        navigate('BottomNavigation - Scanner');
        navigate('succesMessageScreen');
    };

    const renderItem = useCallback(({ item }: { item: PorductInterfaceBag }) => (
        <ProductInventoryCard
            product={item}
            onDelete={() => removeProduct(item)}
            showDelete
        />
    ), [removeProduct]);

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
            <SafeAreaView style={InventoryBagScreenStyles(theme).InventoryBagScreen}>
                {/* SEARCH BAR */}
                {
                    bag.length > 0 &&
                    <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
                        <View style={[InventoryBagScreenStyles(theme).searchBar, inputStyles(theme).input]}>
                            <Icon name={'search'} color="gray" />
                            <TextInput
                                ref={inputRef}
                                //style={{ width: "100%", color: theme.text_color}}
                                placeholder="Buscar producto..."
                                placeholderTextColor="gray"

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
                        style={InventoryBagScreenStyles(theme).content}
                        data={filteredBag}
                        renderItem={renderItem}
                        keyExtractor={product => `${product.Codigo}-${product.Id_Marca}-${product.Marca}-${product.Id_Almacen}-${product.key}`}
                        onEndReachedThreshold={0}
                    />
                }

                {
                    bag.length > 0 && filteredBag.length < 1 &&
                    <View style={InventoryBagScreenStyles(theme).message}>
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
                        <View style={InventoryBagScreenStyles(theme).footer}>
                            <TouchableOpacity
                                style={[buttonStyles(theme).button, buttonStyles(theme).white, globalStyles(theme).globalMarginBottomSmall]}
                                onPress={() => setOpenModalDecision(true)}
                            >
                                <Text style={buttonStyles(theme, typeTheme).buttonTextTertiary}>Limpiar carrito</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[buttonStyles(theme).button, buttonStyles(theme).black]}
                                onPress={onPostInventary}
                            >
                                <Text style={buttonStyles(theme).buttonText}>Crear Inventario</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={InventoryBagScreenStyles(theme).message}>
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
                    style={[buttonStyles(theme).button, buttonStyles(theme).red, globalStyles(theme).globalMarginBottomSmall]}
                    onPress={handleCleanTemporal}
                >
                    <Text style={buttonStyles(theme).buttonTextRed}>Limpiar carrito</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[buttonStyles(theme).button, buttonStyles(theme).white]}
                    onPress={() => setOpenModalDecision(false)}
                >
                    <Text style={buttonStyles(theme).buttonTextSecondary}>Cancelar</Text>
                </TouchableOpacity>
            </ModalDecision>
        </>
    ) : (
        <LoadingScreen />
    );
};