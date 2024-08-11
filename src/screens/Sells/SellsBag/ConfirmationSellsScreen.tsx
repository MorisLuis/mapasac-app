import React, { useCallback, useContext, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { buttonStyles } from '../../../theme/UI/buttons';
import { ConfirmationScreenStyles } from '../../../theme/ConfirmationScreenTheme';
import { useTheme } from '../../../context/ThemeContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import DotLoader from '../../../components/Ui/DotLaoder';
import { getBagInventory, getTotalPriceBag } from '../../../services/bag';
import { ConfirmationSkeleton } from '../../../components/Skeletons/ConfirmationSkeleton';
import Toast from 'react-native-toast-message';
import { SellsBagContext } from '../../../context/Sells/SellsBagContext';
import { ProductSellsInterface, ProductSellsInterfaceBag } from '../../../interface/productSells';
import { ProductSellsConfirmationCard } from '../../../components/Cards/ProductSellsConfirmationCard';
import { postSells } from '../../../services/sells';
import { format } from '../../../utils/currency';
import { useProtectPage } from '../../../hooks/useProtectPage';

export const ConfirmationSellsScreen = () => {
    const { numberOfItemsSells, resetAfterPost } = useContext(SellsBagContext);
    const { typeTheme, theme } = useTheme();
    const { navigate } = useNavigation<any>();

    const [createSellLoading, setCreateSellLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [bags, setBags] = useState<ProductSellsInterfaceBag[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [dataUploaded, setDataUploaded] = useState(false);
    const [totalPrice, setTotalPrice] = useState<number>()

    const renderItem = useCallback(({ item }: { item: ProductSellsInterface }) => (
        <ProductSellsConfirmationCard
            product={item}
            onClick={() => navigate('[Modal] - editProductSellInBag', { product: item })}
            disabled={createSellLoading}
        />
    ), [createSellLoading]);

    const onPostInventory = async () => {
        setCreateSellLoading(true);
        try {
            await postSells();
            setTimeout(() => {
                navigate('[Sells] - succesMessageScreen');
                resetAfterPost();
            }, 500);

            setTimeout(() => {
                setCreateSellLoading(false);
            }, 750);
        } catch (error: any) {
            Toast.show({
                type: 'tomatoError',
                text1: 'Hubo un error, asegurate de tener conexión a internet.'
            })
            setCreateSellLoading(false);
            console.log("Error al crear inventario:", error);
        }
    };


    const loadBags = async () => {
        if (isLoading || !hasMore) return;
        setIsLoading(true);
        const newBags = await getBagInventory({ page, limit: 5, option: 2, mercado: true });

        if (newBags && newBags.length > 0) {
            setBags((prevBags: ProductSellsInterfaceBag[]) => [...prevBags, ...newBags]);
            setPage(page + 1);
        } else {
            setHasMore(false);
        }

        setIsLoading(false);
    };

    useFocusEffect(
        useCallback(() => {
            const refreshBags = async () => {
                setIsLoading(true);
                const refreshedBags = await getBagInventory({ page: 1, limit: 5, option: 2, mercado: true });
                setBags(refreshedBags);
                setPage(2);
                setIsLoading(false);
                setHasMore(true);
                setDataUploaded(true)
            };

            const handleGetPrice = async () => {
                const totalprice: string = await getTotalPriceBag({ opcion: 2, mercado: true });
                setTotalPrice(parseInt(totalprice))
            }

            handleGetPrice()
            refreshBags();
        }, [])
    );

    const { protectThisPage } = useProtectPage({
        numberOfItems: numberOfItemsSells,
        loading: createSellLoading,
        navigatePage: 'SellsScreen'
    });

    return !protectThisPage ? (
        <SafeAreaView style={ConfirmationScreenStyles(theme, typeTheme).ConfirmationScreen}>
            <View>
                {
                    dataUploaded ?
                        <FlatList
                            data={bags}
                            renderItem={renderItem}
                            keyExtractor={product => `${product.idenlacemob}`}
                            onEndReached={loadBags}
                            onEndReachedThreshold={0.5}
                            ListHeaderComponent={
                                <>
                                    <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationInfo}>
                                        <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationItems}>
                                            <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationItems_number}>{numberOfItemsSells}</Text>
                                            <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationText}>Productos afectados.</Text>
                                        </View>
                                        <View
                                            style={ConfirmationScreenStyles(theme, typeTheme).confirmationMovement}>
                                            <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationText}>Tipo de movimiento:</Text>
                                            <Text style={[ConfirmationScreenStyles(theme, typeTheme).confirmationText, { color: typeTheme === "light" ? theme.color_red : theme.color_tertiary }]}>Venta</Text>
                                        </View>
                                        <View
                                            style={ConfirmationScreenStyles(theme, typeTheme).confirmationMovement}>
                                            <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationText}>Total:</Text>
                                            <Text style={[ConfirmationScreenStyles(theme, typeTheme).confirmationText, { color: typeTheme === "light" ? theme.color_red : theme.color_tertiary }]}>{format(totalPrice as number)}</Text>
                                        </View>
                                    </View>
                                    <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationProductsContent}>
                                        <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationProductsContentHeader}>Productos</Text>
                                    </View>
                                </>
                            }
                        />
                        :
                        <ConfirmationSkeleton />
                }
            </View>
            <View style={ConfirmationScreenStyles(theme, typeTheme).footer}>
                <TouchableOpacity
                    style={[buttonStyles(theme).button, buttonStyles(theme).black]}
                    onPress={onPostInventory}
                    disabled={createSellLoading}
                >
                    <Text style={buttonStyles(theme, typeTheme).buttonText}>
                        {createSellLoading ? <DotLoader /> : "Confirmar"}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
        :
        <SafeAreaView style={ConfirmationScreenStyles(theme, typeTheme).ConfirmationScreen}>
            <View>
                <Text>Redireccionando...</Text>
            </View>
        </SafeAreaView>

};