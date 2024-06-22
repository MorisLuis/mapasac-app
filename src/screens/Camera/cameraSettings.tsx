import { useContext, useState } from "react";
import { Platform, Vibration, Alert } from "react-native";
import { getProductByCodeBar } from "../../services/products";
import { AuthContext } from "../../context/auth/AuthContext";
import { PERMISSIONS, check, openSettings, request } from "react-native-permissions";
import { SettingsContext } from "../../context/settings/SettingsContext";
import PorductInterface from "../../interface/product";
import UserInterface from "../../interface/user";

type PermissionStatus = 'unavailable' | 'denied' | 'limited' | 'granted' | 'blocked';

interface cameraSettingsInterface {
    handleOpenProductsFoundByCodebar: (response: PorductInterface[]) => void;
    setProductsScanned: React.Dispatch<React.SetStateAction<PorductInterface[] | undefined>>;
    productsScanned?: PorductInterface[];
    setCameraPermission: React.Dispatch<React.SetStateAction<PermissionStatus | null>>
}

export const cameraSettings = ({
    handleOpenProductsFoundByCodebar,
    setProductsScanned,
    productsScanned,
    setCameraPermission
} : cameraSettingsInterface) => {

    const { handleCameraAvailable, cameraAvailable, vibration } = useContext(SettingsContext);
    const { updateBarCode } = useContext(AuthContext);
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

        setProductsScanned(undefined)
        if (!cameraAvailable) return;
        if (!productsScanned && codes?.length > 0) {

            setCodeDetected(true)
            if (codeDetected) return;

            handleCameraAvailable(false)

            const codeValue = codes;

            if (!codeValue) return;

            try {
                const response = await getProductByCodeBar({ codeBar: codeValue });
                handleOpenProductsFoundByCodebar(response);
                handleVibrate()
                if (response.length < 1) updateBarCode(codeValue)
            } catch (error) {
                setCodeDetected(false)
                console.error('Error fetching product:', error);
            }
        }
    }


    return {
        requestCameraPermission,
        handleRequestPermission,
        codeScanned,
        setCodeDetected
    }

}

export const getTypeOfMovementsName = (user?: UserInterface) => {
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