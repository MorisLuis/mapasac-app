import { View } from 'react-native'
import React from 'react'
import CustomText from './CustumText'
import { uiElementeStyles } from '../../theme/UI/uiElementsTheme'
import { useTheme } from '../../context/ThemeContext'

interface TagInterface {
    message: string;
    color: 'green'
}

const Tag = ({
    message,
    color
}: TagInterface) => {

    const { theme, typeTheme } = useTheme();

    return (
        <View style={[uiElementeStyles(theme, typeTheme).tagContainer, uiElementeStyles(theme, typeTheme)[color]]}>
            <CustomText
                style={[
                    uiElementeStyles(theme, typeTheme).tagText,
                    uiElementeStyles(theme, typeTheme)[color],
                    {
                        backgroundColor: 'transparent',
                        borderWidth: 0
                    }]}
            >
                {message}
            </CustomText>
        </View>
    )
}

export default Tag;