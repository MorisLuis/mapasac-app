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
    const imageDefault = 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=2762&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

    return (
        <TouchableOpacity style={styles.productInventoryCard} onPress={onClick}>
            {
                product?.imagen ?
                    <Image
                        style={styles.productInventoryCard__Image}
                        source={{
                            uri: product?.imagen ? product?.imagen[0]?.url : imageDefault,
                        }}
                    />
                    :
                    <View style={styles.notImage}>
                        <Icon name={'camera'} size={20} color="black" /* style={styles.icon}  *//>
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

                    {/* <View style={styles.dataItem}>
                        <Text style={styles.label}>Almacen:</Text>
                        <Text>{product?.Id_Almacen}</Text>
                    </View> */}

                    {/* <View style={styles.dataItem}>
                        <Text>{product?.CodBar ? "" : "NO TIENE!!"}</Text>
                    </View> */}

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
