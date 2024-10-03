import React, { useContext, useEffect, useRef, useState } from 'react'
import { InventoryBagScreenStyles } from '../../theme/InventoryBagScreenTheme';
import { useTheme } from '../../context/ThemeContext';
import { Searchbar } from 'react-native-paper';
import { getSearchProductInBack } from '../../services/searchs';
import Icon from 'react-native-vector-icons/Ionicons';
import { inputStyles } from '../../theme/UI/inputs';
import { FlatList, SafeAreaView, View } from 'react-native';
import { EmptyMessageCard } from '../Cards/EmptyMessageCard';
import { globalFont, globalStyles } from '../../theme/appTheme';
import { deleteAllProductsInBag, getBagInventory } from '../../services/bag';
import { useNavigation } from '@react-navigation/native';
import ModalDecision from '../Modals/ModalDecision';
import Toast from 'react-native-toast-message';
import { SellsBagContext } from '../../context/Sells/SellsBagContext';
import DotLoader from '../Ui/DotLaoder';
import { format } from '../../utils/currency';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useErrorHandler from '../../hooks/useErrorHandler';
import CustomText from '../Ui/CustumText';
import ButtonCustum from '../Inputs/ButtonCustum';
import FooterTwoButtonsScreen from '../Navigation/FooterTwoButtonsScreen';
import { ModuleInterface } from '../../interface/utils';
import useActionsForModules from '../../hooks/useActionsForModules';
import LayoutBagSkeleton from '../Skeletons/Screens/LayoutBagSkeleton';
import ProductInterface from '../../interface/product';
import { ProductSellsInterface, ProductSellsRestaurantInterface } from '../../interface/productSells';
import { CombinedSellsAndInventoryNavigationStackParamList } from '../../interface/navigation';
import { opcionBag } from '../../interface/bag';

export type CombinedProductInterface = ProductInterface | ProductSellsInterface | ProductSellsRestaurantInterface;

interface LayoutBagInterface {
    opcion: opcionBag;
    renderItem: ({ item }: { item: any }) => React.JSX.Element;
    bags: CombinedProductInterface[];
    setBags:
        React.Dispatch<React.SetStateAction<ProductInterface[]>> |
        React.Dispatch<React.SetStateAction<ProductSellsInterface[]>> |
        React.Dispatch<React.SetStateAction<ProductSellsRestaurantInterface[]>>;
    Type: ModuleInterface['module']

    // Sells
    totalPrice?: number;
    deletingProductId?: number | null;
}

