import React, { useCallback, useContext, useEffect } from 'react';
import { ProductSellsSquareCard } from '../../components/Cards/ProductSellsSquareCard';
import { ProductSellsInterface } from '../../interface/productSells';
import { LayoutSell } from '../../components/Layouts/LayoutSell';
import { SellsBagContext } from '../../context/Sells/SellsBagContext';
import { useFocusEffect } from '@react-navigation/native';

export const SellsScreen = () => {

    const { cleanFormData, formSellsData } = useContext(SellsBagContext);

    const renderItem = useCallback(({ item }: { item: ProductSellsInterface }) => (
        <ProductSellsSquareCard product={item} />
    ), []);

    useFocusEffect(
        useCallback(() => {
            console.log("updateFormData");
            cleanFormData()
            console.log({formSellsData})
        }, [])
    );

    return (
        <LayoutSell
            renderItem={renderItem}
            opcion={2}
        />
    )
};