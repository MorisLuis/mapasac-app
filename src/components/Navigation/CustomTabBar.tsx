import React, { useContext } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, Platform, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { customTabBarStyles } from '../../theme/UI/customTabBarTheme';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

export const CustomTabBar = ({ state, descriptors, navigation }: any) => {

    if (!state) return null;
    const { handleCameraAvailable, startScanning } = useContext(SettingsContext);
    const { navigate } = useNavigation<any>();
    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black"


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
                        backgroundColor: isFocused ? theme.color_tertiary : (Platform.OS === "android" ? theme.color_tertiary : "transparent")
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

    return (
        <SafeAreaView style={customTabBarStyles(theme).customTabBar}>
            <View style={customTabBarStyles(theme).content}>
                <TouchableOpacity onPress={() => navigate("OnboardingScreen")} style={customTabBarStyles(theme).buttonBack}>
                    <Icon name="arrow-back-outline" size={20} color={iconColor} />
                </TouchableOpacity>
                <View style={customTabBarStyles(theme).navigation}>
                    {state.routes.map(renderTabButton)}
                </View>
            </View>
        </SafeAreaView>
    );
};