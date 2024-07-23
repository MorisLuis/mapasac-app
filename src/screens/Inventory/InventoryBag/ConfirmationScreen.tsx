import React, { useCallback, useContext, useState, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { InventoryBagContext } from '../../../context/Inventory/InventoryBagContext';
import { ProductInventoryConfirmationCard } from '../../../components/Cards/ProductInventoryConfirmationCard';
import { buttonStyles } from '../../../theme/UI/buttons';
import { ConfirmationScreenStyles } from '../../../theme/ConfirmationScreenTheme';
import { useTheme } from '../../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../context/auth/AuthContext';
import DotLoader from '../../../components/Ui/DotLaoder';
import { ProductInterfaceBag } from '../../../interface/product';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getBagInventory } from '../../../services/bag';
import { postInventory } from '../../../services/inventory';

export const ConfirmationScreen = () => {

    const { getTypeOfMovementsName, user } = useContext(AuthContext);
    const {  numberOfItems } = useContext(InventoryBagContext);
    const { typeTheme, theme } = useTheme();
    const { navigate } = useNavigation<any>();

    const iconColor = theme.color_primary;
    const [createInventaryLoading, setCreateInventaryLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [bags, setBags] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const renderItem = useCallback(({ item }: { item: ProductInterfaceBag }) => (
        <ProductInventoryConfirmationCard product={item} onClick={() => navigate('[Modal] - editProductInBag', { product: item })} disabled={createInventaryLoading}/>
    ), [createInventaryLoading]);

    const onPostInventory = async () => {
        setCreateInventaryLoading(true);
        await postInventory();

        setTimeout(() => {
            setCreateInventaryLoading(false);
            navigate('succesMessageScreen');
        }, 500);
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

    return (
        <SafeAreaView style={ConfirmationScreenStyles(theme, typeTheme).ConfirmationScreen}>
            <View style={{ flex: 1, marginBottom: hp("12.5%") }}>
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
                                <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationText}>Sucursal: {user?.idsucursal}</Text>
                            </View>
                            <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationProductsContent}>
                                <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationProductsContentHeader}>Productos</Text>
                            </View>
                        </>
                    }
                />
            </View>
            <View style={ConfirmationScreenStyles(theme, typeTheme).footer}>
                <TouchableOpacity
                    style={[buttonStyles(theme).button, buttonStyles(theme).black]}
                    onPress={onPostInventory}
                    disabled={createInventaryLoading}
                >
                    <Text style={buttonStyles(theme).buttonText}>
                        {createInventaryLoading ? <DotLoader /> : "Confirmar"}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
