import React from 'react'
import { SafeAreaView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { globalStyles } from '../../theme/appTheme';
import { useTheme } from '../../context/ThemeContext';
import { ProductInventoryCardSkeleton } from './ProductInventoryCardSkeleton';
import { ConfirmationScreenStyles } from '../../theme/ConfirmationScreenTheme';

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
            <SafeAreaView style={{ backgroundColor: theme.background_color, flex: 1 }} >

            </SafeAreaView>
            {/* 
        <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationSells}>
            <View style={[
                ConfirmationScreenStyles(theme, typeTheme).confirmationInfo,
                {
                    borderBottomWidth: 0,
                    marginBottom: 0,
                    paddingVertical: 0,
                    paddingTop: globalStyles(theme).globalPadding.padding,
                }]}
            >

                <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationItems}>
                    <ShimmerPlaceHolder
                        shimmerColors={shimmerColors}
                        LinearGradient={LinearGradient}
                        style={[ConfirmationScreenStyles(theme, typeTheme).confirmationItems_number, { height: 70, marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom / 2 }]}
                    ></ShimmerPlaceHolder>

                    <ShimmerPlaceHolder
                        shimmerColors={shimmerColors}
                        LinearGradient={LinearGradient}
                        style={[ConfirmationScreenStyles(theme, typeTheme).confirmationText, { marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom / 2 }]}>
                    </ShimmerPlaceHolder>
                    <ShimmerPlaceHolder
                        shimmerColors={shimmerColors}
                        LinearGradient={LinearGradient}
                        style={ConfirmationScreenStyles(theme, typeTheme).confirmationText}>
                    </ShimmerPlaceHolder>
                </View>
            </View>

            <ShimmerPlaceHolder
                shimmerColors={shimmerColors}
                LinearGradient={LinearGradient}
                style={[ConfirmationScreenStyles(theme).confirmationInfo, { width: "auto", height: 40, marginBottom: 0, borderBottomWidth: 0 }]}
            ></ShimmerPlaceHolder>

            <ShimmerPlaceHolder
                shimmerColors={shimmerColors}
                LinearGradient={LinearGradient}
                style={[ConfirmationScreenStyles(theme, typeTheme).confirmationProductsContent, { marginBottom: 10 }]}>
            </ShimmerPlaceHolder>

            <View
                style={{
                    //paddingHorizontal: globalStyles(theme).globalPadding.padding
                }}
            >
                {Array.from({ length: 10 }).map((_, index) => (
                    <ProductInventoryCardSkeleton key={index} />
                ))}
            </View>
        </View>
        */}
        </>
    )
}
