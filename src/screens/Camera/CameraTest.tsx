import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Platform, Vibration, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BlurView } from '@react-native-community/blur';
import { SettingsContext } from '../../context/settings/SettingsContext';
import PorductInterface from '../../interface/product';
import UserInterface from '../../interface/user';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';

import ModalMiddle from '../../components/Modals/ModalMiddle';
import { ProductFindByCodeBar } from '../../components/Modals/ModalRenders/ProductFindByCodeBar';
import { cameraStyles } from '../../theme/CameraCustumTheme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { CameraPermission } from '../../components/screens/CameraPermission';
import { Camera } from 'react-native-camera-kit';
import { PERMISSIONS, check, openSettings, request } from 'react-native-permissions';
import { getProductByCodeBar } from '../../services/products';
import { AuthContext } from '../../context/auth/AuthContext';

type PermissionStatus = 'unavailable' | 'denied' | 'limited' | 'granted' | 'blocked';

const CameraTest: React.FC = () => {

    const { updateBarCode } = useContext(AuthContext);
    const { bag } = useContext(InventoryBagContext);
    const { handleCameraAvailable, limitProductsScanned, cameraAvailable, vibration } = useContext(SettingsContext);
    const isFocused = useIsFocused();


    const [lightOn, setLightOn] = useState(false);
    const onTheLimitProductScanned = limitProductsScanned < bag?.length;
    const [productsScanned, setProductsScanned] = useState<PorductInterface[]>()
    const [openModalProductFoundByCodebar, setOpenModalProductFoundByCodebar] = useState(false);
    const [cameraPermission, setCameraPermission] = useState<PermissionStatus | null>(null);
    const { navigate } = useNavigation<any>();
    const [cameraKey, setCameraKey] = useState(0);

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
        if (response.length === 1) {
            navigate('scannerResultScreen', { product: response[0] });
        } else if (response.length > 0) {
            setOpenModalProductFoundByCodebar(true)
        } else {
            navigate('scannerResultScreen', { product: response[0] });
        }

        setProductsScanned(response);
    }

    const handleSelectProduct = (product: PorductInterface) => {
        setOpenModalProductFoundByCodebar(false);

        setTimeout(() => {
            navigate('scannerResultScreen', { product: product });
        }, 500);
    }

    const handleOpenInputModal = () => {
        handleCameraAvailable(false);
        navigate('findByCodebarInputModal');
    }


    const requestCameraPermission = async () => {
        const result = await request(
            Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA
        );
        setCameraPermission(result);
    };


    // Solicitar permisos de cámara
    const handleRequestPermission = async () => {
        const result = await check(
            Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA
        );

        if (result === 'denied') {
            requestCameraPermission();
        } else if (result === 'blocked') {
            Alert.alert(
                'Permiso de Cámara Bloqueado',
                'El permiso de la cámara ha sido bloqueado. Por favor, habilítalo en la configuración de tu dispositivo.',
                [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Abrir Configuración', onPress: openSettings }
                ]
            );
        } else {
            setCameraPermission(result);
        }
    };

    const handleVibrate = () => {
        if (vibration) {
            Vibration.vibrate(500);
        }
    };

    const [codeDetected, setCodeDetected] = useState(false)

    const codeScanned = async ({ codes }: any) => {

        setProductsScanned(undefined)
        if (!cameraAvailable) return;
        if (!productsScanned && codes?.length > 0) {

            setCodeDetected(true)
            if (codeDetected) return;

            handleCameraAvailable(false)

            const codeValue = codes;

            if (!codeValue) return;

            try {
                const response = await getProductByCodeBar(codeValue);
                handleOpenProductsFoundByCodebar(response);
                handleVibrate()
                if (response.length < 1) updateBarCode(codeValue)
            } catch (error) {
                setCodeDetected(false)
                console.error('Error fetching product:', error);
            }
        }
    }

    useEffect(() => {
        requestCameraPermission();
        return () => {
            handleCameraAvailable(false);
        };
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (Platform.OS === 'android') {
                setCameraKey(prevKey => prevKey + 1);
            }
            handleCameraAvailable(true);

            return () => {
                setCodeDetected(false)
                handleCameraAvailable(false);
            };
        }, [])
    );

    useEffect(() => {
        if (!isFocused) {
            handleCameraAvailable(false);
        }
    }, [isFocused]);

    if (cameraPermission === null) {
        return <CameraPermission requestPermissions={handleRequestPermission} message="Cargando..." />
    }

    if (cameraPermission !== 'granted') {
        return (
            <CameraPermission
                requestPermissions={handleRequestPermission}
                message="Permisos de cámara no concedidos."
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

            <View style={cameraStyles.backgroundBlurTop}></View>
            <View style={cameraStyles.backgroundBlurBottom}></View>

            <Camera
                key={cameraKey}
                scanBarcode={true}
                onReadCode={(event: any) => {
                    if (!cameraAvailable) return;
                    codeScanned({ codes: event.nativeEvent.codeStringValue })
                }}
                style={cameraStyles.camera}
                torchMode={lightOn ? "on" : "off"}
            />

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

export default CameraTest;


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