import React, { useCallback, useState, useEffect, useContext } from 'react';
import { getTotalPriceBag } from '../../../services/bag';
import { SellsBagContext } from '../../../context/Sells/SellsBagContext';
import { ProductSellsInterfaceBag } from '../../../interface/productSells';
import { ProductSellsCard } from '../../../components/Cards/ProductCard/ProductSellsCard';
import { LayoutBag } from '../../../components/Layouts/LayoutBag';
import useErrorHandler from '../../../hooks/useErrorHandler';
import ModalDecision from '../../../components/Modals/ModalDecision';
import ButtonCustum from '../../../components/Inputs/ButtonCustum';
import { globalStyles } from '../../../theme/appTheme';
import { useTheme } from '../../../context/ThemeContext';

export const SellsBagScreen = () => {

    const { theme, typeTheme } = useTheme();
    const { deleteProductSell } = useContext(SellsBagContext);
    const [bags, setBags] = useState<ProductSellsInterfaceBag[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const { handleError } = useErrorHandler();
    const [productIdToDelete, setProductIdToDelete] = useState<number | null>();
    const [openModalDecision, setOpenModalDecision] = useState(false);
    const [deletingProduct, setDeletingProduct] = useState(false);

    const confirmDelete = async () => {
        if(!productIdToDelete) return;
        setDeletingProduct(true)
        await deleteProductSell(productIdToDelete);
        await handleGetPrice();
        await setBags((prevBags) => prevBags.filter(bag => bag.idenlacemob !== productIdToDelete));

        setTimeout(() => {
            setProductIdToDelete(null);
            setOpenModalDecision(false);
            setDeletingProduct(false)
        }, 100);
    };

    const cancelProduct = () => {
        setOpenModalDecision(false);
        setProductIdToDelete(null);
    }

    const handleDeleteProduct = async (productId: number) => {
        setProductIdToDelete(productId);
        setOpenModalDecision(true);
    };

    const handleGetPrice = async () => {

        try {
            const totalpriceData = await getTotalPriceBag({ opcion: 2 });

            if (totalpriceData.error) {
                handleError(totalpriceData.error);
                return;
            };

            if (!totalpriceData) {
                setTotalPrice(parseFloat("0"));
            } else {
                setTotalPrice(parseFloat(totalpriceData));
            }

        } catch (error: any) {
            handleError(error);
        };

    };

    const renderItem = useCallback(({ item }: { item: ProductSellsInterfaceBag }) => (
        <ProductSellsCard
            product={item}
            onDelete={() => handleDeleteProduct(item.idenlacemob)}
            deletingProduct={productIdToDelete === item.idenlacemob}
            showDelete
        />
    ), [handleDeleteProduct]);

    useEffect(() => {
        handleGetPrice();
    }, [handleDeleteProduct]);

    return (
        <>
            <LayoutBag
                opcion={2}
                renderItem={renderItem}
                setBags={setBags}
                bags={bags}
                totalPrice={totalPrice}
                deletingProductId={productIdToDelete}
                Type='Sells'
            />

            <ModalDecision
                visible={openModalDecision}
                message="¿Seguro de eliminar este producto?"
                >
                <ButtonCustum
                    title="Eliminar"
                    onPress={confirmDelete}
                    disabled={deletingProduct}
                    buttonColor="red"
                    iconName="trash"
                    extraStyles={{ ...globalStyles(theme).globalMarginBottomSmall }}

                />
                <ButtonCustum
                    title="Cancelar"
                    onPress={cancelProduct}
                    disabled={deletingProduct}
                    buttonColor="white"
                />
            </ModalDecision>

        </>
    );
};
