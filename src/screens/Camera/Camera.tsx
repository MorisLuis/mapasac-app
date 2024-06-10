import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Text, Platform, StyleSheet, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Camera, Point } from 'react-native-vision-camera';
import { BlurView } from '@react-native-community/blur';
import { AuthContext } from '../../context/auth/AuthContext';
import { SettingsContext } from '../../context/settings/SettingsContext';
import PorductInterface from '../../interface/product';
import UserInterface from '../../interface/user';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';

import ModalMiddle from '../../components/Modals/ModalMiddle';
import { ProductFindByCodeBar } from '../../components/Modals/ModalRenders/ProductFindByCodeBar';
import { cameraStyles } from '../../theme/CameraCustumTheme';
import Scan from '../../assets/scan.svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { HightlightBox } from '../../components/HightlightBox';
import { cameraSettings } from './cameraSettings';
import { CameraPermission } from '../../components/screens/CameraPermission';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

type PermissionStatus = 'granted' | 'denied' | 'not-determined';

const CustomCamera: React.FC = () => {

    const { user } = useContext(AuthContext);
    const { cameraAvailable, handleCameraAvailable, limitProductsScanned } = useContext(SettingsContext);
    const { bag } = useContext(InventoryBagContext);


    const [lightOn, setLightOn] = useState(false);
    const onTheLimitProductScanned = limitProductsScanned < bag?.length;
    const [productsScanned, setProductsScanned] = useState<PorductInterface[]>()
    const [openModalProductFoundByCodebar, setOpenModalProductFoundByCodebar] = useState(false);
    const [cameraPermission, setCameraPermission] = useState<PermissionStatus | null>(null);
    const { navigate } = useNavigation<any>();
    const isFocused = useIsFocused();

    const handleCloseModalProductsFoundByCodebar = () => {
        setOpenModalProductFoundByCodebar(false);
        setProductsScanned(undefined)
        handleCameraAvailable(true)
    }

    const handleCloseModalFindByBarcodeInput = (cameraAvailable?: boolean) => {
        handleCameraAvailable(cameraAvailable === false ? cameraAvailable : true);
    }

    // Other functions.
    const handleOpenProductsFoundByCodebar = (response: PorductInterface[]) => {

        handleCloseModalFindByBarcodeInput(false);

        if (response.length === 1) {
            navigate('scannerResultScreen', { product: response[0] });
            setCodeScannerHighlights([]);
        } else if (response.length > 0) {
            setOpenModalProductFoundByCodebar(true)
        } else {
            setCodeScannerHighlights([]);
            navigate('scannerResultScreen', { product: response[0] });
        }

        setProductsScanned(response);
    }

    const handleSelectProduct = (product: PorductInterface) => {
        setCodeScannerHighlights([]);
        setOpenModalProductFoundByCodebar(false);

        setTimeout(() => {
            navigate('scannerResultScreen', { product: product });
        }, 500);
    }


    const handleOpenInputModal = () => {
        handleCameraAvailable(false);
        navigate('findByCodebarInputModal');
    }

    const {
        codeScanner,
        setCodeScannerHighlights,
        backCamera,
        format,
        codeScannerHighlights,
        onLayout,
        layout,
        scanFrame,
        Fps
    } = cameraSettings({
        setProductsScanned,
        productsScanned,
        handleOpenProductsFoundByCodebar
    })


    // Solicitar permisos de cámara
    const requestPermissions = async () => {
        const cameraStatus = await Camera.requestCameraPermission() as PermissionStatus;
        setCameraPermission(cameraStatus);
    };

    useEffect(() => {
        requestPermissions();
        return () => {
            handleCameraAvailable(false);
        };
    }, []);

    useEffect(() => {
        if (!user) return;
        getTypeOfMovementsName(user);
    }, [user]);

    useFocusEffect(
        useCallback(() => {
            handleCameraAvailable(true);
            return () => {
                handleCameraAvailable(false);
            };
        }, [])
    );

    useEffect(() => {
        if (!isFocused) {
            handleCameraAvailable(false);
        }
    }, [isFocused]);


    const camera = useRef<Camera>(null)

    const focus = useCallback((point: Point) => {
        const c = camera.current
        if (c == null) return
        c.focus(point)
    }, [])

    const gesture = Gesture.Tap().onEnd(({ x, y }: any) => { runOnJS(focus)({ x, y }) })


    if (cameraPermission === null) {
        return <CameraPermission requestPermissions={requestPermissions} message="Cargando..." />
    }

    if (cameraPermission !== 'granted') {
        return (
            <CameraPermission
                requestPermissions={requestPermissions}
                message="Permisos de cámara no concedidos."
                availableAuthorization={true}
            />
        )
    }

    if (!backCamera) {
        return (
            <CameraPermission
                requestPermissions={requestPermissions}
                message="No hay dispositivos de cámara disponibles."
                availableAuthorization={true}
            />
        )
    }

    return (
        <View style={cameraStyles.cameraScreen}>
            {
                onTheLimitProductScanned &&
                <BlurView
                    style={cameraStyles.blurOverlay}
                    blurType="dark"
                    blurAmount={5}
                />
            }

            {backCamera && (
                <GestureHandlerRootView>
                    <GestureDetector gesture={gesture} >
                        <Camera
                            ref={camera}
                            style={StyleSheet.absoluteFill}
                            device={backCamera}
                            torch={lightOn ? "on" : "off"}
                            isActive={
                                onTheLimitProductScanned ? false :
                                    cameraAvailable || false
                            }
                            codeScanner={codeScanner}
                            format={format}
                            onLayout={onLayout}

                            //Testing
                            //videoStabilizationMode='standard'
                            videoHdr={false}
                            enableBufferCompression={false}
                            fps={Fps}
                        />
                    </GestureDetector>
                </GestureHandlerRootView>
            )}

            {codeScannerHighlights.map((hightlight, key) => (
                <HightlightBox key={key} highlight={hightlight} layout={layout} scanFrame={scanFrame} />
            ))}

            <View style={cameraStyles.flash}>
                <TouchableOpacity onPress={() => setLightOn(!lightOn)}>
                    <Icon name={lightOn ? "flash" : "flash-outline"} size={24} color="white" />
                </TouchableOpacity>
            </View>


            <View style={cameraStyles.message}>
                {onTheLimitProductScanned ? (
                    <Text style={cameraStyles.textmessage}>Es necesario subir el inventario para seguir escaneando.</Text>
                ) : (
                    <Text style={cameraStyles.textmessage}>Escanea un código de barras para agregarlo {getTypeOfMovementsName()}</Text>
                )}
            </View>

            <View style={cameraStyles.scanSvgContainer}>
                <Scan width={300} height={300} />
            </View>

            {
                Platform.OS === 'android' ?
                    <TouchableOpacity onPress={handleOpenInputModal}>
                        <View style={cameraStyles.scannerOptions}>
                            <View style={cameraStyles.option}>
                                <View style={cameraStyles.optionContent}>
                                    <Icon name="barcode-outline" size={hp("3%")} color="black" />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    :
                    <View style={cameraStyles.scannerOptions}>
                        <BlurView style={cameraStyles.option} blurType="light" blurAmount={20}>
                            <View style={cameraStyles.optionContent}>
                                <TouchableOpacity onPress={handleOpenInputModal}>
                                    <Icon name="barcode-outline" size={hp("3%")} color="black" />
                                </TouchableOpacity>
                            </View>
                        </BlurView>
                    </View>
            }

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