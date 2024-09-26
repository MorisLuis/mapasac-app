import React from 'react';
import { styles } from '../../../theme/UI/cardsStyles';
import { useTheme } from '../../../context/ThemeContext';
import { quantityFormat } from '../../../utils/quantityFormat';
import { ProductSellsInterface } from '../../../interface/productSells';
import { format } from '../../../utils/currency';
import CustomText from '../../Ui/CustumText';
import { LayoutProductCard, ProductCardInterface, ProductInfo } from './ProductCardLayout';


export const ProductSellsCard = ({
    product,
    showDelete,
    onDelete,
    onClick,
    deletingProduct,
    renderRightProp
}: ProductCardInterface<ProductSellsInterface>) => {

    const { theme } = useTheme();


    // This is renderRight default
    const renderRight = () => {
        return (
            <>
                {product?.cantidad && (
                    <CustomText style={styles(theme).quantity_value}>
                        {quantityFormat(product.cantidad)}
                    </CustomText>
                )}
                <CustomText style={styles(theme).quantity_unity}>{product.unidad_nombre?.trim()}</CustomText>
            </>
        )
    };

    return (
        <LayoutProductCard
            product={product}
            showDelete={showDelete}
            onDelete={onDelete}
            onClick={onClick}
            deletingProduct={deletingProduct}
            renderRight={renderRightProp ? renderRightProp : renderRight}
        >
            <>
                <ProductInfo label="Precio" value={`${format(parseFloat(product.precio as string))} / ${quantityFormat(product.cantidad ?? 0)}`} />
                <ProductInfo label="Importe" value={format(parseFloat(product.precio as string) * (product.cantidad ? product.cantidad : 0))} />

                {product?.capa?.trim() && <ProductInfo label="Capa" value={product.capa.trim()} />}
                {product?.clase?.trim() && <ProductInfo label="Clase" value={product.clase.trim()} />}
            </>
        </LayoutProductCard>
    );
};