import React, { useCallback, useState, useEffect, useRef, useContext } from 'react';
import { ActivityIndicator, Alert, FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
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
    const { deleteProductSell, numberOfItemsSells, resetAfterPost } = useContext(SellsBagContext);

    const iconColor = typeTheme === 'light' ? theme.text_color : theme.text_color_secondary

    const [openModalDecision, setOpenModalDecision] = useState(false);
    const [searchText, setSearchText] = useState<string>('');

    const [bags, setBags] = useState<ProductSellsInterfaceBag[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [dataUploaded, setDataUploaded] = useState(false)
    const [hasMore, setHasMore] = useState(true);
    const [loadingCleanBag, setLoadingCleanBag] = useState(false)
    const [totalPrice, setTotalPrice] = useState<number>()
    const searchInputRef = useRef<any>(null);

    const onPostInventary = async () => {
        goBack();
        navigate("[Sells] - confirmationScreen");
    };

    const loadBags = useCallback(async () => {
        if (searchText !== "" || isLoading || !hasMore) return;
        setIsLoading(true);
        try {
            const newBags = await getBagInventory({ page, limit: 5, option: 2, mercado: true });
            if (newBags && newBags.length > 0) {
                setBags(prevBags => [...prevBags, ...newBags]);
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
    }, [searchText, isLoading, hasMore, page]);

    const handleCleanTemporal = () => {
        setLoadingCleanBag(true)
        deleteAllProductsInBag({ opcion: 2, mercado: true });
        resetAfterPost()
        setPage(1);
        setLoadingCleanBag(false);
        goBack();
        setOpenModalDecision(false);
        Toast.show({
            type: 'tomatoToast',
            text1: 'Se limpio el inventario!'
        })
    };

    const handleDeleteProduct = async (productId: number) => {
        const confirmDelete = async () => {
            await deleteProductSell(productId);
            setBags((prevBags: ProductSellsInterfaceBag[]) => prevBags.filter(bag => bag.idenlacemob !== productId));
        }

        Alert.alert(
            'Seguro de eliminar este producto?',
            '',
            [
                { text: 'Cancelar', style: 'cancel' }, { text: 'Eliminar', onPress: confirmDelete }
            ]
        );
    };

    const handleSearch = async (text: string) => {
        setSearchText(text);
        const products = await getSearchProductInBack({ searchTerm: text, opcion: 2, mercado: true });
            setBags(products || []);
            setPage(1);
    };

    const handleGetPrice = async () => {
        const totalprice: string = await getTotalPriceBag({ opcion: 2, mercado: true });
        setTotalPrice(parseInt(totalprice))
    }

    const renderItem = useCallback(({ item }: { item: ProductSellsInterfaceBag }) => (
        <ProductSellsCard
            product={item}
            onDelete={() => handleDeleteProduct(item.idenlacemob as number)}
            showDelete
        />
    ), [handleDeleteProduct]);

    const renderFooter = useCallback(() => (
        (bags?.length <= 0 && dataUploaded) ? <ActivityIndicator size="large" color={theme.color_primary} /> : null
    ), [isLoading, theme.color_primary]);


    useEffect(() => {
        loadBags();
        handleGetPrice()
    }, [handleDeleteProduct]);

    return (
        <>
            <SafeAreaView style={InventoryBagScreenStyles(theme, typeTheme).InventoryBagScreen}>

                {/* SEARCH BAR */}
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
                                ListFooterComponent={renderFooter}
                                onEndReached={loadBags}
                                onEndReachedThreshold={0.5}
                            />
                            :
                            <InventoryBagSkeleton />
                }

                {/* FOOTER */}
                {
                    (bags.length > 0 && dataUploaded) &&
                    <View style={InventoryBagScreenStyles(theme, typeTheme).footer}>
                        <View style={InventoryBagScreenStyles(theme, typeTheme).footer_price}>
                            <Text style={InventoryBagScreenStyles(theme, typeTheme).priceText}>Total:</Text>
                            <Text style={[InventoryBagScreenStyles(theme, typeTheme).priceText, { color: typeTheme === "light" ? theme.color_red : theme.color_tertiary }]}>{format(totalPrice as number)}</Text>
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
    )
};

interface SearchBarInterface {
    searchText: string;
    onSearch: (text: string) => Promise<void>
}
