import React, { useEffect, useState } from 'react';

import { View, StyleSheet, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Camera, useCameraDevices, useCodeScanner } from 'react-native-vision-camera';
import ModalBottom from '../../components/Modals/ModalBottom';
import ModalComplete from '../../components/Modals/ModalComplete';
import { ProductDetails } from '../../components/Modals/ModalRenders/ProductDetails';
import { ScannerResult } from '../../components/Modals/ModalRenders/ScannerResult';

const CustomCamera: React.FC = () => {
    const [scannedCodes, setScannedCodes] = useState<string | undefined>();
    const [isScannerActive, setIsScannerActive] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
    const [openModalProductDetails, setOpenModalProductDetails] = useState(false);

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            if (codes.length > 0) {
                const scannedCode = codes[0]; // Obtener el primer código escaneado
                const codeValue = scannedCode.value; // Suponiendo que 'value' contiene el valor del código escaneado

                // Usar 'codeValue' para realizar alguna operación o mostrarlo en tu componente
                console.log(`Scanned code value: ${codeValue}`);
                setScannedCodes(codeValue)
            }
        }
    });

    const devices = useCameraDevices();
    const backCamera = devices.find((device) => device.position === 'back');

    const handleCloseProductModalScanned = () => {
        setScannedCodes(undefined)
    }

    const handleModalProductDetails = () =>  {
        handleCloseProductModalScanned();
        setOpenModalProductDetails(!openModalProductDetails);
    }

    useEffect(() => {
        setIsScannerActive(selectedDevice !== null); // Actualizar el estado del scanner cuando la cámara está activa
    }, [selectedDevice]);

    useEffect(() => {
        setSelectedDevice(backCamera?.id || null);
    }, [])

    console.log({openModalProductDetails})

    return (
        <View style={styles.cameraScreen}>
            <View style={styles.content}>
                {
                    backCamera &&
                    <Camera
                        style={styles.camera}
                        device={backCamera}
                        isActive={selectedDevice !== null}
                        codeScanner={isScannerActive ? codeScanner : undefined}
                    />
                }

                {
                    selectedDevice &&
                    <View style={styles.iconStyle} >
                        <Icon name="scan-outline" size={250} color="white" />
                    </View>
                }
            </View>

            <ModalBottom
                visible={scannedCodes ? true : false}
                onClose={handleCloseProductModalScanned}
            >
                <ScannerResult
                    scannedCodes={scannedCodes}
                    onClose={handleCloseProductModalScanned}
                    handleModalProductDetails={handleModalProductDetails}
                />
            </ModalBottom>

            <ModalComplete
                visible={openModalProductDetails}
                onClose={handleModalProductDetails}
            >
                <ProductDetails
                    scannedCodes={scannedCodes}
                />
            </ModalComplete>
        </View>
    );
};

export default CustomCamera;


const styles = StyleSheet.create({
    cameraScreen: {
        flex: 1,
        backgroundColor: "beige",
        justifyContent: "center",
        alignItems: "center"
    },
    content: {
        backgroundColor: "white",
        flex: 1,
        width: "100%",
        height: "100%",
    },
    camera: {
        flex: 1,
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0
    },
    toogleButton: {
        backgroundColor: "#0E1727",
        top: "80%",
        left: "25%",
        width: "50%",
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
    iconStyle: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -125 }, { translateY: -150 }],
    } as ViewStyle
})