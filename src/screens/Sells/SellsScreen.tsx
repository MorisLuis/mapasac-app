import React, { useCallback, useContext } from 'react';
import { ProductSellsSquareCard } from '../../components/Cards/ProductSellsSquareCard';
import { ProductSellsInterface } from '../../interface/productSells';
import { LayoutSell } from '../../components/Layouts/LayoutSell';
import { SellsBagContext } from '../../context/Sells/SellsBagContext';
import { useFocusEffect } from '@react-navigation/native';

export const SellsScreen = () => {

    const { cleanFormData } = useContext(SellsBagContext);

    const renderItem = useCallback(({ item }: { item: ProductSellsInterface }) => (
        <ProductSellsSquareCard product={item} />
    ), []);

    useFocusEffect(
        useCallback(() => {
            cleanFormData()
        }, [])
    );

    return (
        <LayoutSell
            renderItem={renderItem}
            opcion={2}
        />
    )
};