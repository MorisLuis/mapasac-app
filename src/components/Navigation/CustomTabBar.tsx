import React, { useContext, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { colores } from '../../theme/appTheme';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/auth/AuthContext';
import { BlurView } from '@react-native-community/blur';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { customTabBarStyles } from '../../theme/UI/customTabBarTheme';

export const CustomTabBar = ({ state, descriptors, navigation }: any) => {

    if (!state) return null;
    const { numberOfItems } = useContext(InventoryBagContext);
    const { user } = useContext(AuthContext);
    const { handleCameraAvailable } = useContext(SettingsContext);
    const { navigate } = useNavigation<any>();

    const handleOpenBagInventory = () => {
        handleCameraAvailable(false)
        navigate('BagInventory')
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

            if (route?.name === "camera") {
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
                    customTabBarStyles.navButton,
                    {
                        backgroundColor: isFocused ? colores.color_yellow : "transparent"
                    }
                ]}
            >
                <BlurView
                    style={customTabBarStyles.blurContainer}
                    blurType="light"
                    blurAmount={10}
                >
                    <Text style={{
                        color: isFocused ? colores.text_color : colores.text_color
                    }}>
                        {label}
                    </Text>
                </BlurView>
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        getTypeOfMovementsName()
    }, [user])

    return (
        <SafeAreaView style={customTabBarStyles.customTabBar}>
            <View style={customTabBarStyles.content}>
                <View style={customTabBarStyles.navigation}>
                    {state.routes.map(renderTabButton)}
                </View>

                <View style={customTabBarStyles.bagContent} >
                    <TouchableOpacity style={customTabBarStyles.navButton} onPress={handleOpenBagInventory}>
                        <BlurView
                            style={customTabBarStyles.blurContainer}
                            blurType="light"
                            blurAmount={10}
                        >
                            <Text style={customTabBarStyles.bagNumber}>{getTypeOfMovementsName()} ( {numberOfItems} )</Text>
                        </BlurView>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};