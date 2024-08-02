import { useContext, useState } from "react";
import { Platform, Vibration, Alert } from "react-native";
import { getProductByCodeBar } from "../../../services/products";
import { PERMISSIONS, check, openSettings, request } from "react-native-permissions";
import { SettingsContext } from "../../../context/settings/SettingsContext";
import ProductInterface from "../../../interface/product";
import UserInterface from "../../../interface/user";
import { identifyUPCOrEANBarcode } from "../../../utils/identifyBarcodeType";

type PermissionStatus = 'unavailable' | 'denied' | 'limited' | 'granted' | 'blocked';

interface cameraSettingsInterface {
    handleOpenProductsFoundByCodebar: (response: ProductInterface[]) => void;
    setProductsScanned: React.Dispatch<React.SetStateAction<ProductInterface[] | undefined>>;
    productsScanned?: ProductInterface[];
    setCameraPermission: React.Dispatch<React.SetStateAction<PermissionStatus | null>>
}

export const cameraSettings = ({
    handleOpenProductsFoundByCodebar,
    setProductsScanned,
    productsScanned,
    setCameraPermission
}: cameraSettingsInterface) => {

    const { handleCameraAvailable, cameraAvailable, vibration, updateBarCode, handleStartScanning } = useContext(SettingsContext);
    const [codeDetected, setCodeDetected] = useState(false)


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

    const codeScanned = async ({ codes }: any) => {
        handleStartScanning(true)
        handleCameraAvailable(false)
        setProductsScanned(undefined)
        let codeValue = codes;

        if (!cameraAvailable) {
            handleCameraAvailable(true)
            return;
        };

        const identifyUPCOrEAN = identifyUPCOrEANBarcode(codeValue);

        if (identifyUPCOrEAN === "UPC-A convertido a EAN-13") {
            codeValue = codeValue?.substring(1)
        }

        if (!productsScanned) {
            setCodeDetected(true)
            if (codeDetected) {
                handleCameraAvailable(true)
                return;
            };

            if (!codeValue) {
                handleCameraAvailable(true)
                return;
            };

            try {
                const response = await getProductByCodeBar({ codeBar: codeValue?.trim() });
                handleOpenProductsFoundByCodebar(response);
                handleVibrate()
                updateBarCode(codeValue)
                handleStartScanning(false)
            } catch (error) {
                handleStartScanning(false)
                setCodeDetected(false)
                handleCameraAvailable(true)
                console.error('Error fetching product:', error);
            }
        } else {
            handleCameraAvailable(true)
        }
    }


    return {
        requestCameraPermission,
        handleRequestPermission,
        codeScanned,
        setCodeDetected
    }

};