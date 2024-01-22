import React, { useContext, useEffect, useState } from 'react';

import { View, StyleSheet, ViewStyle, Text, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Camera, useCameraDevices, useCodeScanner } from 'react-native-vision-camera';
import { SafeAreaView } from 'react-native-safe-area-context';

import ModalBottom from '../../components/Modals/ModalBottom';
import ModalComplete from '../../components/Modals/ModalComplete';
import { ProductDetails } from '../../components/Modals/ModalRenders/ProductDetails';
import { ScannerResult } from '../../components/Modals/ModalRenders/ScannerResult';
import { InventoryBag } from '../../components/Modals/ModalRenders/InventoryBag';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';
import { getProductByCodeBar } from '../../services/products';
import PorductInterface from '../../interface/product';
import ModalMiddle from '../../components/Modals/ModalMiddle';
import { ProductFindByCodeBar } from '../../components/Modals/ModalRenders/ProductFindByCodeBar';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';  // Importa las funciones necesarias para solicitar permisos

const CustomCamera: React.FC = () => {

    const [isScannerActive, setIsScannerActive] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
    const [isScanningAllowed, setIsScanningAllowed] = useState(true)
    const { numberOfItems } = useContext(InventoryBagContext);

    const [productsScanned, setProductsScanned] = useState<PorductInterface[]>()
    const [productSelected, setProductSelected] = useState<PorductInterface>()

    const [openModalProductDetails, setOpenModalProductDetails] = useState(false);
    const [openModalBagInventory, setOpenModalBagInventory] = useState(false);
    const [openModalProductFoundByCodebar, setOpenModalProductFoundByCodebar] = useState(false);
    const [openModalScannerResult, setOpenModalScannerResult] = useState(false);

    const handleCloseProductModalScanned = () => {
        setOpenModalScannerResult(false);
        setProductSelected(undefined);
        setProductsScanned(undefined);
    }

    const handleCloseModalProductsFoundByCodebar = () => {
        setOpenModalProductFoundByCodebar(false);
        setProductsScanned(undefined)
    }

    const handleCloseModalBagInventory = () => {
        setOpenModalBagInventory(false)
    }

    const handleModalProductDetails = () => {
        handleCloseProductModalScanned();
        setOpenModalProductDetails(!openModalProductDetails);
        setProductSelected(undefined);
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

                    if( response.length > 1 ) {
                        setOpenModalProductFoundByCodebar(true)
                    } else {
                        setOpenModalScannerResult(true)
                    }

                    setProductsScanned(response);
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

    const [permission, setPermission] = useState(false)

    useEffect(() => {
        // Verificar y solicitar permisos al cargar el componente
        const requestCameraPermission = async () => {
            try {
                let permission;
                console.log(Platform.OS)
                if (Platform.OS === 'android') {
                    const result = await request(PERMISSIONS.ANDROID.CAMERA);
                    permission = result === RESULTS.GRANTED;
                } else if (Platform.OS === 'ios') {
                    const result = await request(PERMISSIONS.IOS.CAMERA);
                    permission = result === RESULTS.GRANTED;
                }
    
                if (permission) {
                    // Permiso concedido, puedes iniciar la cámara aquí.
                    setSelectedDevice(backCamera?.id || null);
                    setPermission(true);
                } else {
                    // Permiso denegado, maneja esta situación.
                    console.log('Permiso de cámara denegado');
                }
            } catch (error) {
                console.error('Error al solicitar permiso de cámara:', error);
            }
        };
    
        requestCameraPermission();
    }, []);


    return (
        <View style={styles.cameraScreen}>
            <View style={styles.content}>
                {
                    (backCamera && permission) &&
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
                <ProductDetails/>
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


