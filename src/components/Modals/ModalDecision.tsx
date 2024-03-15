import React from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Text } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/Ionicons';
import { colores, globalFont, globalStyles } from '../../theme/appTheme';

interface ModalDecisionInterface {
    visible: boolean;
    children: any;
    message: string
}

const ModalDecision = ({
    visible,
    children,
    message
}: ModalDecisionInterface) => {

    const handleDismissKeyboard = () => {
        Keyboard.dismiss();
    };


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <BlurView style={StyleSheet.absoluteFill} blurType="dark" blurAmount={1}>
                <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
                    <View style={styles.ModalDecision}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        >
                            <View style={styles.modalContent}>
                                <Text style={styles.message}>{message}</Text>
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

export default ModalDecision;

const styles = StyleSheet.create({
    ModalDecision: {
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
        padding: globalStyles.globalPadding.padding,
        marginBottom: globalStyles.globalMarginBottom.marginBottom
    },
    message:{
        fontSize: globalFont.font_med,
        paddingHorizontal: globalStyles.globalPadding.padding,
        paddingTop:  globalStyles.globalPadding.padding,
        width: "85%",
    }
});

