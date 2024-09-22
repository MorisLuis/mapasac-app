import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { globalStyles } from '../../../theme/appTheme';
import { useNavigation } from '@react-navigation/native';
import { updateCodeBar } from '../../../services/codebar';
import ModalBottom from '../../../components/Modals/ModalBottom';
import CameraModal from '../../../components/Modals/ModalRenders/CameraModal';
import { Selector } from '../../../components/Inputs/Selector';
import codebartypes from '../../../utils/codebarTypes.json';
import { SettingsContext } from '../../../context/settings/SettingsContext';
import { useTheme } from '../../../context/ThemeContext';
import { CodebarUpdateScreenStyles } from '../../../theme/CodebarUpdateScreenTheme';
import { CodebarUpdateOptionCard } from '../../../components/Cards/CodebarUpdateOptionCard';
import useErrorHandler from '../../../hooks/useErrorHandler';
import { CodebarNavigationProp } from '../../../navigator/CodebarUpdateNavigation';
import CustomText from '../../../components/Ui/CustumText';
import { ProductDetailsStyles } from '../../../theme/ProductDetailsTheme';
import ButtonCustum from '../../../components/Inputs/ButtonCustum';

interface CodebarUpdateScreenInterface {
    selectedProduct: { idinvearts: number }
}

export const CodebarUpdateScreen = ({ selectedProduct }: CodebarUpdateScreenInterface) => {

    const navigation = useNavigation<CodebarNavigationProp>();
    const { updateBarCode, handleCodebarScannedProcces, handleGetCodebarType, codebarType, codeBar, codeBarStatus } = useContext(SettingsContext);
    const { theme, typeTheme } = useTheme();
    const { handleError } = useErrorHandler()

    const [openModalCamera, setOpenModalCamera] = useState(false)
    const [codebartypeSelected, setCodebartypeSelected] = useState<number>();
    const [changeTypeOfCodebar, setChangeTypeOfCodebar] = useState(false);
    const [optionSelected, setOptionSelected] = useState<number>(0)
    const currentType = codebartypes.barcodes.find((code: any) => code.id === codebarType);

    const hanldeCodebarTypeSelected = (value: number) => {
        handleGetCodebarType(value)
    }

    const handleGoToNextStep = () => {
        if (optionSelected === 1) {
            hanldeUpdateCodebarWithCodeFound()
        } else if (optionSelected === 2) {
            updateBarCode('')
            setOpenModalCamera(true)
        } else if (optionSelected === 3) {
            hanldeUpdateCodebarWithCodeRandom()
        } else if (optionSelected === 4) {
            navigation.navigate('[CodebarUpdateNavigation] - UpdateCodeBarWithInput', { title: "Escribir manualmente" });
        }
    }

    const hanldeUpdateCodebarWithCodeFound = async () => {

        try {
            const codebar = await updateCodeBar({
                codebarras: codeBar as string,
                idinvearts: selectedProduct.idinvearts
            })
            if (codebar.error) return handleError(codebar.error);
            navigation.goBack()
        } catch (error) {
            handleError(error);
        }

    }

    const hanldeUpdateCodebarWithCodeRandom = async () => {

        try {
            const codebar = await updateCodeBar({
                codebarras: codeBar as string,
                idinvearts: selectedProduct.idinvearts
            })
            if (codebar.error) return handleError(codebar.error);
            navigation.goBack();
        } catch (error) {
            handleError(error);
        }

    }

    const handleCloseModalCamera = () => {
        handleCodebarScannedProcces(false)
        updateBarCode('')
        setOpenModalCamera(false)
    }

    useEffect(() => {
        const handleGetTypeOfCodebar = async () => {
            setCodebartypeSelected(codebarType || 1)
        }
        handleGetTypeOfCodebar()
    }, [codebarType]);


    return (
        <>
            <View style={CodebarUpdateScreenStyles(theme).CodebarUpdateScreen}>
                <View style={ProductDetailsStyles(theme).optionsContent}>
                    {
                        !changeTypeOfCodebar ?
                            <View style={CodebarUpdateScreenStyles(theme).actualCodebarType}>
                                <CustomText style={CodebarUpdateScreenStyles(theme).actualCodebarTypeText}>Actualmente el codigo de barras es tipo {currentType?.type}</CustomText>
                                <TouchableOpacity
                                    onPress={() => setChangeTypeOfCodebar(true)}
                                >
                                    <CustomText style={CodebarUpdateScreenStyles(theme).actualCodebarTypeChange}>Cambiar</CustomText>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={CodebarUpdateScreenStyles(theme).selectorCodebarType}>
                                <Selector
                                    label={"Tipo de codigo de barras: "}
                                    items={codebartypes.barcodes.map((item: any) => {
                                        return { label: item?.type, value: item?.id }
                                    })}
                                    value={codebartypes?.barcodes.find((code) => code?.id === codebartypeSelected)?.type || "Code 128"}

                                    //Methods
                                    onValueChange={(value) => hanldeCodebarTypeSelected(value)}
                                />
                                <TouchableOpacity
                                    onPress={() => setChangeTypeOfCodebar(false)}
                                >
                                    <CustomText style={[CodebarUpdateScreenStyles(theme).actualCodebarTypeChange, { marginTop: globalStyles(theme).globalMarginBottomSmall.marginBottom }]}>Ocultar</CustomText>
                                </TouchableOpacity>
                            </View>
                    }


                    <CodebarUpdateOptionCard
                        message={`Actualizar código con: ${codeBar}`}
                        icon="barcode-outline"
                        onClick={() => setOptionSelected(1)}
                        active={optionSelected === 1}
                        visible={codeBarStatus}
                    />

                    <CodebarUpdateOptionCard
                        message={`Usar camara para escanear codigo`}
                        icon="camera-outline"
                        onClick={() => setOptionSelected(2)}
                        active={optionSelected === 2}
                    />

                    <CodebarUpdateOptionCard
                        message='Escribir manualmente'
                        icon="text-outline"
                        onClick={() => setOptionSelected(4)}
                        active={optionSelected === 4}
                    />
                </View>

                {optionSelected !== 0 && (
                    <ButtonCustum
                        title='Avanzar'
                        onPress={handleGoToNextStep}
                        buttonColor='green'
                        iconName="arrow-forward"
                    />
                )}
            </View>

            <ModalBottom
                visible={openModalCamera}
                onClose={handleCloseModalCamera}
            >
                <CameraModal
                    selectedProduct={selectedProduct}
                    onClose={handleCloseModalCamera}
                />
            </ModalBottom>
        </>
    )
}