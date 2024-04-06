import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg';

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 200,
        borderColor: 'black',
        borderWidth: 0,
        position: "relative"
    },
    lineHorizontal: {
        width: 50,
        height: 3,
        backgroundColor: 'black',
        position: "absolute"
    },
    lineVertical: {
        width: 3,
        height: 50,
        backgroundColor: 'black',
        position: "absolute"
    },
    svg: {
        position: "absolute",
        right: 0,
        top: 0
    }
});

const Square = () => {
    return (
        <View style={styles.container}>
            <View style={styles.svg}>
                <Svg  width={50} height={50}>
                    <Path
                        d="M 0 0 Q 65 0 50 50 L 50 50"
                        fill="none"
                        stroke="black"
                        strokeWidth="3"
                    />
                </Svg>
            </View>


            <View style={[styles.lineHorizontal, { top: 0, left: 0 }]} />
            <View style={[styles.lineHorizontal, { top: "100%", left: 0 }]} />
            <View style={[styles.lineHorizontal, { top: 0, right: 0 }]} />
            <View style={[styles.lineHorizontal, { top: "100%", right: 0 }]} />


            <View style={[styles.lineVertical, { top: 0, left: 0 }]} />
            <View style={[styles.lineVertical, { top: 0, left: "100%" }]} />
            <View style={[styles.lineVertical, { bottom: 0, left: 0 }]} />
            <View style={[styles.lineVertical, { bottom: 0, left: "100%" }]} />
        </View>
    );
}

export default Square;
