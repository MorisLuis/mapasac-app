import React, { useCallback, useState, useContext } from 'react';
import { Alert } from 'react-native';
import { ProductInterfaceBag } from '../../../interface/product';
import { InventoryBagContext } from '../../../context/Inventory/InventoryBagContext';
import { LayoutBag } from '../../../components/Layouts/LayoutBag';
import { ProductInventoryCard } from '../../../components/Cards/ProductCard/ProductInventoryCard';

export const InventoryBagScreen = () => {

    const { deleteProduct } = useContext(InventoryBagContext);
    const [bags, setBags] = useState<ProductInterfaceBag[]>([]);

    const handleDeleteProduct = async (productId: number) => {
        const confirmDelete = async () => {
            await deleteProduct(productId);
            await setBags((prevBags: ProductInterfaceBag[]) => prevBags.filter(bag => bag.idenlacemob !== productId));
        }

        Alert.alert(
            'Seguro de eliminar este producto?',
            '',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Eliminar', onPress: confirmDelete }
            ]
        );
    };

    const renderItem = useCallback(({ item }: { item: ProductInterfaceBag }) => (
        <ProductInventoryCard
            product={item}
            onDelete={() => handleDeleteProduct(item.idenlacemob)}
            showDelete
        />
    ), [handleDeleteProduct]);

    return (
        <LayoutBag
            opcion={0}
            renderItem={renderItem}
            setBags={setBags}
            bags={bags}
            Type='inventory'
        />
    )
};
