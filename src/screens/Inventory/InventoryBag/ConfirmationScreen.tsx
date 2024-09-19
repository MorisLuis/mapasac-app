import React, { useCallback, useContext, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { InventoryBagContext } from '../../../context/Inventory/InventoryBagContext';
import { ProductInventoryConfirmationCard } from '../../../components/Cards/ProductInventoryConfirmationCard';
import { ConfirmationScreenStyles } from '../../../theme/ConfirmationScreenTheme';
import { useTheme } from '../../../context/ThemeContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../../context/auth/AuthContext';
import { ProductInterfaceBag } from '../../../interface/product';
import { getBagInventory } from '../../../services/bag';
import { postInventory } from '../../../services/inventory';
import Toast from 'react-native-toast-message';
import { useProtectPage } from '../../../hooks/useProtectPage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CombinedInventoryAndAppNavigationStackParamList } from '../../../navigator/AppNavigation';
import LayoutConfirmation from '../../../components/Layouts/LayoutConfirmation';

export const ConfirmationScreen = () => {
    const { getTypeOfMovementsName } = useContext(AuthContext);
    const { numberOfItems, resetAfterPost } = useContext(InventoryBagContext);
    const { typeTheme, theme } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<CombinedInventoryAndAppNavigationStackParamList>>();

    const [createInventaryLoading, setCreateInventaryLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [bags, setBags] = useState<ProductInterfaceBag[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [dataUploaded, setDataUploaded] = useState(false);

    const renderItem = useCallback(({ item }: { item: ProductInterfaceBag }) => (
        <ProductInventoryConfirmationCard
            product={item}
            onClick={() => navigation.navigate('[Modal] - editProductInBag', { product: item })}
            disabled={createInventaryLoading}
        />
    ), [createInventaryLoading]);

    const onPostInventory = async () => {
        setCreateInventaryLoading(true);
        try {
            await postInventory();
            resetAfterPost();
            setTimeout(() => {
                setCreateInventaryLoading(false);
                navigation.navigate('succesMessageScreen', { message: "Se ha generado con exito su inventario.", redirection: 'InventoryNavigation' });
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
        const newBags = await getBagInventory({ page, limit: 5, option: 0 });

        if (newBags && newBags.length > 0) {
            setBags((prevBags: ProductInterfaceBag[]) => [...prevBags, ...newBags]);
            setPage(page + 1);
        } else {
            setHasMore(false);
        }

        setIsLoading(false);
    };

    const refreshBags = async () => {
        setIsLoading(true);
        const refreshedBags = await getBagInventory({ page: 1, limit: 5, option: 0 });
        setBags(refreshedBags);
        setPage(2);
        setIsLoading(false);
        setHasMore(true);
        setDataUploaded(true)
    };

    useFocusEffect(
        useCallback(() => {
            refreshBags();
        }, [])
    );

    return (
        <LayoutConfirmation
            data={bags}
            renderItem={renderItem}
            loadBags={loadBags}
            Type="inventory"
            onPost={onPostInventory}
            loadData={dataUploaded}
            availableToPost={true}
            buttonPostDisabled={createInventaryLoading}
            numberOfItems={numberOfItems}
        />
    )
};