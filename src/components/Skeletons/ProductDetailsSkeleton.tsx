import React from 'react'
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { colores, globalFont, globalStyles } from '../../theme/appTheme';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

export const ProductDetailsSkeleton = () => {
    const shimmerColors = ["#f0f0f0", "#eaeaea", "#f0f0f0"]

    return (
        <View style={styles.ProductDetailsPage}>
            <ShimmerPlaceHolder
                style={styles.imageContainer}
                shimmerColors={shimmerColors}
                LinearGradient={LinearGradient}
            >
            </ShimmerPlaceHolder>

            <View style={styles.header}>
                <ShimmerPlaceHolder
                    style={styles.description}
                    shimmerColors={shimmerColors}
                    LinearGradient={LinearGradient}
                >
                </ShimmerPlaceHolder>
                <View>
                    <ShimmerPlaceHolder
                        style={styles.price}
                        shimmerColors={shimmerColors}
                        LinearGradient={LinearGradient}
                    >
                    </ShimmerPlaceHolder>
                    <ShimmerPlaceHolder
                        style={styles.priceSecond}
                        shimmerColors={shimmerColors}
                        LinearGradient={LinearGradient}
                    >
                    </ShimmerPlaceHolder>
                </View>
            </View>

            <ShimmerPlaceHolder
                        style={styles.information}
                        shimmerColors={shimmerColors}
                        LinearGradient={LinearGradient}
                    >
                    </ShimmerPlaceHolder>
        </View>
    )


}

export const styles = StyleSheet.create({
    ProductDetailsPage: {
        padding: globalStyles.globalPadding.padding,
        height: "100%",
        backgroundColor: colores.background_color
    },
    imageContainer: {
        minHeight: 300,
        width: "100%",
        backgroundColor: colores.background_color_tertiary,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: globalStyles.globalMarginBottom.marginBottom
    },

    header: {
        marginBottom: globalStyles.globalMarginBottom.marginBottom,
    },
    description: {
        height: globalFont.font_med,
        fontWeight: "bold",
        marginBottom: 5
    },
    price: {
        marginBottom: 5,
        width: 50,
        height: 12
    },
    priceSecond: {
        width: 100
    },
    information: {
        borderRadius: 5,
        width: "100%",
        height: 200
    }
})