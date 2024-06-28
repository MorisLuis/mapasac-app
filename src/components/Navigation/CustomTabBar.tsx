import React, { useContext, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, Platform } from 'react-native';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/auth/AuthContext';
import { BlurView } from '@react-native-community/blur';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { customTabBarStyles } from '../../theme/UI/customTabBarTheme';
import { useTheme } from '../../context/ThemeContext';

export const CustomTabBar = ({ state, descriptors, navigation }: any) => {

    if (!state) return null;
    const { numberOfItems } = useContext(InventoryBagContext);
    const { user } = useContext(AuthContext);
    const { handleCameraAvailable } = useContext(SettingsContext);
    const { navigate } = useNavigation<any>();
    const { theme, typeTheme } = useTheme();

    const handleOpenBagInventory = () => {
        handleCameraAvailable(false)
        navigate('bagInventoryScreen')
    }

    const getTypeOfMovementsName = () => {
        let name;
        if (user?.Id_TipoMovInv?.Accion === 1 && user?.Id_TipoMovInv?.Id_TipoMovInv === 0) { // Inventario fisico
            name = "Inventario"
        } else if (user?.Id_TipoMovInv?.Accion === 1) {
            name = "Entrada"
        } else if (user?.Id_TipoMovInv?.Accion === 2) {
            name = "Salida"
        } else {
            name = "Traspaso"
        }
        return name
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

    useEffect(() => {
        getTypeOfMovementsName()
    }, [user])

    return (
        <SafeAreaView style={customTabBarStyles(theme).customTabBar}>
            <View style={customTabBarStyles(theme).content}>
                <View style={customTabBarStyles(theme).navigation}>
                    {state.routes.map(renderTabButton)}
                </View>
                {
                    Platform.OS === "android" ?
                        <TouchableOpacity style={[customTabBarStyles(theme).navButton, { marginRight: 0 }]} onPress={handleOpenBagInventory}>
                            <View style={[customTabBarStyles(theme).blurContainer, { backgroundColor: theme.background_color_blur }]}>
                                <Text
                                    style={[customTabBarStyles(theme).sectionBag, { color: typeTheme === 'dark' ? theme.text_color : theme.text_color_secondary }]}
                                >
                                    {getTypeOfMovementsName()} ( {numberOfItems} )
                                </Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={[customTabBarStyles(theme).navButton, { marginRight: 0 }]} onPress={handleOpenBagInventory}>
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
                        </TouchableOpacity>
                }
            </View>
        </SafeAreaView>
    );
};