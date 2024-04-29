import React, { useContext } from 'react';

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PorductInterface from '../../interface/product';
import { colores, globalStyles } from '../../theme/appTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../context/auth/AuthContext';

interface ProductItemSearchInterface {
    product: PorductInterface;
    showDelete?: boolean;
    onDelete?: (product: PorductInterface) => void;
    onClick?: () => void;
    fromModal?: boolean
}

export const ProductItemSearch = ({
    product,
    onClick,
    fromModal
}: ProductItemSearchInterface) => {

    const {  user } = useContext(AuthContext);

    return (
        <TouchableOpacity style={styles.ProductItemSearch} onPress={onClick}>
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
                        <Icon name={'camera'} size={20} color="black" /* style={styles.icon}  *//>
                        <Text style={styles.notImageText} numberOfLines={2}>{user?.Company || "Olei"}</Text>
                    </View>
            }
            <View style={styles.information}>
                <Text style={styles.description}>{product.Descripcion}</Text>
                <View style={styles.otherInformation}>
                    <Text>Codigo: {product.Codigo}</Text>
                    <Text>-</Text>
                    <Text>Marca: {product.Marca}</Text>
                </View>
                {
                    fromModal &&
                    <View style={[product.CodBar ? styles.codebarAvailable : styles.codebarNotAvailable]}>
                        <Text style={product.CodBar ? styles.textAvailable : styles.textNotAvailable}>
                            {product.CodBar ? "Tiene código" : "No tiene código"}
                        </Text>
                    </View>

                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    ProductItemSearch: {
        marginBottom: globalStyles.globalMarginBottomSmall.marginBottom,
        borderWidth: 0,
        paddingVertical: 10,
        borderRadius: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",

    },
    productInventoryCard__Image: {
        width: 60,
        minHeight: 60,
        marginRight: 10,
        borderRadius: 5
    },
    information: {
        alignItems: 'flex-start' 
    },
    description: {
        fontWeight: "bold"
    },
    otherInformation: {
        display: "flex",
        flexDirection: "row",
        gap: 5
    },
    codebarAvailable: {
        backgroundColor: colores.color_border_tertiary + '23',
        padding: 3,
        paddingHorizontal: 6,
        borderRadius: 10,
        marginVertical: 4
    },
    textAvailable: {
        color: colores.color_border_tertiary ,
    },
    codebarNotAvailable: {
        backgroundColor: colores.color_red + '43',
        padding: 3,
        paddingHorizontal: 6,
        borderRadius: 10,
        marginVertical: 4
    },
    textNotAvailable: {
        color: colores.color_red,
    },
    notImage: {
        //flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        minHeight: 60,
        marginRight: 10,
        borderRadius: 5,
        backgroundColor: colores.background_color_tertiary,
        borderWidth: 1,
        borderColor: colores.color_border
        /* minHeight: 80,
        marginRight: 10,
        borderRadius: 5 */
    },
    notImageText: {
        fontWeight: 'bold',
        fontSize: 8,
        textAlign: "center",
        lineHeight: 8, 
        maxHeight: 40,
        overflow: 'hidden',
        paddingHorizontal: 2
    },
})
