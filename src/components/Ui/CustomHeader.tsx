import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colores, globalFont, globalStyles } from '../../theme/appTheme';
import PorductInterface from '../../interface/product';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

interface CustomHeaderInterface {
    navigation: any;
    title: string;
    backAvailable?: boolean;
    back?: () => void;
    backCustum?: boolean;
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
    backCustum = false,
    back,
    route
}: CustomHeaderInterface) => {

    const { fromModal } = route?.params || {}

    const handleOnPress = () => {
        if (typeof back === 'function' && backCustum) {
            back();
        } else {
            //back?.();
            navigation.goBack();
        }
    }


    return (
        <>
            {fromModal ? (
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
            ) : (
                <SafeAreaView style={{ backgroundColor: colores.background_color}}>
                    <View style={styles.CustomHeader}>
                        {backAvailable && (
                            <TouchableOpacity
                                style={styles.back}
                                onPress={handleOnPress}
                            >
                                <Icon name="chevron-back-outline" size={hp("2.5%")} color="black" />
                                <Text style={styles.backText}>Atrás</Text>
                            </TouchableOpacity>
                        )}
                        <Text style={styles.titleHeader}>{title}</Text>
                    </View>
                </SafeAreaView>
            )}
        </>
    );
    
}


const styles = StyleSheet.create({
    CustomHeader: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: colores.background_color,
        backgroundColor: colores.background_color,
        borderBottomWidth: 1,
        position: "relative",
        width: "100%",
        height: hp("6%"),
    },
    back: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        left:  globalStyles.globalMarginBottom.marginBottom / 2,
        bottom: (hp("6%") * 0.5) - (globalFont.font_normal / 2) - 3
    },
    backText: {
        fontWeight: 'bold',
        fontSize: globalFont.font_normal,
        marginLeft: 3,
    },
    titleHeader: {
        fontWeight: 'bold',
        fontSize: globalFont.font_normal,
        marginBottom: 0,
        padding: 0,
        height: globalFont.font_normal + 3
    },
    right: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        right: globalStyles.globalMarginBottom.marginBottom,
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