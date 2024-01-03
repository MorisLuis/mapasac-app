import React, { useState } from 'react';

import { Button, View, Text } from 'react-native';
import { Camera, useCameraDevices, useCodeScanner } from 'react-native-vision-camera';

const CustomCamera: React.FC = () => {
    const [scannedCodes, setScannedCodes] = useState<string | undefined>();
    const [isScannerActive, setIsScannerActive] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            if (codes.length > 0) {
                const scannedCode = codes[0]; // Obtener el primer código escaneado
                const codeValue = scannedCode.value; // Suponiendo que 'value' contiene el valor del código escaneado

                // Usar 'codeValue' para realizar alguna operación o mostrarlo en tu componente
                console.log(`Scanned code value: ${codeValue}`);
                setScannedCodes(codeValue)
            }
        }
    });


    const devices = useCameraDevices();
    const backCamera = devices.find((device) => device.position === 'back');

    const toggleScanner = () => {
        setIsScannerActive((prev) => !prev);
    };

    const handleCameraOpen = () => {
        setSelectedDevice(backCamera?.id || null);
    };

    return (
        <View style={{ flex: 1 }}>
            {backCamera && (
                <View style={{ flex: 1 }}>
                    <Button title="Abrir cámara trasera" onPress={handleCameraOpen} />
                    <Camera
                        style={{ flex: 1 }}
                        device={backCamera}
                        isActive={selectedDevice !== null}
                        codeScanner={isScannerActive ? codeScanner : undefined}
                    />
                    <Button title="Toggle Scanner" onPress={toggleScanner} />
                    <View>
                        {
                            scannedCodes &&
                            <View>
                                <Text>Scanned Codes:</Text>
                                <Text>{scannedCodes}</Text>
                            </View>
                        }
                    </View>
                </View>
            )}
        </View>
    );
};

export default CustomCamera;
