import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../context/ThemeContext';

interface LayoutGrandientInterface {
    children: React.ReactNode;
    color: 'green' | 'purple';
    locations?: number[]
}

const LayoutGrandient = ({ children, color, locations }: LayoutGrandientInterface) => {

    const { theme } = useTheme();

    const handleBackgroundColor = () => {
        let colorGradient: string;

        if (color === 'green') {
            colorGradient = adjustColor(theme.color_green, 100);
        } else if (color === 'purple') {
            colorGradient = adjustColor(theme.color_purple, 0);
        } else {
            colorGradient = '#CEEFE4'; // Valor predeterminado
        }

        // Convertir el color ajustado a formato RGBA con opacidad
        const rgbColor = hexToRgb(colorGradient);
        return `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.5)`; // Cambia el 0.5 a la opacidad deseada
    };

    return (
        <LinearGradient
            colors={[handleBackgroundColor(), theme.background_color]}
            locations={locations ?? [0, 0.5]}
        >
            {children}
        </LinearGradient>
    );
};

export default LayoutGrandient;




// Función para ajustar la luminosidad de un color hexadecimal
const adjustColor = (hex: string, amount: number) => {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    r = Math.min(255, Math.max(0, r + amount));
    g = Math.min(255, Math.max(0, g + amount));
    b = Math.min(255, Math.max(0, b + amount));

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

// Función para convertir hex a rgb
const hexToRgb = (hex: string) => {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
};
