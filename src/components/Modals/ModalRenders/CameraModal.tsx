import React, { useContext, useState } from 'react';
import { View, Vibration, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'react-native-camera-kit';

import { globalStyles } from '../../../theme/appTheme';
import { buttonStyles } from '../../../theme/UI/buttons';
import { CameraModalStyles } from '../../../theme/ModalRenders/CameraModalTheme';

import { SettingsContext } from '../../../context/settings/SettingsContext';
import { useTheme } from '../../../context/ThemeContext';

import { getProductByCodeBar } from '../../../services/products';
import { updateCodeBar } from '../../../services/codebar';

import codebartypes from '../../../utils/codebarTypes.json';
import { identifyBarcodeType, identifyUPCOrEANBarcode } from '../../../utils/identifyBarcodeType';
import { MessageCard } from '../../Cards/MessageCard';
import Icon from 'react-native-vector-icons/Ionicons';
import useErrorHandler from '../../../hooks/useErrorHandler';

interface CameraModalInterface {
    selectedProduct: { idinvearts: number }
    onClose: () => void
}

const CameraModal = ({ selectedProduct, onClose }: CameraModalInterface) => {

    const { vibration, updateBarCode, codebarType, codeBar } = useContext(SettingsContext);
    const navigation = useNavigation<any>();
    const { theme, typeTheme } = useTheme();
    const { handleError } = useErrorHandler()

    const [isScanningAllowed, setIsScanningAllowed] = useState(true);
    const [codeIsScanning, setCodeIsScanning] = useState(false);
    const [productExistent, setProductExistent] = useState(false);
    const [codebarTest, setCodebarTest] = useState(true);

    const iconColor = typeTheme === 'dark' ? "white" : "black"
    const currentType = codebartypes.barcodes.find((code: any) => code.id === codebarType)
    const regex = new RegExp(currentType?.regex as string);

    const handleVibrate = () => {
        if (vibration) {
            Vibration.vibrate(500);
        }
    };

    const codeScanned = async ({ codes }: any) => {

        setCodeIsScanning(true)
        if (codes.length > 0 && isScanningAllowed) {
            setIsScanningAllowed(false);
            let codeValue = codes;
            if (!codeValue) return;

            const identifyUPCOrEAN = identifyUPCOrEANBarcode(codeValue);

            if (identifyUPCOrEAN === "UPC-A convertido a EAN-13") {
                codeValue = codeValue?.substring(1)
            }

            if (!regex.test(codeValue)) {
                setCodebarTest(false)
            }

            try {
                const response = await getProductByCodeBar({ codeBar: codeValue });

                if (response.error) {
                    handleError(response.error);
                    return;
                };

                handleVibrate()
                updateBarCode(codeValue)

                if (response.length > 0) {
                    setProductExistent(true)
                }
            } catch (error) {
                setCodebarTest(true)
                handleError(error)
            } finally {
                setTimeout(() => {
                    setIsScanningAllowed(true);
                }, 2000);
            }
        }
        setCodeIsScanning(false);
    }

    const hanldeUpdateCodebar = async () => {

        try {            
            const codebar = await updateCodeBar({
                codebarras: codeBar as string,
                idinvearts: selectedProduct.idinvearts
            })

            if (codebar.error) {
                handleError(codebar.error);
                return;
            };

            onClose();
            navigation.goBack();
        } catch (error) {
            handleError(error);
        }
    }

    const handleTryAgain = () => {
        updateBarCode("")
        setProductExistent(false)
    }

    return (
        <View style={CameraModalStyles(theme).cameraScreen}>
            {
                !productExistent ?
                    <>
                        <View style={CameraModalStyles(theme).header}>
                            <Text style={CameraModalStyles(theme).header_title}>Escanea el codigo</Text>
                            {
                                (codeBar && !codebarTest) ?
                                    <Text style={CameraModalStyles(theme).header_message}>
                                        Revisa el tipo de codigo de barras requerido, cambiar si asi lo deseas.
                                    </Text>
                                    : (codeBar && !codeIsScanning) ?
                                        <Text style={CameraModalStyles(theme).header_message}>
                                            Asegurate que es el codigo que deseas asignarle a este producto.
                                        </Text>
                                        :
                                        <View >
                                            <Text style={{ color: theme.text_color }}>Escanea el codigo que le pondras a este producto.</Text>
                                            <Text style={CameraModalStyles(theme).header_message_scanner}>Actualmente el codigo de barras es tipo: {currentType?.type}.</Text>
                                        </View>
                            }
                        </View>

                        {
                            (!codeBar && codeIsScanning) ?
                                <ActivityIndicator
                                    size={50}
                                    color={iconColor}
                                />
                                :
                                (!codeBar && !codeIsScanning) ?
                                    <View style={CameraModalStyles(theme).content}>
                                        <Camera
                                            scanBarcode={true}
                                            onReadCode={(event: any) => codeScanned({ codes: event.nativeEvent.codeStringValue })}
                                            style={CameraModalStyles(theme).camera}
                                        />
                                    </View>
                                    :
                                    (codeBar && !codeIsScanning && !codebarTest) ?
                                        <View>
                                            <Text style={[CameraModalStyles(theme).textcodebarFound, { marginBottom: globalStyles(theme).globalMarginBottom.marginBottom }]}>{codeBar}</Text>
                                            <Text style={CameraModalStyles(theme).warningMessage}>{currentType?.errorMessage}</Text>
                                            <TouchableOpacity
                                                style={[buttonStyles(theme).button_small, { marginBottom: globalStyles(theme).globalMarginBottom.marginBottom }]}
                                                onPress={handleTryAgain}
                                            >
                                                <Text style={buttonStyles(theme, typeTheme).buttonTextTertiary}>Intentar de nuevo</Text>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        <>
                                            <View style={CameraModalStyles(theme).codebarFound}>
                                                <Text style={CameraModalStyles(theme).textcodebarFound}>{codeBar}</Text>
                                            </View>

                                            <MessageCard
                                                title='El tipo de codigo de barras es:'
                                                message={`${identifyBarcodeType(codeBar as string)}`}
                                                icon="barcode-outline"
                                                extraStyles={{ marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom }}
                                            />


                                            {
                                                codeBar &&
                                                <TouchableOpacity
                                                    style={[buttonStyles(theme).button_small, { marginBottom: globalStyles(theme).globalMarginBottom.marginBottom }]}
                                                    onPress={hanldeUpdateCodebar}
                                                >
                                                    <Icon name={"bookmark-outline"} size={18} color={iconColor} />
                                                    <Text style={buttonStyles(theme).buttonTextTertiary}>Asignar codigo de barras</Text>
                                                </TouchableOpacity>
                                            }

                                        </>
                        }
                    </>
                    :
                    <>
                        <View style={CameraModalStyles(theme).header}>
                            <Text style={CameraModalStyles(theme).header_title}>Producto encontrado</Text>
                            <Text style={CameraModalStyles(theme).header_message}>
                                Se encontro un producto con el codigo de barras: {codeBar}
                            </Text>
                        </View>

                        <TouchableOpacity style={[buttonStyles(theme).button_small, { marginBottom: globalStyles(theme).globalMarginBottom.marginBottom }]} onPress={handleTryAgain}>
                            <Text style={buttonStyles(theme, typeTheme).buttonTextTertiary}>Intentar de nuevo</Text>
                        </TouchableOpacity>
                    </>
            }

        </View>
    );
};

export default CameraModal;

