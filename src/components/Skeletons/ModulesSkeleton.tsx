import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { useTheme } from '../../context/ThemeContext';
import { OnboardingScreenStyles } from '../../theme/OnboardingScreenTheme';
import { globalStyles } from '../../theme/appTheme';
import { View } from 'react-native';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

export const ModulesSkeleton = () => {
    const { theme, typeTheme } = useTheme();
    const shimmerColors = [
        theme.background_color_tertiary,
        typeTheme === "light" ? "#eaeaea" : "#3a3a3a",
        theme.background_color_tertiary
    ];

    return (
        <View
            style={[
                {
                    flex: 0.2,
                    padding: globalStyles(theme).globalPadding.padding / 2,
                    flexDirection: 'row'
                }
            ]}>
            <ShimmerPlaceHolder
                shimmerColors={shimmerColors}
                LinearGradient={LinearGradient}
                style={[OnboardingScreenStyles(theme).moduleOption, { flex: 1, height: "100%", marginRight: 10, padding: 0 }]}
            //style={[ OnboardingScreenStyles(theme).moduleOption, { height: "20%", width: "100%", padding: 0, borderWidth: 0}]}
            ></ShimmerPlaceHolder>

            <ShimmerPlaceHolder
                shimmerColors={shimmerColors}
                LinearGradient={LinearGradient}
                style={[OnboardingScreenStyles(theme).moduleOption, { flex: 1, height: "100%", marginRight: 10, padding: 0 }]}
            //style={[ OnboardingScreenStyles(theme).moduleOption, { height: "20%", width: "100%", padding: 0, borderWidth: 0}]}
            ></ShimmerPlaceHolder>
        </View>

    )
}
