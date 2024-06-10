import { useContext, useState } from "react";
import { LayoutChangeEvent, Vibration } from "react-native";
import { CodeScannerFrame, useCameraDevice, useCameraDevices, useCameraFormat, useCodeScanner } from "react-native-vision-camera";
import { SettingsContext } from "../../context/settings/SettingsContext";
import { getProductByCodeBar } from "../../services/products";
import { AuthContext } from "../../context/auth/AuthContext";

interface cameraSettingsInterface {
    setProductsScanned: any;
    productsScanned: any;
    handleOpenProductsFoundByCodebar: any
}

export const cameraSettings = ({
    setProductsScanned,
    productsScanned,
    handleOpenProductsFoundByCodebar
} : cameraSettingsInterface) => {


    const { vibration, cameraAvailable, handleCameraAvailable } = useContext(SettingsContext);
    const { updateBarCode } = useContext(AuthContext);

    /* const devices = useCameraDevices();
    const backCamera = devices.find((device) => device.position === 'back'); */

    const backCamera = useCameraDevice('back', {
        physicalDevices: ['wide-angle-camera']
    });

    const [scanFrame, setScanFrame] = useState<CodeScannerFrame>({ height: 1, width: 1 });
    const [codeScannerHighlights, setCodeScannerHighlights] = useState<any[]>([]);
    const [layout, setLayout] = useState<LayoutChangeEvent['nativeEvent']['layout']>({ x: 0, y: 0, width: 0, height: 0 });
    

    const Fps = 30
    
    const format = useCameraFormat(backCamera, [
        { videoResolution: { width: 1280, height: 720 } }
    ]);

    const onLayout = (evt: LayoutChangeEvent) => {
        if (evt.nativeEvent.layout) {
            setLayout(evt.nativeEvent.layout);
        }
    };

    const handleVibrate = () => {
        if (vibration) {
            Vibration.vibrate(500);
        }
    };

    const codeScanner = useCodeScanner({

        codeTypes: ["qr", "ean-13", "code-128"],

        onCodeScanned: async (codes, frame: CodeScannerFrame) => {

            // Code to do the frame
            setScanFrame(frame);
            setCodeScannerHighlights(
                codes.map(code => ({
                    height: code.frame?.width ?? 0,
                    width: code.frame?.height ?? 0,
                    x: code.frame?.y ?? 0,
                    y: code.frame?.x ?? 0,
                })),
            );

            // Code to get product
            //setProductSelected(undefined);
            setProductsScanned(undefined)
            if (!cameraAvailable) return;
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
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            }
        }
    })

    return {
        codeScanner,
        setCodeScannerHighlights,
        backCamera,
        format,
        codeScannerHighlights,
        onLayout,
        layout,
        scanFrame,
        Fps
    }

}