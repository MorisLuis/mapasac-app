import React, { useEffect, useState } from 'react';

import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Camera, useCameraDevices, useCodeScanner } from 'react-native-vision-camera';

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

const CustomCamera: React.FC = () => {

    const [isScannerActive, setIsScannerActive] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
    const [isScanningAllowed, setIsScanningAllowed] = useState(true)

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
    }

    const handleCloseModalProductsFoundByCodebar = () => {
        setOpenModalProductFoundByCodebar(false);
        setProductsScanned(undefined)
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

        if (response.length > 1) {
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

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13', 'code-128'],
        onCodeScanned: async (codes) => {
            if (codes.length > 0 && isScanningAllowed && !productsScanned) {
                setIsScanningAllowed(false);
                const scannedCode = codes[0];
                const codeValue = scannedCode.value;

                if (!codeValue) return;

                try {
                    const response = await getProductByCodeBar(codeValue);
                    handleOpenProductsFoundByCodebar(response);
                    console.log(`Scanned code value: ${codeValue}`);
                } catch (error) {
                    console.error('Error fetching product:', error);
                } finally {
                    setTimeout(() => {
                        setIsScanningAllowed(true);
                    }, 2000);
                }
            }
        }
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
                        <Icon name="scan-outline" size={300} color="white" />
                    </View>
                }

                <View style={styles.scannerOptions}>
                    <TouchableOpacity style={styles.option} onPress={() => setOpenModalFindByCodebarInput(true)}>
                        <Icon name="barcode-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>


            {/*  */}
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
    iconStyle: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -150 }, { translateY: -150 }]
    } as ViewStyle,
    bagContent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        position: "absolute",
        top: 20,
        right: 0,
        paddingHorizontal: 10,
    },
    bag: {
        backgroundColor: "gray",
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
    },
    scannerOptions: {
        display: "flex",
        flexDirection: "row",
        position: "absolute",
        bottom: "10%",
        right: "10%",
        //transform: [{ translateX: -35 }],
        backgroundColor:  colores.background_color,
        borderRadius: 100,
        padding: 5
    },
    option: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 7.5,
        backgroundColor:  colores.background_color,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "black"
    }

})


