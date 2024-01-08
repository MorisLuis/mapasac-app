import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';

interface CustomTabButtonProps {
    children: React.ReactNode;
    onPress: () => void;
    accessibilityLabel?: string; 
    active: boolean;
}

const CustomTabButton = ({
    children,
    onPress,
    accessibilityLabel,
    active,
}: CustomTabButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            accessibilityLabel={accessibilityLabel || ''} // Establecer un valor predeterminado en caso de que sea undefined
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: active ? 'red' : 'white',
                borderWidth: 0.5,
                borderColor: 'black',
                borderRadius: 8,
                marginRight: 10,
                height: 30
            }}
        >
            <Text style={{
                color: active ? 'white' : 'black'
            }}>{children}</Text>
        </TouchableOpacity>
    );
};

export const CustomTabBar = ({
    state,
    descriptors,
    navigation,
}: MaterialTopTabBarProps) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <CustomTabButton
                        key={route.key}
                        active={isFocused}
                        onPress={onPress}
                        accessibilityLabel={options.tabBarAccessibilityLabel || ''} // Establecer un valor predeterminado en caso de que sea undefined
                    >
                        {String(label)} {/* Asegúrate de convertir label a un string */}
                    </CustomTabButton>
                );
            })}
        </View>
    );
};
