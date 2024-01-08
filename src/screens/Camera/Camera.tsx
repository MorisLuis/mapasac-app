import React, { useState } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Camera, useCameraDevices, useCodeScanner } from 'react-native-vision-camera';
import { ScannerCodeCard } from '../../components/Cards/ScannerCodeCard';
import ModalBottom from '../../components/Modals/ModalBottom';

const CustomCamera: React.FC = () => {
    const [scannedCodes, setScannedCodes] = useState<string | undefined>();
    const [isScannerActive, setIsScannerActive] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

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

    const toggleScanner = () => {
        setIsScannerActive((prev) => !prev);
    };

    const handleCameraOpen = () => {
        setSelectedDevice(backCamera?.id || null);
    };

    const handleCloseProductModalScanned = () => {
        setScannedCodes(undefined)
    }

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

                {
                    !selectedDevice &&
                    <TouchableOpacity
                        style={styles.toogleButton}
                        onPress={handleCameraOpen}
                    >
                        <Text style={styles.buttonText}>Abrir cámara</Text>
                    </TouchableOpacity>
                }

                <TouchableOpacity
                    style={styles.toogleButton}
                    onPress={toggleScanner}
                >
                    <Text style={styles.buttonText}>Escanear</Text>
                </TouchableOpacity>

            </View>
            <ModalBottom
                visible={scannedCodes ? true : false}
                scannedCodes={scannedCodes}
                onClose={handleCloseProductModalScanned}
            />
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
        //position: "relative"
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