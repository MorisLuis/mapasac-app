import React, { useContext, useEffect, useState } from 'react';

import { View, StyleSheet, ViewStyle, Text, Touchable, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Camera, useCameraDevices, useCodeScanner } from 'react-native-vision-camera';
import ModalBottom from '../../components/Modals/ModalBottom';
import ModalComplete from '../../components/Modals/ModalComplete';
import { ProductDetails } from '../../components/Modals/ModalRenders/ProductDetails';
import { ScannerResult } from '../../components/Modals/ModalRenders/ScannerResult';
import { SafeAreaView } from 'react-native-safe-area-context';
import { InventoryBag } from '../../components/Modals/ModalRenders/InventoryBag';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';

const CustomCamera: React.FC = () => {
    const [scannedCodes, setScannedCodes] = useState<string | undefined>();
    const [isScannerActive, setIsScannerActive] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
    const { numberOfItems } = useContext(InventoryBagContext)

    const [openModalProductDetails, setOpenModalProductDetails] = useState(false);
    const [openModalBagInventory, setOpenModalBagInventory] = useState(false);

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

    const handleModalProductDetails = () => {
        handleCloseProductModalScanned();
        setOpenModalProductDetails(!openModalProductDetails);
    }

    const handleCloseModalBagInventory = () => {
        setOpenModalBagInventory(false)
    }

    useEffect(() => {
        setIsScannerActive(selectedDevice !== null); // Actualizar el estado del scanner cuando la cámara está activa
    }, [selectedDevice]);

    useEffect(() => {
        setSelectedDevice(backCamera?.id || null);
    }, [])


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

                <SafeAreaView style={styles.bagContent} >
                    <TouchableOpacity style={styles.bag} onPress={() => setOpenModalBagInventory(true)}>
                        <Text style={styles.bagNumber}>{numberOfItems}</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>

            {/* SCANNER RESULT MODAL */}
            <ModalBottom
                visible={scannedCodes ? true : false}
                onClose={handleCloseProductModalScanned}
            >
                <ScannerResult
                    scannedCodes={scannedCodes}
                    onClose={handleCloseProductModalScanned}
                />
            </ModalBottom>

            {/* PRODUCT DETAIL MODAL */}
            <ModalComplete
                visible={openModalProductDetails}
                onClose={handleModalProductDetails}
            >
                <ProductDetails
                    scannedCodes={scannedCodes}
                />
            </ModalComplete>

            {/* BAG INVENTORY MODAL */}
            <ModalComplete
                visible={openModalBagInventory}
                onClose={handleCloseModalBagInventory}
            >
                <InventoryBag
                    onClose={handleCloseModalBagInventory}
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
        flex: 1,
        width: "100%",
        height: "100%",
        borderEndEndRadius: 20, 
        borderEndStartRadius:20,
        overflow: "hidden"
    },
    camera: {
        flex: 1,
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0
    },
    iconStyle: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -125 }, { translateY: -150 }],
    } as ViewStyle,
    bagContent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        position: "absolute",
        top: 0,
        right: 0,
        paddingHorizontal: 10,
    },
    bag: {
        backgroundColor: "#EDBD42",
        width: 35,
        height: 35,
        borderRadius: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "black",
        borderWidth: 1
    },
    bagNumber: {
        color: "white"
    }
})