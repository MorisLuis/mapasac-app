import React, { useState } from 'react'
import { inputStyles } from '../../theme/UI/inputs';
import { useTheme } from '../../context/ThemeContext';
import { Text, TextInput } from 'react-native';
import { globalFont, globalStyles } from '../../theme/appTheme';

interface TextInputContainerInterface {

    placeholder?: string;
    label?: string;
    setComments: any;
    value?: string
}

export const TextInputContainer = ({
    placeholder = "Escribe algo...",
    label = "label",
    setComments,
    value
}: TextInputContainerInterface) => {

    const [height, setHeight] = useState(50);
    const { theme } = useTheme();

    const handleTextChange = (value: string) => {
        setComments(value);
    };

    return (
        <>
            <Text style={{
                fontSize: globalFont.font_normal,
                color: theme.text_color
            }}
            >{label}</Text>

            <TextInput
                style={[inputStyles(theme).input, { height: height, minHeight: 50, marginBottom: globalStyles(theme).globalMarginBottom.marginBottom }]}
                onChangeText={handleTextChange}
                multiline={true}
                placeholder={placeholder}
                onContentSizeChange={(event) => setHeight(event.nativeEvent.contentSize.height)}
                placeholderTextColor={theme.color_gray}
                value={value}
            />
        </>
    )
}
