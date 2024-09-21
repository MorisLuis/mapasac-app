import React from 'react';

import { TouchableOpacity, View } from 'react-native';
import { ProductItemSearchStyles } from '../../theme/UI/cardsStyles';
import { useTheme } from '../../context/ThemeContext';
import CustomText from '../Ui/CustumText';

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
                <CustomText style={ProductItemSearchStyles(theme, typeTheme).description}>{data}</CustomText>
            </View>
        </TouchableOpacity>
    )
}