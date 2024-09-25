import { Image, View } from 'react-native'
import React from 'react'
import { uiImageCustumContainerStyles } from '../../theme/UI/uiElementsTheme'
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

interface ImageContainerCustumInterface {
    imageValue?: string;
    size?: 'small'
}

export default function ImageContainerCustum({
    imageValue,
    size
}: ImageContainerCustumInterface) {

    const { typeTheme, theme } = useTheme();

    return (
        <View style={[uiImageCustumContainerStyles(theme, typeTheme).imageContainer, size && { height: 200 }]}>
            {
                imageValue ?
                    <View style={[uiImageCustumContainerStyles(theme, typeTheme).imageBackground]}>
                        <Image
                            source={require('../../assets/limon.png')}
                            style={uiImageCustumContainerStyles(theme, typeTheme).image}
                        />
                    </View>
                    :
                    <View style={uiImageCustumContainerStyles(theme, typeTheme).notImage}>
                        <View style={uiImageCustumContainerStyles(theme).notImageBackground}>
                            <Icon name={'image-outline'} size={24} color={'gray'} />
                        </View>
                    </View>
            }
        </View>
    )
}


{/* {
                imageValue ? <Image source={{ uri: `data:image/png;base64,${imageValue}` }} style={SellsDataScreenTheme(theme, typeTheme).image} />
                    : <View style={SellsDataScreenTheme(theme, typeTheme).notImage}></View>
            } */}