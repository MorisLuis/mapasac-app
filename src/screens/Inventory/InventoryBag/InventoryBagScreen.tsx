import React, { useCallback, useState, useEffect, useRef, useContext } from 'react';
import { FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { ProductInventoryCard } from '../../../components/Cards/ProductInventoryCard';
import { buttonStyles } from '../../../theme/UI/buttons';
import { globalFont, globalStyles } from '../../../theme/appTheme';
import { EmptyMessageCard } from '../../../components/Cards/EmptyMessageCard';
import ModalDecision from '../../../components/Modals/ModalDecision';
import { useNavigation } from '@react-navigation/native';
import { ProductInterfaceBag } from '../../../interface/product';
import { inputStyles } from '../../../theme/UI/inputs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../../context/ThemeContext';
import { InventoryBagScreenStyles } from '../../../theme/InventoryBagScreenTheme';
import { deleteAllProductsInBagInventory, getBagInventory } from '../../../services/bag';
import { InventoryBagContext } from '../../../context/Inventory/InventoryBagContext';
import { getSearchProductInBack } from '../../../services/searchs';
import { InventoryBagSkeleton } from '../../../components/Skeletons/InventoryBagSkeleton';

export const InventoryBagScreen = () => {
    const { navigate, goBack } = useNavigation<any>();
    const { theme, typeTheme } = useTheme();
    const { deleteProduct } = useContext(InventoryBagContext);

    const [openModalDecision, setOpenModalDecision] = useState(false);
    const [searchText, setSearchText] = useState<string>('');
    const inputRef = useRef<TextInput>(null);


    const [bags, setBags] = useState<ProductInterfaceBag[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [dataUploaded, setDataUploaded] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [hasMore, setHasMore] = useState(true);


    const onPostInventary = async () => {
        goBack();
        navigate("confirmationScreen");
    };

    const loadBags = async () => {
        if (isLoading || !hasMore) return;
        setIsLoading(true);
        const newBags = await getBagInventory({ page, limit: 5 });

        if (newBags && newBags.length > 0) {
            setBags((prevBags: ProductInterfaceBag[]) => [...prevBags, ...newBags]);
            setPage(page + 1);
        } else {
            setHasMore(false);
        }

        setIsLoading(false);
        setDataUploaded(true)
    };

    const refreshBags = async () => {
        setIsRefreshing(true);
        setPage(1);
        const newBags = await getBagInventory({ page: 1, limit: 5 });
        setBags(newBags || []);
        setHasMore(true);
        setIsRefreshing(false);
    };

    const handleCleanTemporal = () => {
        setOpenModalDecision(false);
        deleteAllProductsInBagInventory(0);
        setPage(1);
    };

    const handleDeleteProduct = async (productId: number) => {
        await deleteProduct(productId);
        setBags((prevBags: ProductInterfaceBag[]) => prevBags.filter(bag => bag.idenlacemob !== productId));
    };

    const handleSearch = async (text: string) => {
        setSearchText(text);
        if (text === '') {
            setPage(1);
            loadBags();
        } else {
            const products = await getSearchProductInBack({ searchTerm: text, opcion: 0 });
            setBags(products || []);
            setPage(1);
        }
    };

    const renderItem = useCallback(({ item }: { item: ProductInterfaceBag }) => (
        <ProductInventoryCard
            product={item}
            onDelete={() => handleDeleteProduct(item.idenlacemob as number)}
            showDelete
        />
    ), [handleDeleteProduct]);

    useEffect(() => {
        loadBags();
    }, []);

    return (
        <>
            <SafeAreaView style={InventoryBagScreenStyles(theme, typeTheme).InventoryBagScreen}>

                {/* SEARCH BAR */}
                {
                    (bags?.length > 0 && dataUploaded) &&
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
                                onChangeText={handleSearch}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                }

                {/* PRODUCTS */}
                {
                    (bags?.length <= 0 && dataUploaded) ?
                        <View style={InventoryBagScreenStyles(theme, typeTheme).message}>
                            <EmptyMessageCard
                                title="No hay productos con ese nombre."
                                message='Intenta escribiendo algo diferente.'
                                icon='sad-outline'
                            />
                        </View>
                        :
                        (bags.length > 0 && dataUploaded) ?
                            <FlatList
                                style={InventoryBagScreenStyles(theme, typeTheme).content}
                                data={bags}
                                renderItem={renderItem}
                                keyExtractor={product => `${product.idenlacemob}`}

                                onEndReached={loadBags}
                                onEndReachedThreshold={0.5}
                                refreshing={isRefreshing}
                                onRefresh={refreshBags}
                            />
                            :
                            <InventoryBagSkeleton />

                }

                {/* FOOTER */}
                {
                    (bags.length > 0 && dataUploaded) &&
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
    )
};
