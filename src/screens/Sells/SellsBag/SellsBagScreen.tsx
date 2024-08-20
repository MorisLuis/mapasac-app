import React, { useCallback, useState, useEffect, useRef, useContext } from 'react';
import { ActivityIndicator, Alert, FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { buttonStyles } from '../../../theme/UI/buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalFont, globalStyles } from '../../../theme/appTheme';
import { inputStyles } from '../../../theme/UI/inputs';
import { InventoryBagScreenStyles } from '../../../theme/InventoryBagScreenTheme';
import { EmptyMessageCard } from '../../../components/Cards/EmptyMessageCard';
import ModalDecision from '../../../components/Modals/ModalDecision';
import { InventoryBagSkeleton } from '../../../components/Skeletons/InventoryBagSkeleton';
import DotLoader from '../../../components/Ui/DotLaoder';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../context/ThemeContext';
import { deleteAllProductsInBag, getBagInventory, getTotalPriceBag } from '../../../services/bag';
import { getSearchProductInBack } from '../../../services/searchs';
import Toast from 'react-native-toast-message';
import { SellsBagContext } from '../../../context/Sells/SellsBagContext';
import { ProductSellsInterfaceBag } from '../../../interface/productSells';
import { ProductSellsCard } from '../../../components/Cards/ProductSellsCard';
import { format } from '../../../utils/currency';
import { Searchbar } from 'react-native-paper';

export const SellsBagScreen = () => {
    const { navigate, goBack } = useNavigation<any>();
    const { theme, typeTheme } = useTheme();
    const { deleteProductSell, resetAfterPost } = useContext(SellsBagContext);

    const [openModalDecision, setOpenModalDecision] = useState(false);
    const [searchText, setSearchText] = useState<string>('');
    const [bags, setBags] = useState<ProductSellsInterfaceBag[]>([]);
    const [filteredBags, setFilteredBags] = useState<ProductSellsInterfaceBag[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [dataUploaded, setDataUploaded] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [loadingCleanBag, setLoadingCleanBag] = useState(false);
    const [totalPrice, setTotalPrice] = useState<number>();
    const [deletingProductId, setDeletingProductId] = useState<number | null>(null);
    const searchInputRef = useRef<any>(null);

    const iconColor = typeTheme === 'light' ? theme.text_color : theme.text_color_secondary;

    const onPostInventary = async () => {
        goBack();
        navigate("[Sells] - confirmationScreen");
    };

    const loadBags = useCallback(async () => {
        if (isLoading || !hasMore) return;
        setIsLoading(true);
        try {
            const newBags = await getBagInventory({ page, limit: 5, option: 2, mercado: true });
            if (newBags && newBags.length > 0) {
                setBags(prevBags => [...prevBags, ...newBags]);
                setFilteredBags(prevBags => [...prevBags, ...newBags]);
                setPage(page + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
            setDataUploaded(true);
        }
    }, [isLoading, hasMore, page]);

    const handleCleanTemporal = () => {
        setLoadingCleanBag(true);
        deleteAllProductsInBag({ opcion: 2, mercado: true });
        resetAfterPost();
        setPage(1);

        setTimeout(() => {
            setLoadingCleanBag(false);
            goBack();
            setOpenModalDecision(false);
            Toast.show({
                type: 'tomatoToast',
                text1: 'Se limpió el inventario!'
            });
        }, 100);
    };

    const handleDeleteProduct = async (productId: number) => {
        const confirmDelete = async () => {
            setDeletingProductId(productId);
            await deleteProductSell(productId);
            await handleGetPrice();
            setBags((prevBags) => prevBags.filter(bag => bag.idenlacemob !== productId));
            setFilteredBags((prevFilteredBags) => prevFilteredBags.filter(bag => bag.idenlacemob !== productId));

            setTimeout(() => {
                setDeletingProductId(null);
            }, 500);
        };

        Alert.alert(
            '¿Seguro de eliminar este producto?',
            '',
            [
                { text: 'Cancelar', style: 'cancel' }, { text: 'Eliminar', onPress: confirmDelete }
            ]
        );
    };

    const handleSearch = async (text: string) => {
        setSearchText(text);
        if (text === '') {
            setFilteredBags(bags);
            return;
        }
        const products = await getSearchProductInBack({ searchTerm: text, opcion: 2, mercado: true });
        setFilteredBags(products || []);
        setPage(1);
    };

    const handleGetPrice = async () => {
        const totalprice: string = await getTotalPriceBag({ opcion: 2, mercado: true });
        setTotalPrice(parseInt(totalprice));
    };

    const renderItem = useCallback(({ item }: { item: ProductSellsInterfaceBag }) => (
        <ProductSellsCard
            product={item}
            onDelete={() => handleDeleteProduct(item.idenlacemob as number)}
            deletingProduct={deletingProductId === item.idenlacemob}
            showDelete
        />
    ), [handleDeleteProduct]);

    const renderFooter = useCallback(() => (
        (filteredBags?.length <= 0 && dataUploaded) ? <ActivityIndicator size="large" color={theme.color_primary} /> : null
    ), [isLoading, theme.color_primary]);

    useEffect(() => {
        loadBags();
        handleGetPrice();
    }, [handleDeleteProduct]);

    return (
        <>
            <SafeAreaView style={InventoryBagScreenStyles(theme, typeTheme).InventoryBagScreen}>

                {/* SEARCH BAR */}
                {
                    ((filteredBags.length > 0 && dataUploaded) || (filteredBags.length <= 0 && searchText.length > 0 && dataUploaded)) &&
                    <Searchbar
                        ref={searchInputRef}
                        placeholder="Buscar producto por nombre..."
                        onChangeText={query => handleSearch(query)}
                        value={searchText}
                        style={[InventoryBagScreenStyles(theme).searchBar, inputStyles(theme).input, { gap: 0 }]}
                        iconColor={theme.text_color}
                        placeholderTextColor={theme.text_color}
                        icon={() => <Icon name="search-outline" size={20} color={iconColor} />}
                        clearIcon={() => searchText !== "" && <Icon name="close-circle" size={20} color={iconColor} />}
                    />
                }

                {/* PRODUCTS */}
                {
                    (filteredBags?.length <= 0 && dataUploaded) ?
                        <View style={InventoryBagScreenStyles(theme, typeTheme).message}>
                            <EmptyMessageCard
                                title="No hay productos con ese nombre."
                                message='Intenta escribiendo algo diferente.'
                                icon='sad-outline'
                            />
                        </View>
                        :
                        (filteredBags.length > 0 && dataUploaded) ?
                            <FlatList
                                style={InventoryBagScreenStyles(theme, typeTheme).content}
                                data={filteredBags}
                                renderItem={renderItem}
                                keyExtractor={product => `${product.idenlacemob}`}
                                ListFooterComponent={renderFooter}
                                onEndReached={loadBags}
                                onEndReachedThreshold={0.5}
                            />
                            :
                            <InventoryBagSkeleton length={10} />
                }

                {/* FOOTER */}
                {
                    (filteredBags.length > 0 && dataUploaded) &&
                    <View style={InventoryBagScreenStyles(theme, typeTheme).footer}>
                        <View style={InventoryBagScreenStyles(theme, typeTheme).footer_price}>
                            <Text style={InventoryBagScreenStyles(theme, typeTheme).priceText}>Total:</Text>
                            <Text style={[InventoryBagScreenStyles(theme, typeTheme).priceText, { color: typeTheme === "light" ? theme.color_red : theme.color_tertiary }]}>
                                {
                                    deletingProductId ? "Calculando..." : format(totalPrice as number)
                                }
                            </Text>
                        </View>
                        <View style={InventoryBagScreenStyles(theme, typeTheme).footer_actions}>
                            <TouchableOpacity
                                style={[buttonStyles(theme).button, buttonStyles(theme).white, globalStyles(theme).globalMarginBottomSmall, { width: "19%" }]}
                                onPress={() => setOpenModalDecision(true)}
                            >
                                <Icon name='trash-outline' color={iconColor} size={globalFont.font_normal} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[buttonStyles(theme).button, buttonStyles(theme, typeTheme).black, { width: "79%" }]}
                                onPress={onPostInventary}
                            >
                                <Icon name='bookmark-outline' color={iconColor} size={globalFont.font_normal} />
                                <Text style={buttonStyles(theme, typeTheme).buttonText}>Guardar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </SafeAreaView>

            {/* LOADING INDICATOR */}
            {
                loadingCleanBag &&
                <View>
                    <DotLoader />
                </View>
            }

            {/* MODAL */}
            <ModalDecision
                visible={openModalDecision}
                message="Seguro de limpiar el inventario actual?"
            >
                <TouchableOpacity
                    style={[buttonStyles(theme).button, buttonStyles(theme).red, globalStyles(theme).globalMarginBottomSmall]}
                    onPress={handleCleanTemporal}
                    disabled={loadingCleanBag}
                >
                    <Text style={buttonStyles(theme, typeTheme).buttonText}>
                        {loadingCleanBag ? <DotLoader /> : "Limpiar carrito"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[buttonStyles(theme).button, buttonStyles(theme).white]}
                    onPress={() => setOpenModalDecision(false)}
                >
                    <Text style={buttonStyles(theme).buttonTextTertiary}>Cancelar</Text>
                </TouchableOpacity>
            </ModalDecision>
        </>
    );
};

interface SearchBarInterface {
    searchText: string;
    onSearch: (text: string) => Promise<void>
}


