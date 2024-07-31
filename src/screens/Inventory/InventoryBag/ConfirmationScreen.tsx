import React, { useCallback, useContext, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, FlatList, Button } from 'react-native';
import { InventoryBagContext } from '../../../context/Inventory/InventoryBagContext';
import { ProductInventoryConfirmationCard } from '../../../components/Cards/ProductInventoryConfirmationCard';
import { buttonStyles } from '../../../theme/UI/buttons';
import { ConfirmationScreenStyles } from '../../../theme/ConfirmationScreenTheme';
import { useTheme } from '../../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../../context/auth/AuthContext';
import DotLoader from '../../../components/Ui/DotLaoder';
import ProductInterface, { ProductInterfaceBag } from '../../../interface/product';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getBagInventory } from '../../../services/bag';
import { postInventory } from '../../../services/inventory';
import { ConfirmationSkeleton } from '../../../components/Skeletons/ConfirmationSkeleton';
import Toast from 'react-native-toast-message';

export const ConfirmationScreen = () => {
    const { getTypeOfMovementsName } = useContext(AuthContext);
    const { numberOfItems, resetAfterPost } = useContext(InventoryBagContext);
    const { typeTheme, theme, toggleTheme } = useTheme();
    const { navigate } = useNavigation<any>();

    const iconColor = theme.color_primary;
    const [createInventaryLoading, setCreateInventaryLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [bags, setBags] = useState<ProductInterfaceBag[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [dataUploaded, setDataUploaded] = useState(false)

    const renderItem = useCallback(({ item }: { item: ProductInterface }) => (
        <ProductInventoryConfirmationCard
            product={item}
            onClick={() => {
                navigate('[Modal] - editProductInBag', { product: item })
            }}
            disabled={createInventaryLoading}
        />
    ), [createInventaryLoading]);

    const onPostInventory = async () => {
        setCreateInventaryLoading(true);
        try {
            const data = await postInventory();
            resetAfterPost();
            setTimeout(() => {
                setCreateInventaryLoading(false);
                navigate('succesMessageScreen');
            }, 500);
        } catch (error: any) {
            Toast.show({
                type: 'tomatoError',
                text1: 'Hubo un error, asegurate de tener conexión a internet.'
            })
            setCreateInventaryLoading(false);
            console.log("Error al crear inventario:", error);
        }
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
    };

    useFocusEffect(
        useCallback(() => {
            const refreshBags = async () => {
                setIsLoading(true);
                const refreshedBags = await getBagInventory({ page: 1, limit: 5 });
                setBags(refreshedBags);
                setPage(2);
                setIsLoading(false);
                setHasMore(true);
                setDataUploaded(true)
            };

            refreshBags();
        }, [])
    );

    return (
        <SafeAreaView style={ConfirmationScreenStyles(theme, typeTheme).ConfirmationScreen}>
            <View style={{ flex: 1, marginBottom: hp("12.5%") }}>
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
                                    <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationHeader}>
                                        <View style={{ position: 'relative', marginBottom: 15 }}>
                                            <Icon name={typeTheme === 'light' ? "document-text-outline" : "document-text"} size={50} color={iconColor} />
                                            <View style={{ position: "absolute", right: 0, bottom: -8 }}>
                                                <Icon name="checkmark-circle" size={22} color={"green"} />
                                            </View>
                                        </View>
                                        <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationHeaderTitle}>Confirmación de {getTypeOfMovementsName()}</Text>
                                    </View>
                                    <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationInfo}>
                                        <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationText}>Productos afectados {numberOfItems}</Text>
                                        <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationText}>Tipo de movimiento: {getTypeOfMovementsName()}</Text>
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
                    disabled={createInventaryLoading}
                >
                    <Text style={buttonStyles(theme, typeTheme).buttonText}>
                        {createInventaryLoading ? <DotLoader /> : "Confirmar"}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
