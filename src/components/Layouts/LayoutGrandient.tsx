import { View } from 'react-native';
import React, { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';

interface LayoutGrandientInterface {
    children: React.ReactNode;
    color: string;
}

const LayoutGrandient = ({ children, color }: LayoutGrandientInterface) => {
    const handleBackgroundColor = () => {
        let colorGradient = '#D8D2F6'; // Valor predeterminado
        if (color === 'green') {
            colorGradient = '#CEEFE4'; // Asegúrate de que el color tenga el símbolo '#'
        }
        return colorGradient;
    }

    // Si no hay color, no renders nada
    if (!color) return null;

    return (
        <LinearGradient
            colors={[handleBackgroundColor(), '#ffffff']} // Color morado a blanco
            locations={[0, 0.5]} // Cambia el color en la mitad
        >
            {children}
        </LinearGradient>
    );
}

export default LayoutGrandient;