import React, { useCallback, useContext, useState, useEffect, useRef } from 'react';
import { FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';
import { ProductInventoryCard } from '../../components/Cards/ProductInventoryCard';
import { buttonStyles } from '../../theme/UI/buttons';
import { globalFont, globalStyles } from '../../theme/appTheme';
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
    const { bag, cleanBag, numberOfItems, removeProduct } = useContext(InventoryBagContext);
    const { navigate, goBack } = useNavigation<any>();
    const { theme, typeTheme } = useTheme();

    const [createInventaryLoading, setCreateInventaryLoading] = useState(false);
    const [openModalDecision, setOpenModalDecision] = useState(false);
    const [searchText, setSearchText] = useState<string>('');
    const [filteredBag, setFilteredBag] = useState<PorductInterfaceBag[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);
    const inputRef = useRef<TextInput>(null);

    const onPostInventary = async () => {
        goBack();
        navigate("confirmationScreen");
    };

    const updateProductBySearch = useCallback(() => {
        const filteredData = bag.filter(product =>
            product.Descripcion.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredBag(filteredData.slice(0, page * pageSize));
    }, [searchText, bag, page, pageSize]);

    const handleLoadMore = () => {
        if (filteredBag.length >= numberOfItems) return;
        setPage(prevPage => prevPage + 1);
    };

    const handleCleanTemporal = () => {
        setOpenModalDecision(false);
        cleanBag();
        setPage(1);
        setFilteredBag([]);
    };

    const renderItem = useCallback(({ item }: { item: PorductInterfaceBag }) => (
        <ProductInventoryCard
            product={item}
            onDelete={() => removeProduct(item)}
            showDelete
        />
    ), [removeProduct]);

    useEffect(() => {
        updateProductBySearch();
    }, [searchText, page, updateProductBySearch]);


    return !createInventaryLoading ? (
        <>
            <SafeAreaView style={InventoryBagScreenStyles(theme, typeTheme).InventoryBagScreen}>

                {/* SEARCH BAR */}
                {
                    bag.length > 0 &&
                    <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
                        <View style={[InventoryBagScreenStyles(theme, typeTheme).searchBar, inputStyles(theme).input]}>
                            <Icon name={'search'} color="gray" />
                            <TextInput
                                ref={inputRef}
                                placeholder="Buscar producto..."
                                placeholderTextColor="gray"
                                style={{
                                    fontSize: globalFont.font_normal,
                                    color: theme.text_color
                                }}

                                value={searchText}
                                selectionColor={theme.text_color}
                                onChangeText={(text: string) => {
                                    setSearchText(text);
                                    setPage(1);
                                }}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                }

                {/* PRODUCTS */}
                {
                    filteredBag.length > 0 ?
                        <FlatList
                            style={InventoryBagScreenStyles(theme, typeTheme).content}
                            data={filteredBag}
                            renderItem={renderItem}
                            keyExtractor={product => `${product.Codigo}-${product.Id_Marca}-${product.Marca}-${product.Id_Almacen}-${product.key}`}
                            onEndReached={handleLoadMore}
                            onEndReachedThreshold={0.5}
                        />
                        :
                        <View style={InventoryBagScreenStyles(theme, typeTheme).message}>
                            <EmptyMessageCard
                                title="No hay productos con ese nombre."
                                message='Intenta escribiendo algo diferente.'
                                icon='sad-outline'
                            />
                        </View>
                }

                {/* FOOTER */}
                {
                    numberOfItems > 0 &&
                    <View style={InventoryBagScreenStyles(theme, typeTheme).footer}>
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
                            <Text style={buttonStyles(theme).buttonText}>Guardar</Text>
                        </TouchableOpacity>
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
                    <Text style={buttonStyles(theme).buttonTextTertiary}>Cancelar</Text>
                </TouchableOpacity>
            </ModalDecision>
        </>
    ) : (
        <LoadingScreen message='Guardando...' />
    );
};