export const LayoutBag = ({
    opcion,
    renderItem,
    bags,
    setBags,
    totalPrice,
    deletingProductId,
    Type
}: LayoutBagInterface) => {

    const { theme, typeTheme } = useTheme();
    const { handleActionBag } =useActionsForModules()
    const { handleError } = useErrorHandler()
    const { handleColorWithModule } = useActionsForModules();
    const searchInputRef = useRef<any>(null);
    const { goBack } = useNavigation<NativeStackNavigationProp<CombinedSellsAndInventoryNavigationStackParamList>>();

    const [searchText, setSearchText] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [dataUploaded, setDataUploaded] = useState(false);
    const [openModalDecision, setOpenModalDecision] = useState(false);
    const [loadingCleanBag, setLoadingCleanBag] = useState(false);
    const [cleanSearchText, setCleanSearchText] = useState(false);
    const hideSearch = bags.length <= 0 && searchText.length <= 0;

    const onPost = async () => {
        goBack();
        handleActionBag.openConfirmation()
    };

    const handleCleanTemporal = async () => {

        try {
            setLoadingCleanBag(true);
            const product = await deleteAllProductsInBag({ opcion: opcion });

            if (product?.error) return handleError(product.error);

            handleActionBag.resetAfterPost()

            setTimeout(() => {
                setLoadingCleanBag(false);
                goBack();
                setOpenModalDecision(false);
                Toast.show({
                    type: 'tomatoToast',
                    text1: 'Se limpió el inventario!'
                });
            }, 100);
        } catch (error) {
            handleError(error);
        }
    };

    const handleSearch = async (text: string) => {

        try {
            setSearchText(text);

            // Clean Search.
            if (text === '') {
                setCleanSearchText(true)
                setBags([]);
                setPage(1);

                setTimeout(async () => {
                    const newBags = await getBagInventory({ page, limit: 5, option: opcion });

                    if (newBags.error) {
                        handleError(newBags.error);
                        return;
                    }

                    setBags(newBags);
                    setPage(page + 1);
                    setCleanSearchText(false);
                }, 300);

                return;
            }

            const products = await getSearchProductInBack({ searchTerm: text, opcion: opcion });
            if (products.error) return handleError(products.error);

            setBags(products || []);
        } catch (error) {
            handleError(error);
        } finally {
            setPage(1);
        }

    };

    const loadBags = async () => {
        if (searchText !== "") return;
        if (isLoading || !hasMore) return;
        try {
            setIsLoading(true);
            const newBags = await getBagInventory({ page, limit: 5, option: opcion });
            if (newBags.error) return handleError(newBags.error);

            if (newBags && newBags.length > 0) {
                setBags((prevBags: CombinedProductInterface[]) => [...prevBags, ...newBags]);
                setPage(page + 1);
            } else {
                setHasMore(false);
            };

        } catch (error) {
            handleError(error)
        } finally {
            setIsLoading(false);
            setDataUploaded(true)
        }
    };

    useEffect(() => {
        loadBags();
    }, []);

    // Primera condición: Si los bags están vacíos y los datos no se han cargado
    if ((bags.length <= 0 && !dataUploaded) || cleanSearchText) {
        return <LayoutBagSkeleton />
    }

    if (parseInt(handleActionBag.numberOfItems) <= 0) {
        return (
            <SafeAreaView style={{ backgroundColor: theme.background_color, flex: 1 }} >
                <View style={InventoryBagScreenStyles(theme, typeTheme).message}>
                    <EmptyMessageCard
                        title="No tienes productos aún."
                        message="Empieza a agregar productos al inventario"
                        icon="rocket-outline"
                    />
                </View>
            </SafeAreaView>
        )
    };

    if (loadingCleanBag) {
        return (
            <View>
                <DotLoader />
            </View>
        )
    };

    return (
        <>
            <SafeAreaView style={{ backgroundColor: theme.background_color }} >
                <View style={InventoryBagScreenStyles(theme, typeTheme).InventoryBagScreen}>

                    {/* Search Bar */}
                    <Searchbar
                        ref={searchInputRef}
                        placeholder="Buscar producto por nombre..."
                        onChangeText={query => handleSearch(query)}
                        value={searchText}
                        style={[
                            inputStyles(theme, typeTheme).searchBar,
                            { marginBottom: globalStyles(theme).globalMarginBottom.marginBottom },
                            hideSearch && { display: 'none' }
                        ]}
                        iconColor={theme.text_color}
                        placeholderTextColor={theme.text_color}
                        icon={() => <Icon name="search-outline" size={20} color={theme.text_color} />}
                        clearIcon={() => searchText !== "" && <Icon name="close-circle" size={20} color={theme.text_color} />}
                        inputStyle={{ fontSize: globalFont.font_normal, fontFamily: 'SourceSans3-Regular', color: theme.text_color }}
                    />


                    {
                        !(bags.length <= 0 && searchText.length > 0) ?
                            <FlatList
                                style={InventoryBagScreenStyles(theme, typeTheme).content}
                                data={bags}
                                renderItem={renderItem}
                                keyExtractor={product => `${product.idenlacemob}`}
                                onEndReached={loadBags}
                                onEndReachedThreshold={0.5}
                            />
                            :
                            <EmptyMessageCard
                                title="No hay productos con ese nombre."
                                message="Intenta escribiendo algo diferente."
                                icon="sad-outline"
                            />
                    }


                    {/* FOOTER */}
                    <FooterTwoButtonsScreen
                        visible={bags.length > 0 && dataUploaded}
                        visibleChildren={Type === 'Sells'}

                        buttonTitle="Guardar"
                        buttonDisabled={false}
                        buttonOnPress={onPost}

                        buttonSmallOnPress={() => setOpenModalDecision(true)}
                        buttonSmallDisable={false}
                        buttonSmallIcon="trash-outline"
                    >
                        {/* POSSIBLE AS PROP */}
                        <View style={InventoryBagScreenStyles(theme, typeTheme).footer_price}>
                            <CustomText style={InventoryBagScreenStyles(theme, typeTheme).priceLabel}>Total:</CustomText>
                            <CustomText style={[InventoryBagScreenStyles(theme, typeTheme).priceText, { color: handleColorWithModule.primary }]}>
                                {deletingProductId ? "Calculando..." : format(totalPrice || 0)}
                            </CustomText>
                        </View>
                    </FooterTwoButtonsScreen>
                </View>
            </SafeAreaView>

            {/* Modal */}
            <ModalDecision visible={openModalDecision} message="Seguro de limpiar el inventario actual?">
                <ButtonCustum
                    title="Limpiar carrito"
                    onPress={handleCleanTemporal}
                    disabled={loadingCleanBag}
                    iconName="close"
                    extraStyles={{ ...globalStyles(theme).globalMarginBottomSmall }}
                />
                <ButtonCustum
                    title="Cancelar"
                    onPress={() => setOpenModalDecision(false)}
                    disabled={loadingCleanBag}
                    buttonColor="white"
                />
            </ModalDecision>
        </>
    );

}
