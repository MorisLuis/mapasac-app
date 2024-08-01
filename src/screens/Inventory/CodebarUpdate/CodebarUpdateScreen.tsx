import React, { useContext, useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { productDetailsStyles } from '../../../theme/productDetailsTheme';
import { buttonStyles } from '../../../theme/UI/buttons';
import { globalStyles } from '../../../theme/appTheme';
import { useNavigation } from '@react-navigation/native';
import { updateCodeBar } from '../../../services/codebar';
import ModalBottom from '../../../components/Modals/ModalBottom';
import CameraModal from '../../../components/Modals/ModalRenders/CameraModal';
import { Selector } from '../../../components/Ui/Selector';
import codebartypes from '../../../utils/codebarTypes.json';
import { SettingsContext } from '../../../context/settings/SettingsContext';
import { useTheme } from '../../../context/ThemeContext';
import { CodebarUpdateScreenStyles } from '../../../theme/CodebarUpdateScreenTheme';
import { CodebarUpdateOptionCard } from '../../../components/Cards/CodebarUpdateOptionCard';
import Icon from 'react-native-vector-icons/Ionicons';

interface CodebarUpdateScreenInterface {
    selectedProduct: { idinvearts: number }
}

export const CodebarUpdateScreen = ({ selectedProduct }: CodebarUpdateScreenInterface) => {

    const navigation = useNavigation<any>();
    const { updateBarCode, handleCodebarScannedProcces, handleGetCodebarType, codebarType, codeBar, codeBarStatus } = useContext(SettingsContext);
    const { theme, typeTheme } = useTheme();

    const [openModalCamera, setOpenModalCamera] = useState(false)
    const [codebartypeSelected, setCodebartypeSelected] = useState<number>();
    const [changeTypeOfCodebar, setChangeTypeOfCodebar] = useState(false);
    const [optionSelected, setOptionSelected] = useState<number>(0)
    const currentType = codebartypes.barcodes.find((code: any) => code.id === codebarType);
    const iconColor = theme.color_primary

    const hanldeCodebarTypeSelected = (value: number) => {
        handleGetCodebarType(value)
    }

    const handleGoToNextStep = () => {
        console.log({ optionSelected })
        if (optionSelected === 1) {
            hanldeUpdateCodebarWithCodeFound()
        } else if (optionSelected === 2) {
            setOpenModalCamera(true)
        } else if (optionSelected === 3) {
            hanldeUpdateCodebarWithCodeRandom()
        } else if (optionSelected === 4) {
            navigation.navigate('[CodebarUpdateNavigation] - UpdateCodeBarWithInput', { title: "Escribir manualmente" });
        }
    }

    const hanldeUpdateCodebarWithCodeFound = async () => {
        if (!selectedProduct) return;

        await updateCodeBar({
            codebarras: codeBar as string,
            idinvearts: selectedProduct.idinvearts
        })
        navigation.goBack()
    }

    const hanldeUpdateCodebarWithCodeRandom = async () => {
        if (!selectedProduct) return;

        await updateCodeBar({
            codebarras: codeBar as string,
            idinvearts: selectedProduct.idinvearts
        })
        navigation.goBack();
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
                <View style={productDetailsStyles(theme).optionsContent}>
                    {
                        !changeTypeOfCodebar ?
                            <View style={CodebarUpdateScreenStyles(theme).actualCodebarType}>
                                <Text style={CodebarUpdateScreenStyles(theme).actualCodebarTypeText}>Actualmente el codigo de barras es tipo {currentType?.type}</Text>
                                <TouchableOpacity
                                    onPress={() => setChangeTypeOfCodebar(true)}
                                >
                                    <Text style={CodebarUpdateScreenStyles(theme).actualCodebarTypeChange}>Cambiar</Text>
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
                                    <Text style={[CodebarUpdateScreenStyles(theme).actualCodebarTypeChange, { marginTop: globalStyles(theme).globalMarginBottomSmall.marginBottom }]}>Ocultar</Text>
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

                    {/* <CodebarUpdateOptionCard
                        message="Actualizar con código libre"
                        icon="shuffle-outline"
                        onClick={() => setOptionSelected(3)}
                        active={optionSelected === 3}
                        visible={currentType?.type === 'Libre'}
                    /> */}

                    <CodebarUpdateOptionCard
                        message='Escribir manualmente'
                        icon="text-outline"
                        onClick={() => setOptionSelected(4)}
                        active={optionSelected === 4}
                    />
                </View>

                {optionSelected !== 0 && (
                    <TouchableOpacity style={buttonStyles(theme).button} onPress={handleGoToNextStep}>
                        <Text style={buttonStyles(theme, typeTheme).buttonText}>Avanzar</Text>
                        <Icon name="arrow-forward" size={16} color={iconColor} />
                    </TouchableOpacity>
                )}
            </View>

            <ModalBottom
                visible={openModalCamera}
                onClose={() => {
                    setOpenModalCamera(false);
                    updateBarCode('')
                    handleCodebarScannedProcces(false)
                }}
            >
                <CameraModal
                    selectedProduct={selectedProduct}
                    onClose={() => {
                        handleCodebarScannedProcces(false)
                        updateBarCode('')
                        setOpenModalCamera(false)
                    }}
                />
            </ModalBottom>
        </>
    )
}