import React, { useContext, useEffect, useRef, useState } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getSearchProductInStock } from '../../services/searchs';
import ProductInterface from '../../interface/product';
import { ProductItemSearch } from '../../components/Cards/ProductItemSearch';
import ModalBottom from '../../components/Modals/ModalBottom';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProductInventoryCardSkeleton } from '../../components/Skeletons/ProductInventoryCardSkeleton';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SearchProductScreenStyles } from '../../theme/SearchProductScreenTheme';
import { useTheme } from '../../context/ThemeContext';
import { Searchbar } from 'react-native-paper';
import useErrorHandler from '../../hooks/useErrorHandler';

type SearchProductScreenInterface = {
    route?: {
        params: {
            modal: boolean;
            isModal?: boolean,
        };
    };
};

export const SearchProductScreen = ({ route }: SearchProductScreenInterface) => {
    const { modal, isModal } = route?.params ?? {};
    const { codeBar } = useContext(SettingsContext);
    const { theme, typeTheme } = useTheme();
    const { handleError } = useErrorHandler()

    const navigation = useNavigation<any>();
    const [productsInInventory, setProductsInInventory] = useState<ProductInterface[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [openModalAdvice, setOpenModalAdvice] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true); // Estado de carga
    const iconColor = typeTheme === 'dark' ? "white" : "black"
    const searchInputRef = useRef<any>(null);

    const getSearchData = async (searchTerm: string) => {

        try {
            setLoading(true); // Activar estado de carga
            const products = await getSearchProductInStock({ searchTerm: searchTerm ? searchTerm : "" });
            if (products.error) {
                handleError(products.error);
                return;
            }
            setProductsInInventory(products);
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false);
        };

    };

    const renderItem = ({ item }: { item: ProductInterface }) => {
        return (
            <ProductItemSearch fromModal={modal ? modal : false} product={item} onClick={() => navigateToProduct(item)} />
        );
    };

    const loadMoreItem = () => {
        setCurrentPage(currentPage + 1);
    };

    const navigateToProduct = (selectedProduct: ProductInterface) => {
        if (modal) {
            if (isModal) {
                navigation?.goBack();
                navigation.navigate('[ProductDetailsPage] - inventoryDetailsScreen', { selectedProduct, fromUpdateCodebar: true });
            } else {
                navigation.navigate('[ProductDetailsPage] - inventoryDetailsScreen', { selectedProduct, fromUpdateCodebar: true });
            }
        } else {
            navigation.navigate('[ProductDetailsPage] - inventoryDetailsScreen', { selectedProduct });
        }
    };

    useEffect(() => {
        setOpenModalAdvice(modal ? true : false);
        getSearchData("");
    }, []);

    useEffect(() => {
        getSearchData(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);


    return (
        <SafeAreaView style={SearchProductScreenStyles(theme).SearchProductScreen}>
            <View style={SearchProductScreenStyles(theme).content}>
                <Searchbar
                    ref={searchInputRef}
                    placeholder="Buscar producto por nombre..."
                    onChangeText={query => setSearchQuery(query)}
                    value={searchQuery}
                    style={SearchProductScreenStyles(theme).searchbar}
                    iconColor={theme.text_color}
                    placeholderTextColor={theme.text_color}
                    icon={() => <Icon name="search-outline" size={20} color={iconColor} />}
                    clearIcon={() => searchQuery !== "" && <Icon name="close-circle" size={20} color={iconColor} />}
                />

                {loading ? (
                    // Mostrar el contenido de carga cuando se está cargando
                    <View>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <ProductInventoryCardSkeleton key={index} />
                        ))}
                    </View>
                ) : (
                    productsInInventory.length > 0 ? (
                        // Mostrar la lista de productos cuando hay resultados
                        <FlatList
                            data={productsInInventory}
                            renderItem={renderItem}
                            keyExtractor={product => `${product.idinvearts}`}
                            onEndReached={loadMoreItem}
                            onEndReachedThreshold={0}
                        />
                    ) : (
                        // Mostrar mensaje de sin resultados cuando no hay productos
                        <View>
                            <Text >
                                No se encontraron productos.
                            </Text>
                        </View>
                    )
                )}
            </View>

            <ModalBottom
                visible={openModalAdvice}
                onClose={() => setOpenModalAdvice(false)}
                blurNotAvailable={true}
                blurType="dark"
                blurAmount={0}
            >
                <View>
                    <View style={SearchProductScreenStyles(theme, typeTheme).adviceHeader}>
                        <Icon name="bulb" size={hp("3%")} color={typeTheme === 'light' ? "red" : "white"} />
                        <Text style={SearchProductScreenStyles(theme, typeTheme).titleHeader}>Asignar producto</Text>
                    </View>
                    <View style={SearchProductScreenStyles(theme, typeTheme).adviceMessage}>
                        <Text style={SearchProductScreenStyles(theme, typeTheme).adviceMessage1}>
                            Selecciona un producto al cual podrás asignarle el código de barras: <Text style={{ fontWeight: 'bold' }}>{codeBar}</Text>
                        </Text>

                        <Text style={SearchProductScreenStyles(theme, typeTheme).adviceMessage2}>Los productos con mensaje "No tiene codigo" son elegibles por que aun no tienen codigo de barras.</Text>
                    </View>
                </View>
            </ModalBottom>
        </SafeAreaView>
    );
};
