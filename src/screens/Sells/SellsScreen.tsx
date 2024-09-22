import React, { useCallback } from 'react';
import { ProductSellsSquareCard } from '../../components/Cards/ProductSellsSquareCard';
import { ProductSellsInterface } from '../../interface/productSells';
import { LayoutSell } from '../../components/Layouts/LayoutSell';

export const SellsScreen = () => {

    const renderItem = useCallback(({ item }: { item: ProductSellsInterface }) => (
        <ProductSellsSquareCard product={item} />
    ), []);

        return (
            <LayoutSell
                renderItem={renderItem}
                opcion={2}
            />
        )
};