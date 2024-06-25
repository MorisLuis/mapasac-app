import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BlurView } from '@react-native-community/blur';
import { SettingsContext } from '../../context/settings/SettingsContext';
import PorductInterface from '../../interface/product';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';

import { cameraStyles } from '../../theme/CameraCustumTheme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { CameraPermission } from '../../components/screens/CameraPermission';
import { Camera } from 'react-native-camera-kit';
import { cameraSettings, getTypeOfMovementsName } from './cameraSettings';

type PermissionStatus = 'unavailable' | 'denied' | 'limited' | 'granted' | 'blocked';

export type OnReadCodeData = {
    nativeEvent: {
        codeStringValue: string;
    };
};

const CameraTest: React.FC = () => {

    const { bag } = useContext(InventoryBagContext);
    const { handleCameraAvailable, limitProductsScanned, cameraAvailable } = useContext(SettingsContext);

    const { navigate } = useNavigation<any>();
    const isFocused = useIsFocused();
    const onTheLimitProductScanned = limitProductsScanned < bag?.length;

    const [lightOn, setLightOn] = useState(false);
    const [cameraKey, setCameraKey] = useState(0);
    const [productsScanned, setProductsScanned] = useState<PorductInterface[]>();
    const [cameraPermission, setCameraPermission] = useState<PermissionStatus | null>(null);

    console.log({ cameraAvailable })

    // Other functions.
    const handleOpenProductsFoundByCodebar = (response: PorductInterface[]) => {

        if (response.length === 1) {
            navigate('[Modal] - scannerResultScreen', { product: response[0] });
        } else if (response.length > 0) {
            navigate('[Modal] - productsFindByCodeBarModal', { products: response });
        } else {
            navigate('[Modal] - scannerResultScreen', { product: response[0] });
        }

        setProductsScanned(response);
    }

    const handleOpenInputModal = () => {
        handleCameraAvailable(false);
        navigate('[Modal] - findByCodebarInputModal');
    }

    const {
        requestCameraPermission,
        handleRequestPermission,
        codeScanned,
        setCodeDetected
    } = cameraSettings({
        handleOpenProductsFoundByCodebar,
        setProductsScanned,
        productsScanned,
        setCameraPermission
    })

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
                onReadCode={(event: OnReadCodeData) => {
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
                    <TouchableOpacity style={cameraStyles.scannerOptions} onPress={handleOpenInputModal}>
                        <View style={cameraStyles.option}>
                            <View style={cameraStyles.optionContent}>
                                <Icon name="barcode-outline" size={hp("3%")} color="white" />
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
        </View>
    );
};

export default CameraTest;