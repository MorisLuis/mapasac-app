import React from 'react'
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

export const ProductInventoryCardSkeleton = () => {
    const shimmerColors = ["#f0f0f0", "#eaeaea", "#f0f0f0"]

    return (
        <View
            style={{
                width: "100%",
                flexDirection: "row",
                //alignItems: "center"
            }}
        >
            <ShimmerPlaceHolder
                style={{
                    height: 70,
                    width: "100%",
                    borderRadius: 10,
                    marginBottom: 20
                }}
                shimmerColors={shimmerColors}
                LinearGradient={LinearGradient}
            >
            </ShimmerPlaceHolder>
        </View>
    )
}
