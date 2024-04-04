import React, { useContext, useEffect, useState } from 'react';

import { View, StyleSheet, Vibration, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Camera, useCameraDevices, useCodeScanner } from 'react-native-vision-camera';
import { globalFont, globalStyles } from '../theme/appTheme';
import { AuthContext } from '../context/auth/AuthContext';
import { SettingsContext } from '../context/settings/SettingsContext';
import { buttonStyles } from '../theme/UI/buttons';
import { updateCostos } from '../services/costos';
import { useNavigation } from '@react-navigation/native';
import PorductInterface from '../interface/product';
import { getProductByCodeBar } from '../services/products';

interface CameraModalInterface {
    productDetails: PorductInterface;
    onClose: () => void
}

const CameraModal = ({ productDetails, onClose }: CameraModalInterface) => {

    const { updateBarCode, codeBar } = useContext(AuthContext);
    const { vibration } = useContext(SettingsContext);
    const navigation = useNavigation<any>();

    const [isScannerActive, setIsScannerActive] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
    const [isScanningAllowed, setIsScanningAllowed] = useState(true);
    const [codeIsScanning, setCodeIsScanning] = useState(false);
    const [productExistent, setProductExistent] = useState(false)

    const handleVibrate = () => {
        if (vibration) {
            Vibration.vibrate(500);
        }
    };

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13', 'code-128'],
        onCodeScanned: async (codes) => {
            setCodeIsScanning(true)
            if (codes.length > 0 && isScanningAllowed) {
                setIsScanningAllowed(false);
                const scannedCode = codes[0];
                const codeValue = scannedCode.value;
                if (!codeValue) return;
                try {
                    const response = await getProductByCodeBar(codeValue);
                    handleVibrate()
                    updateBarCode(codeValue)
                    if (response.length > 0) {
                        setProductExistent(true)
                    }
                    console.log(`Scanned code value: ${codeValue}`);
                } catch (error) {
                    console.error('Error fetching product:', error);
                } finally {
                    setTimeout(() => {
                        setIsScanningAllowed(true);
                    }, 2000);
                }

            }
            setCodeIsScanning(false)
        }
    });

    const devices = useCameraDevices();
    const backCamera = devices.find((device) => device.position === 'back');

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

    useEffect(() => {
        setIsScannerActive(selectedDevice !== null);
    }, [selectedDevice]);

    useEffect(() => {
        setSelectedDevice(backCamera?.id || null);
    }, []);

    return (
        <View style={styles.cameraScreen}>

            {
                !productExistent ?
                    <>
                        <View style={styles.header}>
                            <Text style={styles.header_title}>Escanea el codigo</Text>
                            <Text style={styles.header_message}>
                                {
                                    !codeIsScanning && codeBar ?
                                        "Asegurate que es el codigo que deseas asignarle a este producto."
                                        :
                                        "Escanea el codigo que le pondras a este producto."
                                }
                            </Text>
                        </View>

                        {
                            (!codeIsScanning && !codeBar) ?
                                <View style={styles.content}>
                                    {
                                        (backCamera) &&
                                        <Camera
                                            style={styles.camera}
                                            device={backCamera}
                                            isActive={selectedDevice !== null}
                                            codeScanner={isScannerActive ? codeScanner : undefined}
                                        />
                                    }
                                </View>
                                : (codeIsScanning && !codeBar) ?
                                    <ActivityIndicator
                                        size={50}
                                        color="black"
                                    />
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
        fontWeight: "bold"
    },
    header_message: {
        fontSize: globalFont.font_normal
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
    }
})


