import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';

import { InventoryBagContext } from '../../../context/Inventory/InventoryBagContext';
import { SettingsContext } from '../../../context/settings/SettingsContext';
import { useTheme } from '../../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { BlurView } from '@react-native-community/blur';
import ProductInterface from '../../../interface/product';
import { cameraStyles } from '../../../theme/CameraCustumTheme';
import { CameraPermission } from '../../../components/screens/CameraPermission';
import { Camera } from 'react-native-camera-kit';
import { cameraSettings, getTypeOfMovementsName } from './cameraSettings';

type PermissionStatus = 'unavailable' | 'denied' | 'limited' | 'granted' | 'blocked';

export type OnReadCodeData = {
    nativeEvent: {
        codeStringValue: string;
    };
};

const CameraTest: React.FC = () => {

    const { numberOfItems } = useContext(InventoryBagContext);
    const { handleCameraAvailable, cameraAvailable } = useContext(SettingsContext);
    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black"

    const { navigate } = useNavigation<any>();
    const isFocused = useIsFocused();

    const [lightOn, setLightOn] = useState(false);
    const [cameraKey, setCameraKey] = useState(0);
    const [productsScanned, setProductsScanned] = useState<ProductInterface[]>();
    const [cameraPermission, setCameraPermission] = useState<PermissionStatus | null>(null);

    // Other functions.
    const handleOpenProductsFoundByCodebar = (response: ProductInterface[]) => {

        if (response?.length === 1) {
            navigate('[Modal] - scannerResultScreen', { product: response[0] });
        } else if (response?.length > 0) {
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

    const handleOpenBagInventory = () => {
        navigate('bagInventoryScreen')
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
        <View style={cameraStyles(theme).cameraScreen}>

            <View style={cameraStyles(theme).backgroundBlurTop}></View>
            <View style={cameraStyles(theme).backgroundBlurBottom}></View>

            <Camera
                key={cameraKey}
                scanBarcode={true}
                onReadCode={(event: OnReadCodeData) => {
                    if (!cameraAvailable) return;
                    codeScanned({ codes: event.nativeEvent.codeStringValue })
                }}
                style={cameraStyles(theme).camera}
                torchMode={lightOn ? "on" : "off"}
            />

            <View style={cameraStyles(theme, typeTheme).actions}>
                <View style={cameraStyles(theme, typeTheme).cog}>
                    <TouchableOpacity onPress={handleOpenBagInventory}>
                        <Icon name={"albums-outline"} size={22} color={iconColor} />
                    </TouchableOpacity>
                    {
                        numberOfItems > 0 &&
                        <View style={cameraStyles(theme, typeTheme).bagCounter}>
                            <Text>{numberOfItems}</Text>
                        </View>
                    }
                </View>

                <View style={cameraStyles(theme, typeTheme).flash}>
                    <TouchableOpacity onPress={() => setLightOn(!lightOn)}>
                        <Icon name={lightOn ? "flash" : "flash-outline"} size={22} color={iconColor} />
                    </TouchableOpacity>
                </View>

                <View style={cameraStyles(theme, typeTheme).cog}>
                    <TouchableOpacity onPress={handleOpenInputModal}>
                        <Icon name={"barcode-outline"} size={22} color={iconColor} />
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};

export default CameraTest;