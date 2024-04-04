import React, { useContext, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colores, globalStyles } from '../../theme/appTheme';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/auth/AuthContext';

export const CustomTabBar = ({ state, descriptors, navigation }: any) => {

    if (!state) return null;
    const { numberOfItems } = useContext(InventoryBagContext);
    const { user } = useContext(AuthContext);

    const { navigate } = useNavigation<any>();


    const getTypeOfMovementsName = () => {
        let name;
        if (user?.Id_TipoMovInv?.Accion === 1 && user?.Id_TipoMovInv?.Id_TipoMovInv === 0) { // Inventario fisico
            name = "Inventario"
        } else if ( user?.Id_TipoMovInv?.Accion === 1) {
            name = "Entrada"
        } else if (user?.Id_TipoMovInv?.Accion === 2 ) {
            name = "Salida"
        } else {
            name = "Traspaso"
        }
        return name
    }

    useEffect( () => {
        getTypeOfMovementsName()
    }, [user])


    const renderTabButton = (route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
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
            <TouchableOpacity
                key={index}
                onPress={onPress}
                style={[
                    styles.navButton,
                    {
                        backgroundColor: isFocused ? colores.color_yellow : colores.color_tertiary,
                    },
                ]}
            >
                <Text style={{
                    color: isFocused ? colores.text_color : colores.text_color_secondary
                }}>
                    {label}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.customTabBar}>

            <View style={styles.content}>
                <View style={styles.navigation}>
                    {state.routes.map(renderTabButton)}
                </View>

                <View style={styles.bagContent} >
                    <TouchableOpacity style={styles.bag} onPress={() => navigate('BagInventory')}>
                        <Text style={styles.bagNumber}>{getTypeOfMovementsName()} ( {numberOfItems} )</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    customTabBar: {
        position: 'absolute',
        flexDirection: 'row',
        top: 0,
        left: 0,
        zIndex: 1,
        width: "100%",
        height: 35,
    },
    content: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: globalStyles.globalPadding.padding,
        height: 30
    },
    navigation: {
        display: "flex",
        flexDirection: "row"
    },
    navButton: {
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'white',
        borderRadius: 100,
        height: 30,
        width: 100,
        marginRight: 10,
    },
    bagContent: {
        display: "flex"
    },
    bag: {
        backgroundColor: colores.color_tertiary,
        height: 30,
        borderRadius: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10
    },
    bagNumber: {
        color: colores.text_color_secondary
    },
});
