import React, { useCallback, useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import { getTotalPriceBag } from '../../../services/bag';
import { SellsBagContext } from '../../../context/Sells/SellsBagContext';
import { ProductSellsInterfaceBag } from '../../../interface/productSells';
import { ProductSellsCard } from '../../../components/Cards/ProductSellsCard';
import { LayoutBag } from '../../../components/Layouts/LayoutBag';
import useErrorHandler from '../../../hooks/useErrorHandler';

export const SellsBagScreen = () => {

    const { deleteProductSell } = useContext(SellsBagContext);
    const [bags, setBags] = useState<ProductSellsInterfaceBag[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [deletingProductId, setDeletingProductId] = useState<number | null>(null);
    const { handleError } = useErrorHandler();

    const handleDeleteProduct = async (productId: number) => {
        const confirmDelete = async () => {
            setDeletingProductId(productId);
            await deleteProductSell(productId);
            await handleGetPrice();
            await setBags((prevBags) => prevBags.filter(bag => bag.idenlacemob !== productId));

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

    const handleGetPrice = async () => {

        try {
            const totalpriceData = await getTotalPriceBag({ opcion: 2 });

            if (totalpriceData.error) {
                handleError(totalpriceData.error);
                return;
            };

            if(!totalpriceData) {
                setTotalPrice(parseFloat("0"));
            } else {
                setTotalPrice(parseFloat(totalpriceData));
            }
            
        } catch (error) {
            handleError(error)
        };

    };

    const renderItem = useCallback(({ item }: { item: ProductSellsInterfaceBag }) => (
        <ProductSellsCard
            product={item}
            onDelete={() => handleDeleteProduct(item.idenlacemob)}
            deletingProduct={deletingProductId === item.idenlacemob}
            showDelete
        />
    ), [handleDeleteProduct]);

    useEffect(() => {
        handleGetPrice();
    }, [handleDeleteProduct]);

    return (
        <LayoutBag
            opcion={2}
            renderItem={renderItem}
            setBags={setBags}
            bags={bags}
            totalPrice={totalPrice}
            deletingProductId={deletingProductId}
            Type='sells'
        />
    );
};
