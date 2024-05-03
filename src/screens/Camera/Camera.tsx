import React, { useContext, useEffect, useState } from 'react';
import { View, TouchableOpacity, Vibration, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { Barcode, CameraHighlights, useBarcodeScanner } from '@mgcrea/vision-camera-barcode-scanner';
import { BlurView } from '@react-native-community/blur';
import ModalBottom from '../../components/Modals/ModalBottom';
import ModalMiddle from '../../components/Modals/ModalMiddle';
import { ProductFindByCodeBar } from '../../components/Modals/ModalRenders/ProductFindByCodeBar';
import { SearchCodebarWithInput } from '../../components/Modals/ModalRenders/SearchCodebarWithInput';
import { getProductByCodeBar } from '../../services/products';
import { AuthContext } from '../../context/auth/AuthContext';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { colores } from '../../theme/appTheme';
import { cameraStyles } from '../../theme/CameraCustumTheme';
import Scan from '../../assets/scan.svg';
import PorductInterface from '../../interface/product';
import { ScannerResult } from '../../components/Modals/ModalRenders/ScannerResult';
import UserInterface from '../../interface/user';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';


const CustomCamera: React.FC = () => {

    const { updateBarCode, user } = useContext(AuthContext);
    const { vibration, cameraAvailable, handleCameraAvailable, limitProductsScanned } = useContext(SettingsContext);
    const { bag } = useContext(InventoryBagContext);

    const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
    const [lightOn, setLightOn] = useState(false);
    const onTheLimitProductScanned = limitProductsScanned === bag?.length;

    const [productsScanned, setProductsScanned] = useState<PorductInterface[]>()
    const [productSelected, setProductSelected] = useState<PorductInterface>()

    const [openModalProductFoundByCodebar, setOpenModalProductFoundByCodebar] = useState(false);
    const [openModalScannerResult, setOpenModalScannerResult] = useState(false);
    const [openModalFindByCodebarInput, setOpenModalFindByCodebarInput] = useState(false);

    // Close modals.
    const handleCloseProductModalScanned = () => {
        console.log("handleCloseProductModalScanned")
        setOpenModalScannerResult(false);
        setProductSelected(undefined);
        setProductsScanned(undefined);
        handleCameraAvailable(true)
    }

    const handleCloseModalProductsFoundByCodebar = () => {
        setOpenModalProductFoundByCodebar(false);
        setProductsScanned(undefined)
        handleCameraAvailable(true)
    }

    const handleCloseModalFindByBarcodeInput = (cameraAvailable?: boolean) => {
        setOpenModalFindByCodebarInput(false);
        handleCameraAvailable(cameraAvailable === false ? cameraAvailable : true);
    }

    // Other functions.
    const handleOpenProductsFoundByCodebar = (response: PorductInterface[]) => {
        handleCloseModalFindByBarcodeInput(false);

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

    const handleOpenInputModal = () => {
        handleCameraAvailable(false);
        setOpenModalFindByCodebarInput(true);
    }

    const onCodeDetected = Worklets.createRunInJsFn(async (codes: Barcode[]) => {

        if (!productsScanned && codes?.length > 0) {
            handleCameraAvailable(false)
            const scannedCode = codes?.[0];
            const codeValue = scannedCode.value;

            if (!codeValue) return;

            try {
                const response = await getProductByCodeBar(codeValue);
                handleOpenProductsFoundByCodebar(response);
                handleVibrate()
                if (response.length < 1) updateBarCode(codeValue)
                console.log(`Scanned code value: ${codeValue}`);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        }
    })

    const { props: cameraProps, highlights } = useBarcodeScanner({
        fps: 5,
        barcodeTypes: ["qr", "ean-13", "code-128"],
        onBarcodeScanned: (barcodes) => {
            "worklet";
            onCodeDetected(barcodes);
        },
    });

    const devices = useCameraDevices();
    const backCamera = devices.find((device) => device.position === 'back');
    const dynamicCameraProps = onTheLimitProductScanned ? {} : cameraProps;

    useEffect(() => {
        if (!user) return;
        getTypeOfMovementsName(user)
    }, [user])

    useEffect(() => {
        setSelectedDevice(backCamera?.id || null);
    }, []);

    if (!backCamera) return null;

    return (
        <View style={cameraStyles.cameraScreen}>
            <View style={cameraStyles.content}>
                {
                    onTheLimitProductScanned &&
                    <BlurView
                        style={cameraStyles.blurOverlay}
                        blurType="dark"
                        blurAmount={5}
                    />
                }

                <Camera
                    style={cameraStyles.camera}
                    device={backCamera}
                    torch={lightOn ? "on" : "off"}
                    isActive={
                        cameraAvailable || false
                    }
                    {...dynamicCameraProps}
                />

                {
                    !onTheLimitProductScanned &&
                    <CameraHighlights highlights={highlights} color={colores.color_red} />
                }

                <View style={cameraStyles.flash}>
                    <TouchableOpacity onPress={() => setLightOn(!lightOn)}>
                        <Icon name={lightOn ? "flash" : "flash-outline"} size={24} color="white" />
                    </TouchableOpacity>
                </View>


                <View style={cameraStyles.message}>
                    {
                        onTheLimitProductScanned ?
                            <Text style={cameraStyles.textmessage}>Es necesario subir el inventario para seguir escaneando.</Text>
                            :
                            <Text style={cameraStyles.textmessage}>Escanea un código de barras para agregarlo {getTypeOfMovementsName()}</Text>
                    }
                </View>

                <View style={cameraStyles.scanSvgContainer}>
                    <Scan width={300} height={300} />
                </View>

                <View style={cameraStyles.scannerOptions}>
                    <BlurView style={cameraStyles.option} blurType="light" blurAmount={20}>
                        <View style={cameraStyles.optionContent}>
                            <TouchableOpacity onPress={handleOpenInputModal}>
                                <Icon name="barcode-outline" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </BlurView>
                </View>
            </View>


            {/* SEARCH PRODUCT WITH INPUT */}
            <ModalMiddle
                visible={openModalFindByCodebarInput}
                onClose={handleCloseModalFindByBarcodeInput}
            >
                <SearchCodebarWithInput
                    handleOpenProductsFoundByCodebar={handleOpenProductsFoundByCodebar}
                />
            </ModalMiddle>

            {/* LIST OF PRODUCTS FOUND BY CODEBAR */}
            <ModalMiddle
                visible={openModalProductFoundByCodebar}
                onClose={handleCloseModalProductsFoundByCodebar}
            >
                <ProductFindByCodeBar
                    products={productsScanned as PorductInterface[]}
                    onClick={handleSelectProduct}
                />
            </ModalMiddle>

            {/* SCANNER RESULT - MODAL */}
            <ModalBottom
                visible={openModalScannerResult}
                //visible={true}
                onClose={handleCloseProductModalScanned}
            >
                <ScannerResult
                    onClose={handleCloseProductModalScanned}
                    product={productSelected as PorductInterface}
                    handleSelectFindByCode={() => setOpenModalFindByCodebarInput(true)}
                    fromInput={true}
                />
            </ModalBottom>
        </View>
    );
};

export default CustomCamera;


const getTypeOfMovementsName = (user?: UserInterface) => {
    if (user) {
        const { Id_TipoMovInv } = user;
        if (Id_TipoMovInv?.Accion === 1 && Id_TipoMovInv?.Id_TipoMovInv === 0) {
            return "al Inventario";
        } else if (Id_TipoMovInv?.Accion === 1) {
            return "a la Entrada";
        } else if (Id_TipoMovInv?.Accion === 2) {
            return "a la Salida";
        } else {
            return "Traspaso";
        }
    }
    return "";
};