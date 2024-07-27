import React from 'react'
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { globalStyles } from '../../theme/appTheme';
import { useTheme } from '../../context/ThemeContext';
import { ProductInventoryCardSkeleton } from './ProductInventoryCardSkeleton';
import { ConfirmationScreenStyles } from '../../theme/ConfirmationScreenTheme';
import { Text } from 'react-native';
import { Icon } from 'react-native-vector-icons/Icon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

export const ConfirmationSkeleton = () => {
    const { theme, typeTheme } = useTheme();

    const shimmerColors = [
        theme.background_color_tertiary,
        typeTheme === "light" ? "#eaeaea" : "#3a3a3a",
        theme.background_color_tertiary
    ]

    return (
        <>
            <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationHeader}>
                <View style={{ position: 'relative', marginBottom: 15 }}>
                    <ShimmerPlaceHolder
                        shimmerColors={shimmerColors}
                        LinearGradient={LinearGradient}
                        style={{ position: 'relative', width: 50, height: 50 }}
                    ></ShimmerPlaceHolder>
                </View>

                <ShimmerPlaceHolder
                    shimmerColors={shimmerColors}
                    LinearGradient={LinearGradient}
                    style={{ position: 'relative', marginBottom: 15 }}
                ></ShimmerPlaceHolder>

                <ShimmerPlaceHolder
                    shimmerColors={shimmerColors}
                    LinearGradient={LinearGradient}
                    style={ConfirmationScreenStyles(theme, typeTheme).confirmationHeaderTitle}
                ></ShimmerPlaceHolder>
            </View>

            <ShimmerPlaceHolder
                shimmerColors={shimmerColors}
                LinearGradient={LinearGradient}
                style={[ConfirmationScreenStyles(theme).confirmationInfo, { width: "auto", height: 40, padding: 0, borderWidth: 0 }]}
            ></ShimmerPlaceHolder>

            <ShimmerPlaceHolder
                shimmerColors={shimmerColors}
                LinearGradient={LinearGradient}
                style={[ConfirmationScreenStyles(theme, typeTheme).confirmationProductsContent, { marginBottom: 10 }]}>
            </ShimmerPlaceHolder>

            <View
                style={{
                    paddingHorizontal: globalStyles(theme).globalPadding.padding
                }}
            >
                {Array.from({ length: 10 }).map((_, index) => (
                    <ProductInventoryCardSkeleton key={index} />
                ))}
            </View>
        </>
    )
}
