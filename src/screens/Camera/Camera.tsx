import React, { useContext, useEffect, useRef, useState } from 'react';

import { View, StyleSheet, ViewStyle, TouchableOpacity, Vibration, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

import ModalBottom from '../../components/Modals/ModalBottom';
import ModalComplete from '../../components/Modals/ModalComplete';
import { ProductDetails } from '../../components/Modals/ModalRenders/ProductDetails';
import { ScannerResult } from '../../components/Modals/ModalRenders/ScannerResult';
import { getProductByCodeBar } from '../../services/products';
import PorductInterface from '../../interface/product';
import ModalMiddle from '../../components/Modals/ModalMiddle';
import { ProductFindByCodeBar } from '../../components/Modals/ModalRenders/ProductFindByCodeBar';
import { ProductFindByCodebarInput } from '../../components/Modals/ModalRenders/ProductFindByCodebarInput';
import { colores } from '../../theme/appTheme';
import { AuthContext } from '../../context/auth/AuthContext';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { BlurView } from '@react-native-community/blur';
import { Barcode, CameraHighlights, useBarcodeScanner } from '@mgcrea/vision-camera-barcode-scanner';
import Scan from '../../assets/scan.svg';

const CustomCamera: React.FC = () => {

    const { updateBarCode, user } = useContext(AuthContext);
    const { vibration } = useContext(SettingsContext);

    console.log({user: JSON.stringify(user, null, 2)})
    const [isScannerActive, setIsScannerActive] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
    const [isScanningAllowed, setIsScanningAllowed] = useState(true)

    const [lightOn, setLightOn] = useState(false)

    const [productsScanned, setProductsScanned] = useState<PorductInterface[]>()
    const [productSelected, setProductSelected] = useState<PorductInterface>()

    const [openModalProductDetails, setOpenModalProductDetails] = useState(false);
    const [openModalProductFoundByCodebar, setOpenModalProductFoundByCodebar] = useState(false);
    const [openModalScannerResult, setOpenModalScannerResult] = useState(false);
    const [openModalFindByCodebarInput, setOpenModalFindByCodebarInput] = useState(false);

    // Close modals.
    const handleCloseProductModalScanned = () => {
        setOpenModalScannerResult(false);
        setProductSelected(undefined);
        setProductsScanned(undefined);
        setIsScanningAllowed(true);
    }

    const handleCloseModalProductsFoundByCodebar = () => {
        setOpenModalProductFoundByCodebar(false);
        setProductsScanned(undefined)
        setIsScanningAllowed(true)
    }


    const handleCloseModalFindByBarcodeInput = () => {
        setOpenModalFindByCodebarInput(false);
    }

    const handleModalProductDetails = () => {
        handleCloseProductModalScanned();
        setOpenModalProductDetails(!openModalProductDetails);
        setProductSelected(undefined);
    }

    const handleOpenProductsFoundByCodebar = (response: PorductInterface[]) => {
        handleCloseModalFindByBarcodeInput();

        if (response.length > 0) {
            setOpenModalProductFoundByCodebar(true)
        } else {
            setOpenModalScannerResult(true)
        }

        setProductsScanned(response);
    }

    const handleSelectProduct = (product: PorductInterface) => {
        setProductSelected(product);
        setOpenModalProductFoundByCodebar(false);
        setOpenModalScannerResult(true);
    }

    const handleVibrate = () => {
        if (vibration) {
            Vibration.vibrate(500);
        }
    };
    const onFaceDetected = Worklets.createRunInJsFn(async (codes: Barcode[]) => {

        if (!productsScanned && codes.length > 0) {
            setIsScanningAllowed(false);
            const scannedCode = codes[0];
            const codeValue = scannedCode.value;

            if (!codeValue) return;

            try {
                const response = await getProductByCodeBar(codeValue);
                handleOpenProductsFoundByCodebar(response);
                handleVibrate()
                if (response.length < 1) {
                    updateBarCode(codeValue)
                }
                console.log(`Scanned code value: ${codeValue}`);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setTimeout(() => {
                }, 2000);
            }
        }
    })

    const { props: cameraProps, highlights } = useBarcodeScanner({
        fps: 5,
        barcodeTypes: ["qr", "ean-13", "code-128"], // optional
        
        onBarcodeScanned: (barcodes) => {
            "worklet";
            onFaceDetected(barcodes)
        },
    });
    const devices = useCameraDevices();
    const backCamera = devices.find((device) => device.position === 'back');


    useEffect(() => {
        setIsScannerActive(selectedDevice !== null);
    }, [selectedDevice]);

    useEffect(() => {
        setSelectedDevice(backCamera?.id || null);
    }, []);


    return (
        <View style={styles.cameraScreen}>
            <View style={styles.content}>
                {
                    (backCamera) &&
                    <>
                        <Camera
                            style={styles.camera}
                            device={backCamera}
                            torch={lightOn ? "on" : "off"}
                            isActive={
                                isScanningAllowed === false ? false :
                                    selectedDevice !== null
                            }
                            {...cameraProps}
                        />
                        <CameraHighlights highlights={highlights} color={colores.color_red} />
                    </>
                }

                <View style={styles.flash}>
                    <TouchableOpacity onPress={() => setLightOn(!lightOn)}>
                        <Icon name={lightOn ? "flash" : "flash-outline"} size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.message}>
                    <Text style={styles.textmessage}>Escanea un código de barras para agregarlo al inventario.</Text>
                </View>

                <View style={styles.scanSvgContainer}>
                    <Scan width={300} height={300} />
                </View>

                <View style={styles.scannerOptions}>
                    <BlurView style={styles.option} blurType="light" blurAmount={20}>
                        <View style={styles.optionContent}>
                            <TouchableOpacity onPress={() => setOpenModalFindByCodebarInput(true)}>
                                <Icon name="barcode-outline" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </BlurView>
                </View>
            </View>


            {/* PRODUCTS FOUND BY INPUT */}
            <ModalMiddle
                visible={openModalFindByCodebarInput}
                onClose={handleCloseModalFindByBarcodeInput}
            >
                <ProductFindByCodebarInput
                    handleOpenProductsFoundByCodebar={handleOpenProductsFoundByCodebar}
                />
            </ModalMiddle>

            {/* PRODUCTS FOUND BY CODEBAR */}
            <ModalMiddle
                visible={openModalProductFoundByCodebar}
                onClose={handleCloseModalProductsFoundByCodebar}
            >
                <ProductFindByCodeBar
                    products={productsScanned as PorductInterface[]}
                    onClick={handleSelectProduct}
                />
            </ModalMiddle>

            {/* SCANNER RESULT MODAL */}
            <ModalBottom
                visible={openModalScannerResult}
                onClose={handleCloseProductModalScanned}
            >
                <ScannerResult
                    onClose={handleCloseProductModalScanned}
                    product={productSelected as PorductInterface}
                    handleSelectFindByCode={() => setOpenModalFindByCodebarInput(true)}
                    fromInput={true}
                />
            </ModalBottom>

            {/* PRODUCT DETAIL MODAL */}
            <ModalComplete
                visible={openModalProductDetails}
                onClose={handleModalProductDetails}
            >
                <ProductDetails />
            </ModalComplete>
        </View>
    );
};

export default CustomCamera;


const styles = StyleSheet.create({
    cameraScreen: {
        flex: 1,
        backgroundColor: colores.background_color,
        justifyContent: "center",
        alignItems: "center"
    },
    content: {
        flex: 1,
        width: "100%",
        height: "100%",
        borderEndEndRadius: 20,
        borderEndStartRadius: 20,
        overflow: "hidden"
    },
    camera: {
        flex: 1,
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0
    },
    scannerOptions: {
        display: "flex",
        flexDirection: "row",
        position: "absolute",
        bottom: "10%",
        right: "7.5%",
        padding: 5,
    },
    option: {
        borderRadius: 30,
        padding: 5,
    },
    optionContent: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "black"
    },
    message: {
        position: "absolute",
        top: "25%",
        left: "25%",
        width: "50%",
        display: "flex",
        alignItems: "center",
        textAlign: 'center'
    },
    textmessage: {
        color: colores.text_color_secondary,
        display: "flex",
        alignItems: "center",
        textAlign: 'center'
    },
    scanSvgContainer: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -150 }, { translateY: -150 }]
    },
    flash: {
        position: "absolute",
        right: "7.5%",
        top: 100
    }
})


