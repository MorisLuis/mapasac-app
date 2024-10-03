import React, { useState, useEffect, forwardRef } from 'react';
import { TextInput, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { globalFont, globalStyles } from '../../theme/appTheme';
import CustomText from '../Ui/CustumText';

interface TextInputContainerInterface {
    placeholder?: string;
    label?: string;
    setComments: (value: string) => void;
    value?: string;  // Este es el valor inicial que se le asigna al TextInput
    onFocus?: () => void;
    styles?: any;
}

// Usar forwardRef para pasar el ref al TextInput
export const TextInputContainer = forwardRef<TextInput, TextInputContainerInterface>(({
    placeholder = "Escribe algo...",
    label,
    setComments,
    value,  // El valor inicial
    onFocus,
    styles
}, ref) => {
    const [height, setHeight] = useState(50); // Altura mínima inicial
    const [localValue, setLocalValue] = useState<string>(value || '');  // Estado interno para manejar el valor
    const { theme } = useTheme();

    // Usar useEffect para actualizar el valor inicial solo cuando el componente se monta o cuando 'value' cambia.
    useEffect(() => {
        if (value) {
            setLocalValue(value);  // Inicializar el valor interno
        }
    }, [value]);

    const handleTextChange = (text: string) => {
        setLocalValue(text);  // Actualizar el valor interno del TextInput
        setComments(text);    // Llamar a la función que se pasa como prop para actualizar el estado en el componente padre
    };

    const handleContentSizeChange = (event: any) => {
        const contentHeight = event.nativeEvent.contentSize.height;
        setHeight(contentHeight < 50 ? 50 : contentHeight);  // Ajustar la altura dinámica
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
                ref={ref} // Asignar el ref aquí
                style={[{
                    height: height,  // Aplicar altura dinámica
                    backgroundColor: theme.background_color_secondary,
                    paddingHorizontal: globalStyles(theme).globalPadding.padding,
                    borderWidth: 0.2,
                    borderColor: theme.color_border,
                    borderRadius: globalStyles().borderRadius.borderRadius,
                    color: theme.text_color
                }, { ...styles }]}
                onChangeText={handleTextChange}  // Actualiza el estado local y el padre
                multiline={true}
                placeholder={placeholder}
                onContentSizeChange={handleContentSizeChange}
                placeholderTextColor={theme.text_color}
                value={localValue}  // Asignar el valor del estado interno
                onFocus={onFocus}
            />
        </View>
    );
});

TextInputContainer.displayName = 'TextInputContainer';
