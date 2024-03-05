import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { buttonStyles } from '../../theme/UI/buttons';
import { globalStyles } from '../../theme/appTheme';

interface InventoryFooterInterface {
    buttonBackAvailable?: boolean,
    buttonNextAvailable?: boolean
}

export const InventoryFooter = ({
    buttonBackAvailable = true,
    buttonNextAvailable = true
}: InventoryFooterInterface) => {

    const { navigate } = useNavigation<any>();

    return (
        <View style={styles.InventoryFooter}>
            {
                buttonBackAvailable ?
                    <TouchableOpacity style={[buttonStyles.button_line]} onPress={() => navigate('InventoryBag')}>
                        <Text style={buttonStyles.button_line_text}>Atrás</Text>
                    </TouchableOpacity>
                    :
                    <View></View>
            }

            {
                buttonNextAvailable &&
                <TouchableOpacity style={[buttonStyles.button, buttonStyles.white]} onPress={() => navigate('TypeMovement')}>
                    <Text>Siguiente</Text>
                </TouchableOpacity>
            }
        </View>
    )
}


const styles = StyleSheet.create({

    InventoryFooter: {
        //backgroundColor: ,
        //flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        backgroundColor: "white",
        height: "10%",
        padding: globalStyles.globalPadding.padding,
    },
    button_next: {

    },
    button_back: {

    }
})