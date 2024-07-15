import React, { useContext, useEffect, useRef } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, Platform, Animated } from 'react-native';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/auth/AuthContext';
import { BlurView } from '@react-native-community/blur';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { customTabBarStyles } from '../../theme/UI/customTabBarTheme';
import { useTheme } from '../../context/ThemeContext';


export const CustomTabBar = ({ state, descriptors, navigation }: any) => {

    if (!state) return null;
    const { numberOfItems, productAdded } = useContext(InventoryBagContext);
    const { getTypeOfMovementsName } = useContext(AuthContext);
    const { handleCameraAvailable, startScanning } = useContext(SettingsContext);
    const { navigate } = useNavigation<any>();
    const { theme, typeTheme } = useTheme();

    const handleOpenBagInventory = () => {
        handleCameraAvailable(false)
        navigate('bagInventoryScreen')
    }

    const renderTabButton = (route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {

            if (route?.name === "[ScannerNavigation] - camera") {
                handleCameraAvailable(true)
            } else {
                handleCameraAvailable(false)
            }

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
            <TouchableOpacity
                key={index}
                onPress={onPress}
                disabled={startScanning}
                style={[
                    customTabBarStyles(theme, typeTheme).navButton,
                    {
                        backgroundColor: isFocused ? theme.color_yellow : (Platform.OS === "android" ? theme.background_color_blur : "transparent")
                    }
                ]}
            >
                {
                    Platform.OS === "android" ?
                        <View style={customTabBarStyles(theme).blurContainer} >
                            <Text style={[customTabBarStyles(theme).sectionTitle, {
                                color: isFocused && typeTheme === 'dark' ? theme.text_color_secondary :
                                    isFocused ? theme.text_color :
                                        !isFocused && typeTheme === 'dark' ? theme.text_color :
                                            theme.text_color_secondary
                            }]}>
                                {label}
                            </Text>
                        </View>
                        :
                        <BlurView
                            style={customTabBarStyles(theme).blurContainer}
                            blurType="light"
                            blurAmount={10}
                        >
                            <Text style={[customTabBarStyles(theme).sectionTitle, {
                                color: isFocused && typeTheme === 'dark' ? theme.text_color_secondary :
                                    isFocused ? theme.text_color :
                                        !isFocused && typeTheme === 'dark' ? theme.text_color_secondary :
                                            theme.text_color
                            }]}>
                                {label}
                            </Text>
                        </BlurView>
                }
            </TouchableOpacity>
        );
    };

/*     useEffect(() => {
        getTypeOfMovementsName()
    }, [user]) */

    return (
        <SafeAreaView style={customTabBarStyles(theme).customTabBar}>
            <View style={customTabBarStyles(theme).content}>
                <View style={customTabBarStyles(theme).navigation}>
                    {state.routes.map(renderTabButton)}
                </View>
                {
                    Platform.OS === "android" ?
                        <TouchableOpacity
                            style={[customTabBarStyles(theme).navButton, { marginRight: 0 }]}
                            onPress={handleOpenBagInventory}
                            disabled={startScanning}
                        >
                            <View style={[customTabBarStyles(theme).blurContainer, { backgroundColor: theme.background_color_blur }]}>
                                <Text
                                    style={[customTabBarStyles(theme).sectionBag, { color: typeTheme === 'dark' ? theme.text_color : theme.text_color_secondary }]}
                                >
                                    {getTypeOfMovementsName()} ( {numberOfItems} )
                                </Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <AnimatedButton isScaled={productAdded} >
                            <BlurView
                                style={customTabBarStyles(theme).blurContainer}
                                blurType="light"
                                blurAmount={10}
                            >
                                <Text
                                    style={[customTabBarStyles(theme).sectionBag, { color: typeTheme === 'dark' ? theme.text_color_secondary : theme.text_color }]}>
                                    {getTypeOfMovementsName()} ( {numberOfItems} )
                                </Text>
                            </BlurView>
                        </AnimatedButton>
                }
            </View>
        </SafeAreaView>
    );
};

// Bag Inventory animation
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const AnimatedButton = ({ isScaled, children }: any) => {

    const scaleAnim = useRef(new Animated.Value(1)).current;
    const { theme } = useTheme();
    const { navigate } = useNavigation<any>();
    const { startScanning } = useContext(SettingsContext);

    useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: isScaled ? 1.2 : 1, // Ajusta el valor de escala según el estado isScaled
            useNativeDriver: true,
        }).start();
    }, [isScaled]);

    const handleOpenBagInventory = () => {
        navigate('bagInventoryScreen')
    }

    return (
        <AnimatedTouchableOpacity
            style={[
                customTabBarStyles(theme).navButton,
                { transform: [{ scale: scaleAnim }], marginRight: 0 }
            ]}
            onPress={handleOpenBagInventory}
            disabled={startScanning}
        >
            {children}
        </AnimatedTouchableOpacity>
    );
};