import React, { useContext } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../theme/UI/cardsStyles';
import PorductInterface from '../../interface/product.js';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../context/auth/AuthContext';

interface ProductInventoryCardInterface {
    product: PorductInterface;
    showDelete?: boolean;
    onDelete?: (product: PorductInterface) => void;
    onClick?: () => void
}

export const ProductInventoryCard = ({
    product,
    showDelete,
    onDelete,
    onClick
}: ProductInventoryCardInterface) => {

    const {  user } = useContext(AuthContext);

    return (
        <TouchableOpacity style={styles.productInventoryCard} onPress={onClick}>
            {
                product?.imagen ?
                    <Image
                        style={styles.productInventoryCard__Image}
                        source={{
                            uri: product?.imagen[0]?.url
                        }}
                    />
                    :
                    <View style={styles.notImage}>
                        <Icon name={'camera'} size={20} color="black"/>
                        <Text style={styles.notImageText} numberOfLines={2}>{user?.Company || "Olei"}</Text>
                    </View>
            }
            <View style={styles.productInventoryCard__data}>
                <View style={styles.information}>
                    <View>
                        <Text style={styles.description}>{product.Descripcion}</Text>
                    </View>

                    <View style={styles.dataItem}>
                        <Text style={styles.label}>Codigo:</Text>
                        <Text style={styles.dataItemText}>{product?.Codigo}</Text>
                    </View>

                    <View style={styles.dataItem}>
                        <Text style={styles.label}>Marca:</Text>
                        <Text style={styles.dataItemText}>{product?.Marca}</Text>
                    </View>

                    {
                        showDelete && <Text style={styles.delete} onPress={() => onDelete?.(product)}>Eliminar</Text>
                    }
                </View>

                <View style={styles.stock}>
                    <Text>{product.Piezas || product.Existencia}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
