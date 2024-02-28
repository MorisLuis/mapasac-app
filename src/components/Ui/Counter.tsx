import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface CounterInterface {
    counter: number,
    setCounter: React.Dispatch<React.SetStateAction<number>>
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
        if(counter === 0) return;
        setCounter(counter - 1)
    }

    return (
        <View style={styles.counter}>
            <Icon name="remove-circle-outline" size={35} color="black" onPress={subtractProduct}/>
            <TextInput
                style={styles.input}
                value={counter.toString()}
                onChangeText={handleInputChange}
                keyboardType="numeric"
            />
            <Icon name="add-circle-outline" size={35} color="black" onPress={addProduct}/>
        </View>
    )
}

const styles = StyleSheet.create({

    counter: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 25
    },
    input: {
        textAlign: 'center',
        marginHorizontal: 10,
        backgroundColor: "#F0F3FF",
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#EEEDEB"
    }
});
