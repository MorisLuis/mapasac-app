import React, { useState } from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';
import { colores, globalFont } from '../../theme/appTheme';

interface ToggleInterface {
    label: string;
    message: string;
    extraStyles: any;
    value?: boolean;
    onChange: any
}

const Toggle = ({
    label,
    message,
    extraStyles,
    value,
    onChange
}: ToggleInterface) => {

    const [isEnabled, setIsEnabled] = useState(value ? value : false);
    const toggleSwitch = () => {
        console.log({isEnabled})
        onChange(!isEnabled)
        setIsEnabled(previousState => !isEnabled);
    };

    return (
        <View style={[styles.Toggle, extraStyles]}>
            <View style={styles.toggleText}>
                <Text style={styles.togglelabel}>{label}</Text>
                <Text style={styles.togglemessage}>{message}</Text>
            </View>

            <Switch
                trackColor={{ false: colores.color_black, true: colores.color_green }}
                thumbColor={isEnabled ? colores.background_color : colores.background_color}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    );
};

export default Toggle;


const styles = StyleSheet.create({
    Toggle: {
        display: "flex",
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between"
    },
    toggleText: {

    },
    togglelabel: {
        fontSize: globalFont.font_normal,
        fontWeight: "bold"
    },
    togglemessage: {
        fontSize: globalFont.font_sm
    }
})