import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Image, Button, TouchableOpacity } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/Ionicons';

interface ModalBottomInterface {
    visible: boolean;
    scannedCodes?: string;
    onClose: () => void;
}

const ModalBottom = ({
    visible,
    scannedCodes,
    onClose
}: ModalBottomInterface) => {

    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                //setModalVisible(!modalVisible);
            }}>
            <BlurView
                style={StyleSheet.absoluteFill}
                blurType="light"
                blurAmount={5}
            >
                <View style={styles.modalBottom}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.header} onPress={onClose}>
                            <Icon name="close-circle-outline" size={30} color="gray" />
                        </TouchableOpacity>

                        <View style={styles.product}>
                            <View style={styles.productText}>
                                <Image
                                    style={styles.productIcon}
                                    source={{
                                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                                    }}
                                />

                                <View style={styles.productMessage}>
                                    <Text>Codigo: </Text>
                                    <Text>{scannedCodes}</Text>
                                </View>
                            </View>

                            <Icon name="expand-outline" size={20} color="black" />

                        </View>

                        <View style={styles.counter}>
                            <Icon name="remove-circle-outline" size={35} color="black" />
                            <Text>1</Text>
                            <Icon name="add-circle-outline" size={35} color="black" />
                        </View>

                        <View>
                            <TouchableOpacity
                                style={styles.toogleButton}
                                onPress={onClose}
                            >
                                <Text style={styles.buttonText}>Agregar al inventario</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </BlurView>
        </Modal>

    );
};

const styles = StyleSheet.create({
    modalBottom: {
        flex: 1,
        justifyContent: "flex-end"
    },
    modalContent: {
        backgroundColor: 'white',
        paddingTop: 10,
        paddingRight: 20,
        paddingBottom: 15,
        paddingLeft: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "100%",
        height: "30%"
    },
    header: {
        width: "100%",
        top: 0,
        right: 0,
        paddingRight: 0,
        paddingBottom: 10,
        paddingLeft: 0,
        display: "flex",
        alignItems: "flex-end",
    },
    product: {
        display: "flex",
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 25
    },
    productText: {
        display: "flex",
        alignItems: 'center',
        flexDirection: "row"
    },
    productMessage: {
        marginLeft: 10
    },
    productIcon: {
        width: 50,
        height: 50,
    },
    counter: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 25
    },
    toogleButton: {
        backgroundColor: "blue",
        width: "100%",
        color: "white",
        borderRadius: 5,
        marginBottom: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
        display: "flex",
        textAlign: "center"
    },
});

export default ModalBottom;