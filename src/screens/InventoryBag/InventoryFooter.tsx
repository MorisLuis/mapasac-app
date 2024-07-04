import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { buttonStyles } from '../../theme/UI/buttons';
import { globalStyles } from '../../theme/appTheme';
import { useTheme } from '../../context/ThemeContext';

// Not using in this moment
interface InventoryFooterInterface {
    buttonBackAvailable?: boolean,
    buttonNextAvailable?: boolean
}

export const InventoryFooter = ({
    buttonBackAvailable = true,
    buttonNextAvailable = true
}: InventoryFooterInterface) => {

    const { navigate } = useNavigation<any>();
    const { theme } = useTheme();

    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: "space-between",
            //backgroundColor: "white",
            height: "10%",
            padding: globalStyles(theme).globalPadding.padding,
        }}>
            {
                buttonBackAvailable ?
                    <TouchableOpacity style={[buttonStyles(theme).button_line]} onPress={() => navigate('InventoryBag')}>
                        <Text style={buttonStyles(theme).button_line_text}>Atrás</Text>
                    </TouchableOpacity>
                    :
                    <View></View>
            }

            {
                buttonNextAvailable &&
                <TouchableOpacity style={[buttonStyles(theme).button, buttonStyles(theme).white]} onPress={() => navigate('TypeMovement')}>
                    <Text style={{ color: theme.text_color }}>Siguiente</Text>
                </TouchableOpacity>
            }
        </View>
    )
};