import React from 'react'
import { FlatList, SafeAreaView, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { ConfirmationScreenStyles } from '../../../theme/ConfirmationScreenTheme';
import { ProductCardSkeleton } from '../ProductCardSkeleton';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { InventoryBagScreenStyles } from '../../../theme/InventoryBagScreenTheme';

export const ConfirmationSkeleton = () => {
    const { theme, typeTheme } = useTheme();

    const shimmerColors = [
        theme.background_color_tertiary,
        typeTheme === "light" ? "#eaeaea" : "#3a3a3a",
        theme.background_color_tertiary
    ]

    return (

        <SafeAreaView style={{ backgroundColor: theme.background_color }} >
            <View style={ConfirmationScreenStyles(theme, typeTheme).ConfirmationScreen}>
                <ShimmerPlaceholder
                    style={ConfirmationScreenStyles(theme).subtitleConfirmation}
                    shimmerColors={shimmerColors}
                    LinearGradient={LinearGradient}
                >
                </ShimmerPlaceholder>
                <ProductCardSkeleton />

                <ShimmerPlaceholder
                    style={ConfirmationScreenStyles(theme).subtitleConfirmation}
                    shimmerColors={shimmerColors}
                    LinearGradient={LinearGradient}
                >
                </ShimmerPlaceholder>

                <FlatList
                    data={Array(6).fill({})}
                    renderItem={() => <ProductCardSkeleton />}
                    style={InventoryBagScreenStyles(theme, typeTheme).content}
                    keyExtractor={(_, index) => index.toString()}
                />
            </View>
        </SafeAreaView>
    )
}
