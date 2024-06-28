import React, { useState } from 'react';
import { View, Switch, Text } from 'react-native';
import { toggleStyles } from '../../theme/UI/inputs';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

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

    const { theme, typeTheme } = useTheme();
    const [isEnabled, setIsEnabled] = useState(value ? value : false);
    console.log({typeTheme})
    const iconColor = typeTheme === 'dark' ? "white" : "black"


    const toggleSwitch = () => {
        onChange(!isEnabled)
        setIsEnabled(previousState => !isEnabled);
    };

    return (
        <View style={[toggleStyles(theme).Toggle, extraStyles]}>
            <View style={toggleStyles(theme).toggleText}>
                <Text style={toggleStyles(theme).togglelabel}>{label}</Text>
                <Text style={toggleStyles(theme).togglemessage}>{message}</Text>
            </View>

            <View
                style={{
                    display: "flex",
                    position: "relative",
                    justifyContent: "center"
                }}
            >
                {
                    isEnabled &&
                    <Icon
                        name="checkmark-outline"
                        size={18}
                        color={iconColor}
                        
                        style={{
                            position: 'absolute',
                            zIndex: 2,
                            left: isEnabled ? "52.5%" : "12.5%"
                        }}
                    />
                }
                <Switch
                    trackColor={{ false: theme.color_black, true: theme.color_green }}
                    thumbColor={isEnabled ? theme.background_color : theme.background_color}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
        </View>
    );
};

export default Toggle;