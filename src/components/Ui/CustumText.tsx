import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { globalFont } from '../../theme/appTheme';

// Componente de texto personalizado
const CustomText: React.FC<TextProps & { style?: TextStyle }> = ({ style, ...props }) => {
    return (
        <Text
            style={[{ fontFamily: 'SourceSans3-Regular', fontSize: globalFont.font_normal }, style]}
            {...props}
        />
    );
};

export default CustomText;
