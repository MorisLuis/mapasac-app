import React from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ModalMiddlenStyles } from '../../theme/ModalRenders/ModalMiddleTheme';
import { useTheme } from '../../context/ThemeContext';
import CustomText from '../Ui/CustumText';

interface ModalMiddleInterface {
    visible: boolean;
    onClose: () => void;
    children: any;
    title?: string
}

const ModalMiddle = ({
    visible,
    onClose,
    children,
    title
}: ModalMiddleInterface) => {

    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black"

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            {
                Platform.OS === "android" ?
                    <View style={[StyleSheet.absoluteFill]}>
                        <View style={ModalMiddlenStyles(theme, typeTheme).ModalMiddle}>
                            <View style={ModalMiddlenStyles(theme, typeTheme).modalBackground}></View>
                            <View style={ModalMiddlenStyles(theme, typeTheme).modalContent}>
                                <TouchableOpacity style={ModalMiddlenStyles(theme, typeTheme).header} onPress={onClose}>
                                    {
                                        title ?
                                            <CustomText style={ModalMiddlenStyles(theme, typeTheme).title}>{title}</CustomText> : <CustomText></CustomText>
                                    }
                                    <Icon name="close-outline" size={hp("4%")} color={iconColor} />
                                </TouchableOpacity>
                                <View style={ModalMiddlenStyles(theme, typeTheme).modalChildren}>
                                    {children}
                                </View>
                            </View>
                        </View>
                    </View>
                    :
                    <BlurView
                        style={StyleSheet.absoluteFill}
                        blurType="light"
                        blurAmount={5}
                    >
                        <View style={ModalMiddlenStyles(theme, typeTheme).ModalMiddle}>
                            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                                
                                <View style={ModalMiddlenStyles(theme, typeTheme).modalContent}>
                                    <TouchableOpacity style={ModalMiddlenStyles(theme, typeTheme).header} onPress={onClose}>
                                        {
                                            title ?
                                                <CustomText style={ModalMiddlenStyles(theme, typeTheme).title}>{title}</CustomText> : <CustomText></CustomText>
                                        }
                                        <Icon name="close-outline" size={hp("4%")} color={iconColor} />
                                    </TouchableOpacity>
                                    <View style={ModalMiddlenStyles(theme, typeTheme).modalChildren}>
                                        {children}
                                    </View>
                                </View>
                            </KeyboardAvoidingView>
                        </View>
                    </BlurView>
            }
        </Modal>

    );
};

export default ModalMiddle;
