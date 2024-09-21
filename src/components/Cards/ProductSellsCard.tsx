import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { styles } from '../../theme/UI/cardsStyles';
import { useTheme } from '../../context/ThemeContext';
import { quantityFormat } from '../../utils/quantityFormat';
import { ProductSellsInterface } from '../../interface/productSells';
import { format } from '../../utils/currency';
import { InventoryBagSkeleton } from '../Skeletons/InventoryBagSkeleton';
import CustomText from '../Ui/CustumText';

interface ProductSellsCardInterface {
    product: ProductSellsInterface;
    showDelete?: boolean;
    onDelete?: (product: ProductSellsInterface) => void;
    onClick?: () => void;
    deletingProduct?: boolean;
}

export const ProductSellsCard = ({
    product,
    showDelete,
    onDelete,
    onClick,
    deletingProduct
}: ProductSellsCardInterface) => {

    const { theme, typeTheme } = useTheme();

    return !deletingProduct ? (
        <TouchableOpacity style={styles(theme, typeTheme).productInventoryCard} onPress={onClick}>
            <View style={styles(theme).productInventoryCard__data}>
                <View style={styles(theme).information}>
                    <View>
                        <CustomText style={styles(theme).description}>{product.producto}</CustomText>
                    </View>

                    {
                        product?.capa?.trim() !== "" ?
                            <View style={styles(theme).dataItem}>
                                <CustomText style={styles(theme).label}>Clase:</CustomText>
                                <CustomText style={styles(theme).dataItemText}>{product?.capa}</CustomText>
                            </View>
                            :
                            <View style={styles(theme).dataItem}>
                                <CustomText style={styles(theme).label}>Clase:</CustomText>
                                <CustomText style={styles(theme).dataItemText}>{product?.clase}</CustomText>
                            </View>
                    }

                    <View style={styles(theme).dataItem}>
                        <CustomText style={styles(theme).label}>Precio:</CustomText>
                        <CustomText style={styles(theme).dataItemText}>{format(parseFloat(product?.precio as string))}</CustomText>
                    </View>

                    <View style={styles(theme).dataItem}>
                        <CustomText style={styles(theme).label}>Importe:</CustomText>
                        <CustomText style={styles(theme).dataItemText}>{format(parseFloat(product?.precio as string) * (product?.cantidad as number))}</CustomText>
                    </View>


                    {
                        showDelete && <CustomText style={styles(theme, typeTheme).delete} onPress={() => onDelete?.(product)}>Eliminar</CustomText>
                    }
                </View>

                <View style={styles(theme).quantity}>
                    {
                        product?.cantidad &&
                        <CustomText
                            style={styles(theme).quantity_value}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {quantityFormat(product?.cantidad)}
                        </CustomText>
                    }
                    <CustomText
                        style={styles(theme).quantity_unity}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {product.unidad_nombre?.trim()}
                    </CustomText>
                </View>
            </View>
        </TouchableOpacity>
    )
        :
        <View style={{ flex: 1 }}>
            <InventoryBagSkeleton length={1} />
        </View>

}
