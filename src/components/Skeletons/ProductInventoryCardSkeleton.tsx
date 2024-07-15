import React from 'react'
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../theme/appTheme';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

export const ProductInventoryCardSkeleton = () => {
    const { theme, typeTheme } = useTheme();
    const shimmerColors = [
        theme.background_color_tertiary, 
        typeTheme === "light" ? "#eaeaea" : "#3a3a3a", 
        theme.background_color_tertiary
    ]
    return (
        <View
            style={{
                width: "100%",
                flexDirection: "row",
            }}
        >
            <ShimmerPlaceHolder
                style={{
                    height: 70,
                    width: "100%",
                    borderRadius: 10,
                    marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,
                }}
                shimmerColors={shimmerColors}
                LinearGradient={LinearGradient}
            >
            </ShimmerPlaceHolder>
        </View>
    )


}
