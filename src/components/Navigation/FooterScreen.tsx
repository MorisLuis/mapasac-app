import { View, SafeAreaView } from 'react-native'
import React from 'react'
import ButtonCustum from '../Inputs/ButtonCustum'
import { useTheme } from '../../context/ThemeContext';
import { uiNavigationStyles } from '../../theme/UI/uiElementsTheme';

interface FooterScreenInterface {
    buttonTitle: string;
    buttonOnPress: () => void;
    buttonDisabled: boolean;
};

const FooterScreen = ({
    buttonTitle,
    buttonOnPress,
    buttonDisabled
}: FooterScreenInterface ) => {

    const { typeTheme, theme } = useTheme();

    return (
        <SafeAreaView style={uiNavigationStyles(theme, typeTheme).FooterScreen}>
            <View style={uiNavigationStyles(theme, typeTheme).FooterScreenContainer}>
                <ButtonCustum
                    title={buttonTitle}
                    onPress={buttonOnPress}
                    disabled={buttonDisabled}
                    buttonColor='green'
                />
            </View>
        </SafeAreaView>
    )
}

export default FooterScreen