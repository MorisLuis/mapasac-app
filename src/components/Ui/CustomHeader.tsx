import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductInterface from '../../interface/product';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { customHeaderStyles } from '../../theme/UI/customHeader';
import { useTheme } from '../../context/ThemeContext';
import CustomText from './CustumText';

interface CustomHeaderInterface {
    navigation: any;
    title: string;
    backAvailable?: boolean;
    back?: () => void;
    backCustum?: boolean;
    secondaryDesign?: boolean;
    route?: {
        params?: {
            selectedProduct?: ProductInterface
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
    secondaryDesign,
    route
}: CustomHeaderInterface) => {

    const { fromModal } = route?.params || {}
    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black"

    const handleOnPress = () => {
        if (typeof back === 'function' && backCustum) {
            back();
        } else if (typeof back === 'function') {
            back?.();
        } else {
            navigation.goBack();
        }
    }


    return (
        <>
            {fromModal ? (
                <SafeAreaView style={customHeaderStyles(theme).CustomHeader}>
                    {backAvailable && (
                        <TouchableOpacity
                            style={customHeaderStyles(theme).back}
                            onPress={handleOnPress}
                        >
                            <Icon name="chevron-back-outline" size={20} color={iconColor} />
                            <CustomText style={customHeaderStyles(theme).backText}>Atrás</CustomText>
                        </TouchableOpacity>
                    )}
                    <CustomText style={customHeaderStyles(theme).titleHeader}>{title}</CustomText>
                </SafeAreaView>
            ) : (
                <SafeAreaView style={{ backgroundColor: secondaryDesign ? theme.background_color_secondary : theme.background_color }}>
                    <View style={secondaryDesign ? customHeaderStyles(theme).CustomHeaderSecondary :  customHeaderStyles(theme).CustomHeader}>
                        {backAvailable && (
                            <TouchableOpacity
                                style={customHeaderStyles(theme).back}
                                onPress={handleOnPress}
                            >
                                <Icon name="chevron-back-outline" size={hp("2.5%")} color={iconColor} />
                                <CustomText style={customHeaderStyles(theme).backText}>Atrás</CustomText>
                            </TouchableOpacity>
                        )}
                        <CustomText style={customHeaderStyles(theme).titleHeader}>{title}</CustomText>
                    </View>
                </SafeAreaView>
            )}
        </>
    );

}


export const CustomBackButton = ({ navigation, onClick }: any) => {


    const { typeTheme, theme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black"

    const handlePress = () => {
        onClick?.();
        navigation.goBack();
    };

    return (
        <TouchableOpacity
            style={stylesHeaderBack.back}
            onPress={handlePress}
        >
            <Icon name="chevron-back-outline" size={20} color={iconColor} />
            <CustomText style={{
                fontWeight: 'bold',
                fontSize: 14,
                marginLeft: 3,
                color: theme.text_color
            }}>Atrás</CustomText>
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
    titleHeader: {
        fontWeight: 'bold',
        fontSize: 16
    }
});