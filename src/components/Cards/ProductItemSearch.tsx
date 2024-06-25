import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PorductInterface from '../../interface/product';
import { colores, globalFont, globalStyles } from '../../theme/appTheme';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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

    return (
        <TouchableOpacity style={styles.ProductItemSearch} onPress={onClick}>
            {/* {
                product?.imagen ?
                    <Image
                        style={styles.productInventoryCard__Image}
                        source={{
                            uri: product?.imagen[0]?.url
                        }}
                    />
                    :
                    <View style={styles.notImage}>
                        <Icon name={'camera'} size={hp("3%")} color="black" />
                        <Text style={styles.notImageText} numberOfLines={2}>{user?.Company || "Olei"}</Text>
                    </View>
            } */}
            <View style={styles.information}>
                <Text style={styles.description}>{product.Descripcion}</Text>
                <View style={styles.otherInformation}>
                    <Text style={styles.otherInformationText}>Codigo: {product.Codigo}</Text>
                    <Text style={styles.otherInformationText}>-</Text>
                    <Text style={styles.otherInformationText}>Marca: {product.Marca}</Text>
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
        paddingVertical: globalStyles.globalPadding.padding / 2,
        borderRadius: globalStyles.borderRadius.borderRadius,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    productInventoryCard__Image: {
        width: wp("17.5%"),
        minHeight:  wp("17.5%"),
        marginRight: globalStyles.globalMarginBottom.marginBottom,
        borderRadius: globalStyles.borderRadius.borderRadius
    },
    information: {
        alignItems: 'flex-start'
    },
    description: {
        fontWeight: "bold",
        fontSize: globalFont.font_normal
    },
    otherInformation: {
        display: "flex",
        flexDirection: "row",
        gap: 5
    },
    otherInformationText:{
        fontSize: globalFont.font_sm
    },
    codebarAvailable: {
        backgroundColor: colores.color_border_tertiary + '23',
        padding: globalStyles.globalPadding.padding / 5,
        paddingHorizontal: globalStyles.globalPadding.padding / 2,
        borderRadius: globalStyles.borderRadius.borderRadius,
        marginVertical: globalStyles.globalMarginBottomSmall.marginBottom
    },
    textAvailable: {
        color: colores.color_border_tertiary,
        fontSize: globalFont.font_normal
    },
    codebarNotAvailable: {
        backgroundColor: colores.color_red + '43',
        padding: globalStyles.globalPadding.padding / 3,
        paddingHorizontal: globalStyles.globalPadding.padding / 2,
        borderRadius: globalStyles.borderRadius.borderRadius,
        marginVertical: globalStyles.globalMarginBottomSmall.marginBottom / 2
    },
    textNotAvailable: {
        color: colores.color_red,
        fontSize: globalFont.font_normal
    },
    notImage: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: wp("17.5%"),
        minHeight:  wp("17.5%"),
        marginRight: globalStyles.globalMarginBottom.marginBottom,
        borderRadius: globalStyles.borderRadius.borderRadius,
        backgroundColor: colores.background_color_tertiary,
        borderWidth: 1,
        borderColor: colores.color_border
    },
    notImageText: {
        fontWeight: 'bold',
        fontSize: globalFont.font_normal / 2,
        textAlign: "center",
        lineHeight: 8,
        maxHeight: 40,
        overflow: 'hidden',
        paddingHorizontal: 2
    },
})
