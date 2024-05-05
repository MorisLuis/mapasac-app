import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colores, globalStyles } from '../../theme/appTheme';
import PorductInterface from '../../interface/product';

interface CustomHeaderInterface {
    navigation: any;
    title: string;
    backAvailable?: boolean;
    back?: () => void;
    route?: {
        params?: {
            selectedProduct?: PorductInterface
            fromModal?: boolean;
        };
    };
}

export const CustomHeader = ({
    navigation,
    title,
    backAvailable = true,
    back,
    route
}: CustomHeaderInterface) => {

    const { fromModal } = route?.params || {}

    console.log({ fromModal })

    const handleOnPress = () => {
        if (back && typeof back === 'function') {
            back();
        }
        navigation.goBack();
    }


    return (
        <>
            {fromModal ? (
                <View style={[styles.CustomHeader, { paddingTop: 20 }]}>
                    {backAvailable && (
                        <TouchableOpacity
                            style={styles.back}
                            onPress={handleOnPress}
                        >
                            <Icon name="chevron-back-outline" size={20} color="black" />
                            <Text style={styles.backText}>Atrás</Text>
                        </TouchableOpacity>
                    )}
                    <Text style={styles.titleHeader}>{title}</Text>
                </View>
            ) : (
                <SafeAreaView style={styles.CustomHeader}>
                    {backAvailable && (
                        <TouchableOpacity
                            style={styles.back}
                            onPress={handleOnPress}
                        >
                            <Icon name="chevron-back-outline" size={20} color="black" />
                            <Text style={styles.backText}>Atrás</Text>
                        </TouchableOpacity>
                    )}
                    <Text style={styles.titleHeader}>{title}</Text>
                </SafeAreaView>
            )}
        </>
    );
    
}

const styles = StyleSheet.create({
    CustomHeader: {
        backgroundColor: colores.background_color,
        borderBottomWidth: 1,
        borderBottomColor: colores.background_color,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: "relative",
        width: "100%"
    },
    back: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        left: 10,
        bottom: 0
    },
    backText: {
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 3,
    },
    titleHeader: {
        fontWeight: 'bold',
        fontSize: 16
    },
    right: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        right: 20,
        bottom: 0,
    },
    rightText: {
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 3,
        color: colores.color_blue
    }
})


export const CustomBackButton = ({ navigation, onClick }: any) => {


    const handlePress = () => {
        onClick?.();
        navigation.goBack();
    };

    return (
        <TouchableOpacity
            style={stylesHeaderBack.back}
            onPress={handlePress}
        >
            <Icon name="chevron-back-outline" size={20} color="black" />
            <Text style={stylesHeaderBack.backText}>Atrás</Text>
        </TouchableOpacity>
    );
};



const stylesHeaderBack = StyleSheet.create({
    back: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        left: 0,
        bottom: 0
    },
    backText: {
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 3,
    },
    titleHeader: {
        fontWeight: 'bold',
        fontSize: 16
    }
});