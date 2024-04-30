import React from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Text } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/Ionicons';
import { colores, globalStyles } from '../../theme/appTheme';

interface ModalBottomInterface {
    visible: boolean;
    onClose: () => void;
    children: any;

    blurNotAvailable?: boolean;
    blurType?: any;
    blurAmount?: number
}

const ModalBottom = ({
    visible,
    onClose,
    children,

    blurNotAvailable = false,
    blurType = "light",
    blurAmount = 5
}: ModalBottomInterface) => {

    const handleDismissKeyboard = () => {
        Keyboard.dismiss();
    };


    const render = () => {
        return (
            <TouchableWithoutFeedback onPress={handleDismissKeyboard}>


                <View style={styles.modalBottom}>

                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    >
                        {/* <View
                            style={{
                                backgroundColor: "#EDBD42",
                                width: "100%",
                                height: 100,
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                position: "absolute",
                                top: -60,
                                left: 0,
                                zIndex: -1,
                                padding: 20
                            }}
                        >
                            <Text>Ya has agregado 20 piezas a este producto.</Text>
                        </View> */}

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
        )
    }


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}

        >
            {
                blurNotAvailable ?
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        {render()}
                    </View>
                    :
                    <BlurView style={StyleSheet.absoluteFill} blurType={blurType} blurAmount={blurAmount}>
                        {render()}
                    </BlurView>
            }
        </Modal>
    );
};

export default ModalBottom;

const styles = StyleSheet.create({
    modalBottom: {
        flex: 1,
        justifyContent: "flex-end",
        position: 'relative',
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

