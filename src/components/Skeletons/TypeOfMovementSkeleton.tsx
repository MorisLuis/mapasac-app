import React from 'react'
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { globalStyles } from '../../theme/appTheme';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

export const TypeOfMovementSkeleton = () => {
    const shimmerColors = ["#f0f0f0", "#eaeaea", "#f0f0f0"]

    return (
        <View
            style={{
                width: "100%"
            }}
        >
            <ShimmerPlaceHolder
                style={{
                    height: 40,
                    width: "100%",
                    borderRadius: 5,
                    marginBottom: globalStyles.globalMarginBottom.marginBottom,
                }}
                shimmerColors={shimmerColors}
                LinearGradient={LinearGradient}
            >
            </ShimmerPlaceHolder>
        </View>
    )
}
