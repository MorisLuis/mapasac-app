import React from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/Ionicons';
import { colores, globalStyles } from '../../theme/appTheme';

interface ModalBottomInterface {
    visible: boolean;
    onClose: () => void;
    children: any
}

const ModalBottom = ({
    visible,
    onClose,
    children
}: ModalBottomInterface) => {

    const handleDismissKeyboard = () => {
        Keyboard.dismiss();
    };


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <BlurView style={StyleSheet.absoluteFill} blurType="light" blurAmount={5}>
                <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
                    <View style={styles.modalBottom}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        >
                            <View style={styles.modalContent}>
                                <TouchableWithoutFeedback onPress={onClose}>
                                    <TouchableOpacity style={styles.header} onPress={onClose}>
                                        <Icon name="close-outline" size={24} color="black" />
                                    </TouchableOpacity>
                                </TouchableWithoutFeedback>
                                <View style={styles.modalChildren}>
                                    {children}
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </TouchableWithoutFeedback>
            </BlurView>
        </Modal>
    );
};

export default ModalBottom;

const styles = StyleSheet.create({
    modalBottom: {
        flex: 1,
        justifyContent: "flex-end"
    },
    modalContent: {
        backgroundColor: colores.background_color,
        shadowColor: colores.background_color_tertiary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "100%",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colores.color_border
    },
    modalChildren: {
        paddingTop: 10,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 20,
    },
    header: {
        width: "100%",
        top: 0,
        right: 0,
        paddingVertical: 10,
        paddingHorizontal: 20,
        display: "flex",
        alignItems: "flex-end",
        borderWidth: 1,
        borderColor: "transparent",
        borderBottomColor: colores.color_border,
        marginBottom: globalStyles.globalMarginBottom.marginBottom
    }
});

