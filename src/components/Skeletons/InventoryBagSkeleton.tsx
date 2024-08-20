import React from 'react'
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { ProductDetailsSkeletonStyles } from '../../theme/UI/skeletons';
import { useTheme } from '../../context/ThemeContext';
import { styles } from '../../theme/UI/cardsStyles';
import { InventoryBagScreenStyles } from '../../theme/InventoryBagScreenTheme';
import { globalStyles } from '../../theme/appTheme';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

export const InventoryBagSkeleton = ({ length } : { length: number}) => {
    const { theme, typeTheme } = useTheme();
    const shimmerColors = [
        theme.background_color_tertiary,
        typeTheme === "light" ? "#eaeaea" : "#3a3a3a",
        theme.background_color_tertiary
    ]

    return (
        <>
            <ShimmerPlaceHolder
                shimmerColors={shimmerColors}
                LinearGradient={LinearGradient}
                style={[InventoryBagScreenStyles(theme, typeTheme).searchBar, { width: "auto", height: 45, borderRadius: globalStyles(theme).borderRadius.borderRadius }]}
            ></ShimmerPlaceHolder>

            <View style={ProductDetailsSkeletonStyles(theme).ProductDetailsPage}>
                {
                    Array.from({ length: length }).map((_, index) => (
                        <View key={index} style={{ marginBottom: 20 }}>
                            <View>
                                <View style={styles(theme).information}>
                                    <ShimmerPlaceHolder
                                        style={[styles(theme).description, { width: "95%" }]}
                                        shimmerColors={shimmerColors}
                                        LinearGradient={LinearGradient}
                                    />
                                    <ShimmerPlaceHolder
                                        style={styles(theme).description}
                                        shimmerColors={shimmerColors}
                                        LinearGradient={LinearGradient}
                                    />
                                    <ShimmerPlaceHolder
                                        style={[styles(theme).description, { width: "35%" }]}
                                        shimmerColors={shimmerColors}
                                        LinearGradient={LinearGradient}
                                    />
                                </View>
                            </View>
                        </View>
                    ))
                }
            </View>

        </>
    )




}
