import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { globalFont, globalStyles } from '../../theme/appTheme';
import CustomText from '../Ui/CustumText';

interface TextInputContainerInterface {
    placeholder?: string;
    label?: string;
    setComments: (value: string) => void;
    value?: string;
    onFocus?: () => void;
}

export const TextInputContainer = ({
    placeholder = "Escribe algo...",
    label,
    setComments,
    value,
    onFocus
}: TextInputContainerInterface) => {

    const [height, setHeight] = useState(50); // Altura mínima inicial
    const { theme } = useTheme();

    const handleTextChange = (text: string) => {
        setComments(text);
    };

    const handleContentSizeChange = (event: any) => {
        const contentHeight = event.nativeEvent.contentSize.height;
        // Establecer el valor máximo entre 50 y la altura del contenido
        setHeight(contentHeight < 50 ? 50 : contentHeight);
    };

    return (
        <View>
            {label && (
                <CustomText style={{
                    fontSize: globalFont.font_normal,
                    color: theme.text_color
                }}>
                    {label}
                </CustomText>
            )}

            <TextInput
                style={[{
                    height: height,  // Aplicar altura dinámica
                    backgroundColor: theme.background_color_secondary,
                    paddingHorizontal: globalStyles(theme).globalPadding.padding,
                    borderWidth: 0.2,
                    borderColor: theme.color_border,
                    borderRadius: globalStyles().borderRadius.borderRadius,
                    color: theme.text_color
                }]}
                onChangeText={handleTextChange}
                multiline={true}
                placeholder={placeholder}
                onContentSizeChange={handleContentSizeChange}
                placeholderTextColor={theme.text_color}
                value={value}
                onFocus={onFocus}
            />
        </View>
    );
};
