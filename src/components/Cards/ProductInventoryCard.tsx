import React from 'react'
import { Image, Text, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import logoCircleSvg from "../../assets/svg/svg.tsx"

export const ProductInventoryCard = () => {
    return (

        <View style={{ 
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 0.5,
            borderColor: 'black',
            borderRadius: 8, 
            padding: 10,
            marginBottom:10
        }}>
            <SvgXml xml={logoCircleSvg} width="60" height="60" />
            <View>
                <Text>Rotulador</Text>
                <Text>Codigo: 2023902u4</Text>
            </View>
            <View>
                <Text>10</Text>
            </View>
        </View>
    )
}
