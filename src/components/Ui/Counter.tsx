import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colores, globalFont, globalStyles } from '../../theme/appTheme';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

interface CounterInterface {
    counter: number,
    setCounter: React.Dispatch<React.SetStateAction<number>> | ((value: number) => void)
}

export const Counter = ({
    counter,
    setCounter
}: CounterInterface) => {

    const addProduct = () => {
        setCounter(counter + 1)
    }

    const handleInputChange = (value: string) => {
        // Validación para asegurar que el valor sea un número positivo
        const numericValue = parseInt(value) || 0;
        setCounter(numericValue);
    }

    const subtractProduct = () => {
        if (counter === 0) return;
        setCounter(counter - 1)
    }

    return (
        <View style={styles.counter}>
            <Icon name="remove-outline" size={hp("3.5%")} color="black" onPress={subtractProduct} style={styles.counterButton}/>
            <TextInput
                style={styles.input}
                value={counter.toString()}
                onChangeText={handleInputChange}
                keyboardType="numeric"
            />
            <Icon name="add-outline" size={hp("3.5%")} color="black" onPress={addProduct} style={styles.counterButton}/>
        </View>
    )
}

const styles = StyleSheet.create({

    counter: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: globalStyles.globalMarginBottom.marginBottom
    },
    input: {
        textAlign: 'center',
        marginHorizontal: globalStyles.globalMarginBottom.marginBottom / 2,
        backgroundColor: colores.background_color_secondary,
        paddingHorizontal: wp("7.5%"),
        paddingVertical: 10,
        borderRadius: globalStyles.borderRadius.borderRadius,
        borderWidth: 1,
        borderColor: colores.color_border,
        fontSize: globalFont.font_normal
    },
    counterButton: {
        backgroundColor: colores.background_color_secondary,
        padding: globalStyles.globalPadding.padding / 5,
        borderRadius: globalStyles.borderRadius.borderRadius
    }
});
