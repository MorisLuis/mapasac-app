import React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';
import ProductInterface from '../../interface/product';
import { ProductItemSearchStyles } from '../../theme/UI/cardsStyles';
import { useTheme } from '../../context/ThemeContext';

interface OneDataCardInterface {
    data: string;
    onClick?: () => void;
    optionSelected?: boolean;
}

export const OneDataCard = ({
    data,
    onClick,
    optionSelected
}: OneDataCardInterface) => {
    const { theme, typeTheme } = useTheme();

    return (
        <TouchableOpacity
            style={[optionSelected ? ProductItemSearchStyles(theme, typeTheme).ProductItemSearchSelected : ProductItemSearchStyles(theme, typeTheme).ProductItemSearch]}
            onPress={onClick}
        >
            <View style={ProductItemSearchStyles(theme, typeTheme).information}>
                <Text style={ProductItemSearchStyles(theme, typeTheme).description}>{data}</Text>
            </View>
        </TouchableOpacity>
    )
}