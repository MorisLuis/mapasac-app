import React, { useContext, useState } from 'react';

import { View, StyleSheet, Vibration, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { colores, globalFont, globalStyles } from '../theme/appTheme';
import { SettingsContext } from '../context/settings/SettingsContext';
import { buttonStyles } from '../theme/UI/buttons';
import { updateCostos } from '../services/costos';
import { useNavigation } from '@react-navigation/native';
import PorductInterface from '../interface/product';
import { Camera } from 'react-native-camera-kit';
import { getProductByCodeBar } from '../services/products';
import codebartypes from '../utils/codebarTypes.json';

interface CameraModalInterface {
    productDetails: PorductInterface;
    onClose: () => void
}

const CameraModal = ({ productDetails, onClose }: CameraModalInterface) => {

    const { vibration, updateBarCode, codebarType, codeBar } = useContext(SettingsContext);
    const navigation = useNavigation<any>();

    const [isScanningAllowed, setIsScanningAllowed] = useState(true);
    const [codeIsScanning, setCodeIsScanning] = useState(false);
    const [productExistent, setProductExistent] = useState(false);
    const [codebarTest, setCodebarTest] = useState(true);
    const currentType = codebartypes.barcodes.find((code: any) => code.id === codebarType)
    const regex = new RegExp(currentType?.regex as string);

    const handleVibrate = () => {
        if (vibration) {
            Vibration.vibrate(500);
        }
    };

    const codeScanned = async ({ codes }: any) => {

        if (!regex.test(codes)) {
            setCodebarTest(false)
        }


        setCodeIsScanning(true)
        if (codes.length > 0 && isScanningAllowed) {
            setIsScanningAllowed(false);
            const codeValue = codes;
            if (!codeValue) return;
            try {
                const response = await getProductByCodeBar({ codeBar: codeValue });
                handleVibrate()
                updateBarCode(codeValue)
                if (response.length > 0) {
                    setProductExistent(true)
                }
            } catch (error) {
                setCodebarTest(true)
                console.error('Error fetching product:', error);
            } finally {
                setTimeout(() => {
                    setIsScanningAllowed(true);
                }, 2000);
            }
        }
        setCodeIsScanning(false);
    }

    const hanldeUpdateCodebarWithCodeRandom = async () => {
        if (!productDetails) return;

        await updateCostos({
            codigo: productDetails?.Codigo,
            Id_Marca: productDetails?.Id_Marca,
            body: {
                CodBar: codeBar
            }
        })
        onClose();
        navigation.goBack();
    }

    const handleTryAgain = () => {
        updateBarCode("")
        setProductExistent(false)
    }

    return (
        <View style={styles.cameraScreen}>
            {
                !productExistent ?
                    <>
                        <View style={styles.header}>
                            <Text style={styles.header_title}>Escanea el codigo</Text>
                            {
                                (codeBar && !codebarTest) ?
                                    <Text style={styles.header_message}>
                                        Revisa el tipo de codigo de barras requerido, cambiar si asi lo deseas.
                                    </Text>
                                    : (codeBar && !codeIsScanning) ?
                                        <Text style={styles.header_message}>
                                            Asegurate que es el codigo que deseas asignarle a este producto.
                                        </Text>
                                        :
                                        <View >
                                            <Text>Escanea el codigo que le pondras a este producto.</Text>
                                            <Text style={styles.header_message_scanner}>Actualmente el codigo de barras es tipo: {currentType?.type}.</Text>
                                        </View>
                            }
                        </View>

                        {
                            (!codeBar && codeIsScanning) ?
                                <ActivityIndicator
                                    size={50}
                                    color="black"
                                />
                                :
                                (!codeBar && !codeIsScanning) ?
                                    <View style={styles.content}>
                                        <Camera
                                            scanBarcode={true}
                                            onReadCode={(event: any) => codeScanned({ codes: event.nativeEvent.codeStringValue })}
                                            style={styles.camera}
                                        />
                                    </View>
                                    :
                                    (codeBar && !codeIsScanning && !codebarTest) ?
                                        <View>
                                            <Text style={styles.warningMessage}>{currentType?.errorMessage}</Text>
                                            <TouchableOpacity style={[buttonStyles.button_small, { marginBottom: globalStyles.globalMarginBottom.marginBottom }]} onPress={handleTryAgain}>
                                                <Text style={buttonStyles.buttonTextSecondary}>Intentar de nuevo</Text>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        <>
                                            <View style={styles.codebarFound}>
                                                <Text style={styles.textcodebarFound}>{codeBar}</Text>
                                            </View>

                                            <TouchableOpacity style={[buttonStyles.button_small, { marginBottom: globalStyles.globalMarginBottom.marginBottom }]} onPress={hanldeUpdateCodebarWithCodeRandom}>
                                                <Text style={buttonStyles.buttonTextSecondary}>Asignar codigo de barras</Text>
                                            </TouchableOpacity>
                                        </>
                        }
                    </>
                    :
                    <>
                        <View style={styles.header}>
                            <Text style={styles.header_title}>Producto encontrado</Text>
                            <Text style={styles.header_message}>
                                Se encontro un producto con el codigo de barras: {codeBar}
                            </Text>
                        </View>

                        <TouchableOpacity style={[buttonStyles.button_small, { marginBottom: globalStyles.globalMarginBottom.marginBottom }]} onPress={handleTryAgain}>
                            <Text style={buttonStyles.buttonTextSecondary}>Intentar de nuevo</Text>
                        </TouchableOpacity>
                    </>
            }

        </View>
    );
};

export default CameraModal;


const styles = StyleSheet.create({
    cameraScreen: {
        //backgroundColor: "red"
    },
    content: {
        display: "flex",
        flexDirection: "row",
        height: 200,
        width: "100%",
        marginBottom: globalStyles.globalMarginBottom.marginBottom,
        borderRadius: 10,
        overflow: "hidden"
    },
    camera: {
        width: "100%",
        backgroundColor: "black"
    },
    header: {
        marginBottom: globalStyles.globalMarginBottom.marginBottom
    },
    header_title: {
        fontSize: globalFont.font_med,
        fontWeight: "bold",
        marginBottom: globalStyles.globalMarginBottomSmall.marginBottom
    },
    header_message: {
        fontSize: globalFont.font_normal
    },
    header_message_scanner: {
        fontSize: globalFont.font_sm
    },
    codebarFound: {
        marginBottom: globalStyles.globalMarginBottom.marginBottom,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    textcodebarFound: {
        fontWeight: 'bold',
        fontSize: globalFont.font_normal
    },
    warningMessage: {
        paddingBottom: globalStyles.globalPadding.padding,
        fontSize: globalFont.font_normal,
        color: colores.color_red
    }
})


