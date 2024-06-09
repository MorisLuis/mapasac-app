import React from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/Ionicons';
import { colores } from '../../theme/appTheme';
import { Text } from 'react-native';

interface ModalCompleteInterface {
    visible: boolean;
    onClose: () => void;
    title?: string,
    children: any
}

const ModalComplete = ({
    visible,
    onClose,
    title,
    children
}: ModalCompleteInterface) => {

    return  (

        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
                <BlurView
                    style={StyleSheet.absoluteFill}
                    blurType="light"
                    blurAmount={5}
                >
                    <View style={styles.modalComplete}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity style={styles.header} onPress={onClose}>
                                <Icon name="close-outline" size={24} color="black" />
                                {
                                    title &&
                                    <Text style={styles.title}>{title}</Text>
                                }
                            </TouchableOpacity>
                            <View style={styles.modalChildren}>
                            {children}
                        </View>                        
                        </View>
                    </View>
                </BlurView>
        </Modal>

    );
};

export default ModalComplete;

const styles = StyleSheet.create({
    modalComplete: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: colores.background_color
    },
    modalContent: {
        backgroundColor: colores.background_color,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "100%",
        height: "90%"
    },
    modalChildren:{
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
        flexDirection: 'row-reverse',
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "transparent",
        borderBottomColor: colores.color_border,
    },
    title:{
        fontWeight: 'bold'
    }
});

