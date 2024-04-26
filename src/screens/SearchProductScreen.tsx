import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'

import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getSearchProductInStock } from '../services/Search/products';
import PorductInterface from '../interface/product';
import { ProductItemSearch } from '../components/Cards/ProductItemSearch';
import { colores, globalFont, globalStyles } from '../theme/appTheme';
import { CustomBackButton } from '../components/Ui/CustomHeader';
import ModalBottom from '../components/Modals/ModalBottom';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/auth/AuthContext';
import { ProductInventoryCardSkeleton } from '../components/Skeletons/ProductInventoryCardSkeleton';
import { SettingsContext } from '../context/settings/SettingsContext';



export const SearchProductScreen = ({ route }: any) => {

    const router = route.params;
    const { codeBar } = useContext(AuthContext);
    const { handleCameraAvailable, cameraAvailable } = useContext(SettingsContext);

    const navigation = useNavigation<any>();
    const [productsInInventory, setProductsInInventory] = useState<PorductInterface[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [openModalAdvice, setOpenModalAdvice] = useState(router?.modal ? true : false)

    const getSearchData = async (searchTerm: string) => {
        const products = await getSearchProductInStock(searchTerm ? searchTerm : "")
        setProductsInInventory(products);
    }

    const renderItem = ({ item }: { item: PorductInterface }) => {
        return (
            <ProductItemSearch fromModal={router?.modal ? router?.modal : false} product={item} onClick={() => handlePress(item)} />
        );
    };

    const loadMoreItem = () => {
        setCurrentPage(currentPage + 1);
    };

    const navigateToProduct = (selectedProduct: PorductInterface) => {
        navigation.goBack()
        navigation.navigate('InventoryDetails', { selectedProduct });
    };

    const handlePress = (item: PorductInterface) => {
        navigateToProduct(item)
    };

    const closeModalHandler = React.useCallback(() => {
        handleCameraAvailable(true)
    }, []);


    useEffect(() => {
        getSearchData("")
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLargeTitle: router?.modal ? false : true,
            headerTitle: "Productos",
            headerLeft: () => <CustomBackButton navigation={navigation} onClick={() => handleCameraAvailable(true)} />,
            headerSearchBarOptions: {
                placeholder: "Buscar producto por nombre...",
                placeholderTextColor: colores.color_blue,
                onChangeText: (event: any) => {
                    getSearchData(event.nativeEvent.text);
                },
            }
        });
    }, [navigation]);

    // Este efecto se ejecutará cuando la pantalla reciba el foco
    useFocusEffect(
        React.useCallback(() => {
            return () => {
                closeModalHandler(); // Ejecutar la función al cerrar el modal
            };
        }, [])
    );


    return (productsInInventory && productsInInventory.length > 0) ? (

        <>
            <SafeAreaView style={styles.SearchProductScreen}>
                <View style={styles.content}>
                    <FlatList
                        data={productsInInventory}
                        renderItem={renderItem}
                        keyExtractor={product => `${product.Codigo}-${product.Id_Marca}-${product.Marca}-${product.Id_Almacen}-${product.Id_ListaPrecios}`}
                        onEndReached={loadMoreItem}
                        onEndReachedThreshold={0}
                    />
                </View>
            </SafeAreaView>

            <ModalBottom
                visible={openModalAdvice}
                onClose={() => setOpenModalAdvice(false)}

                blurNotAvailable={true}
                blurType="dark"
                blurAmount={0}
            >
                <View style={styles.searchAdvice}>
                    <View style={styles.adviceHeader}>
                        <Icon name="bulb" size={18} color="red" />
                        <Text style={styles.titleHeader}>Asignar producto</Text>
                    </View>
                    <View style={styles.adviceMessage}>
                        <Text style={styles.adviceMessage1}>
                            Selecciona un producto al cual podrás asignarle el código de barras: <Text style={{ fontWeight: 'bold' }}>{codeBar}</Text>
                        </Text>

                        <Text style={styles.adviceMessage2}>Los productos con mensaje "No tiene codigo" son elegibles por que aun no tienen codigo de barras.</Text>
                    </View>
                </View>
            </ModalBottom>
        </>
    )
        :
        <SafeAreaView style={styles.SearchProductScreen}>
            <View style={styles.content}>
                {Array.from({ length: 10 }).map((_, index) => (
                    <ProductInventoryCardSkeleton key={index} />
                ))}
            </View>
        </SafeAreaView>
}


const styles = StyleSheet.create({
    SearchProductScreen: {
        backgroundColor: colores.background_color
    },
    content: {
        paddingHorizontal: globalStyles.globalPadding.padding,
        marginTop: globalStyles.globalPadding.padding,
    },
    searchAdvice: {

    },
    adviceHeader: {
        display: "flex",
        flexDirection: "row",
        gap: 8,
        marginBottom: globalStyles.globalMarginBottom.marginBottom
    },
    titleHeader: {
        fontSize: globalFont.font_sm,
        color: colores.color_red,
        fontWeight: "bold"
    },
    adviceMessage: {},
    adviceMessage1: {
        marginBottom: globalStyles.globalMarginBottom.marginBottom,
        fontSize: globalFont.font_normal
    },
    adviceMessage2: {
        marginBottom: globalStyles.globalMarginBottom.marginBottom,
        fontSize: globalFont.font_normal
    }
})
