import React from 'react'
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { globalStyles } from '../../theme/appTheme';
import { useTheme } from '../../context/ThemeContext';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

export const TypeOfMovementSkeleton = () => {
    const { theme, typeTheme } = useTheme();

    const shimmerColors = [
        theme.background_color_tertiary, 
        typeTheme === "light" ? "#eaeaea" : "#3a3a3a", 
        theme.background_color_tertiary
    ]

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
                    marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,
                }}
                shimmerColors={shimmerColors}
                LinearGradient={LinearGradient}
            >
            </ShimmerPlaceHolder>
        </View>
    )
}
