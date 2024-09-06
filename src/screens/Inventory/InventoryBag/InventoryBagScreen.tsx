import React, { useCallback, useState, useEffect, useRef, useContext } from 'react';
import { Alert, FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
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
import { deleteAllProductsInBag, getBagInventory } from '../../../services/bag';
import { InventoryBagContext } from '../../../context/Inventory/InventoryBagContext';
import { getSearchProductInBack } from '../../../services/searchs';
import { InventoryBagSkeleton } from '../../../components/Skeletons/InventoryBagSkeleton';
import DotLoader from '../../../components/Ui/DotLaoder';
import Toast from 'react-native-toast-message';
import { Searchbar } from 'react-native-paper';

export const InventoryBagScreen = () => {
    const { navigate, goBack } = useNavigation<any>();
    const { theme, typeTheme } = useTheme();
    const { deleteProduct, resetAfterPost } = useContext(InventoryBagContext);
    const iconColor = typeTheme === 'light' ? theme.text_color : theme.text_color_secondary

    const [openModalDecision, setOpenModalDecision] = useState(false);
    const [searchText, setSearchText] = useState<string>('');
    //const inputRef = useRef<TextInput>(null);
    const searchInputRef = useRef<any>(null);


    const [bags, setBags] = useState<ProductInterfaceBag[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [dataUploaded, setDataUploaded] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [loadingCleanBag, setLoadingCleanBag] = useState(false)


    const onPostInventary = async () => {
        goBack();
        navigate("confirmationScreen");
    };

    const loadBags = async () => {
        if (searchText !== "") return;
        if (isLoading || !hasMore) return;
        setIsLoading(true);
        const newBags = await getBagInventory({ page, limit: 5, option: 0 });

        if (newBags && newBags.length > 0) {
            setBags((prevBags: ProductInterfaceBag[]) => [...prevBags, ...newBags]);
            setPage(page + 1);
        } else {
            setHasMore(false);
        }

        setIsLoading(false);
        setDataUploaded(true)
    };

    /* const refreshBags = async () => {
        setIsRefreshing(true);
        setPage(1);
        const newBags = await getBagInventory({ page: 1, limit: 5, option: 0 });
        setBags(newBags || []);
        setHasMore(true);
        setIsRefreshing(false);
    }; */

    const handleCleanTemporal = async () => {
        setLoadingCleanBag(true)
        await deleteAllProductsInBag({ opcion: 0 });
        await resetAfterPost()

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
            await deleteProduct(productId);
            await setBags((prevBags: ProductInterfaceBag[]) => prevBags.filter(bag => bag.idenlacemob !== productId));
        }

        Alert.alert(
            'Seguro de eliminar este producto?',
            '',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Eliminar', onPress: confirmDelete }
            ]
        );
    };

    const handleSearch = async (text: string) => {
        setSearchText(text);
        const products = await getSearchProductInBack({ searchTerm: text, opcion: 0 });
        setBags(products || []);
        setPage(1);
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
                            {
                                searchText !== "" ?
                                    <EmptyMessageCard
                                        title="No hay productos con ese nombre."
                                        message='Intenta escribiendo algo diferente.'
                                        icon='sad-outline'
                                    />
                                    :
                                    <EmptyMessageCard
                                        title="No tienes productos aún."
                                        message='Empieza a agregar productos al inventario'
                                        icon='rocket-outline'
                                    />
                            }
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
                            />
                            :
                            <InventoryBagSkeleton length={10} />

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
                            style={[buttonStyles(theme).button, buttonStyles(theme, typeTheme).black]}
                            onPress={onPostInventary}
                        >
                            <Icon name='bookmark-outline' color={iconColor} size={globalFont.font_normal} />
                            <Text style={buttonStyles(theme, typeTheme).buttonText}>Guardar</Text>
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
