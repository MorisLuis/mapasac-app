import React from 'react'

import { StyleSheet, Text, View } from 'react-native'
import { colores, globalFont, globalStyles } from '../../theme/appTheme';


export const TermsOfUseScreen = () => {

    return (
        <View style={styles.TermsOfUseScreen}>
            <Text style={styles.header}>Terminos de uso</Text>
            <Text>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias quo, cum rerum molestias blanditiis neque repellat dicta modi aut at totam quis quidem fugit animi, ratione nihil est. Nostrum, optio!
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias quo, cum rerum molestias blanditiis neque repellat dicta modi aut at totam quis quidem fugit animi, ratione nihil est. Nostrum, optio!
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias quo, cum rerum molestias blanditiis neque repellat dicta modi aut at totam quis quidem fugit animi, ratione nihil est. Nostrum, optio!
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias quo, cum rerum molestias blanditiis neque repellat dicta modi aut at totam quis quidem fugit animi, ratione nihil est. Nostrum, optio!
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias quo, cum rerum molestias blanditiis neque repellat dicta modi aut at totam quis quidem fugit animi, ratione nihil est. Nostrum, optio!
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias quo, cum rerum molestias blanditiis neque repellat dicta modi aut at totam quis quidem fugit animi, ratione nihil est. Nostrum, optio!
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({

    TermsOfUseScreen: {
        padding: globalStyles.globalPadding.padding,
        backgroundColor: colores.background_color,
        height: '100%'
    },
    header: {
        fontSize: globalFont.font_big,
        fontWeight: "bold",
        marginBottom: globalStyles.globalMarginBottom.marginBottom
    }
})