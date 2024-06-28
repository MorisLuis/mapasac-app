import React from 'react'

import { Text, View } from 'react-native'
import { globalFont, globalStyles } from '../../theme/appTheme';
import { useTheme } from '../../context/ThemeContext';


export const TermsOfUseScreen = () => {

    const { theme } = useTheme();

    return (
        <View style={{
            padding: globalStyles(theme).globalPadding.padding,
            backgroundColor: theme.background_color,
            height: '100%'
        }}>
            <Text style={{
                fontSize: globalFont.font_big,
                fontWeight: "bold",
                marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,
                color: theme.text_color
            }}>Terminos de uso</Text>
            <Text style={{ color: theme.text_color }}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias quo, cum rerum molestias blanditiis neque repellat dicta modi aut at totam quis quidem fugit animi, ratione nihil est. Nostrum, optio!
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias quo, cum rerum molestias blanditiis neque repellat dicta modi aut at totam quis quidem fugit animi, ratione nihil est. Nostrum, optio!
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias quo, cum rerum molestias blanditiis neque repellat dicta modi aut at totam quis quidem fugit animi, ratione nihil est. Nostrum, optio!
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias quo, cum rerum molestias blanditiis neque repellat dicta modi aut at totam quis quidem fugit animi, ratione nihil est. Nostrum, optio!
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias quo, cum rerum molestias blanditiis neque repellat dicta modi aut at totam quis quidem fugit animi, ratione nihil est. Nostrum, optio!
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias quo, cum rerum molestias blanditiis neque repellat dicta modi aut at totam quis quidem fugit animi, ratione nihil est. Nostrum, optio!
            </Text>
        </View>
    )
};