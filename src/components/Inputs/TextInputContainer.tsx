import React, { useState } from 'react'
import { inputStyles } from '../../theme/UI/inputs';
import { useTheme } from '../../context/ThemeContext';
import { TextInput } from 'react-native';
import { globalFont, globalStyles } from '../../theme/appTheme';
import CustomText from '../Ui/CustumText';

interface TextInputContainerInterface {

    placeholder?: string;
    label?: string;
    setComments: any;
    value?: string
}

export const TextInputContainer = ({
    placeholder = "Escribe algo...",
    label,
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
            {
                label &&
                <CustomText style={{
                    fontSize: globalFont.font_normal,
                    color: theme.text_color
                }}
                >{label}</CustomText>
            }

            <TextInput
                style={[{
                    height: height,
                    minHeight: 50,
                    marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,
                    backgroundColor: theme.background_color_secondary,
                    paddingHorizontal: globalStyles(theme).globalPadding.padding, // Aquí está el padding horizontal
                    paddingVertical: 10, // Puedes ajustar el padding vertical si es necesario
                    borderWidth: 0.5,
                    borderColor: theme.color_border,
                    borderRadius: globalStyles().borderRadius.borderRadius
                }]}
                onChangeText={handleTextChange}
                multiline={true}
                placeholder={placeholder}
                onContentSizeChange={(event) => setHeight(event.nativeEvent.contentSize.height)}
                placeholderTextColor={theme.text_color}
                value={value}
            />
        </>
    )
}
