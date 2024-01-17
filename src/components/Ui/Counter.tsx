import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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

    const subtractProduct = () => {
        if(counter === 0) return;
        setCounter(counter - 1)
    }

    return (
        <View style={styles.counter}>
            <Icon name="remove-circle-outline" size={35} color="black" onPress={subtractProduct}/>
            <Text>{counter}</Text>
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
    }
});
