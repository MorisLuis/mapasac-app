import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { productDetailsStyles } from '../../theme/productDetailsTheme';
import { buttonStyles } from '../../theme/UI/buttons';
import { colores, globalFont, globalStyles } from '../../theme/appTheme';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/auth/AuthContext';
import { updateCostos } from '../../services/costos';
import ModalBottom from '../../components/Modals/ModalBottom';
import CameraModal from '../../components/CameraModal';
import { Selector } from '../../components/Ui/Selector';
import codebartypes from '../../utils/codebarTypes.json';
import { SettingsContext } from '../../context/settings/SettingsContext';

type optionSelectedInterface = {
    screen: string,
    title: string
}

export const CodebarUpdateScreen = ({ productDetails }: any) => {


    const navigation = useNavigation<any>();
    const { codeBar, codeBarStatus } = useContext(AuthContext);
    const { updateBarCode, handleCodebarScannedProcces, handleGetCodebarType, codebarType } = useContext(SettingsContext);

    const [selectedOption, setSelectedOption] = useState<optionSelectedInterface>({ screen: "", title: "" });
    const [openModalCamera, setOpenModalCamera] = useState(false)
    const [codebartypeSelected, setCodebartypeSelected] = useState<number>()
    const [changeTypeOfCodebar, setChangeTypeOfCodebar] = useState(false)
    const currentType = codebartypes.barcodes.find((code: any) => code.id === codebarType)

    const handleOptionOfUpdateCodeSelect = (option: optionSelectedInterface) => {
        setSelectedOption(option);
    };

    const hanldeCodebarTypeSelected = (value: number) => {
        handleGetCodebarType(value)
    }

    const handleGoToNextStep = () => {
        if (selectedOption.screen === "updateWithCode") {
            hanldeUpdateCodebarWithCodeFound()
        } else if (selectedOption.screen === "updateWithRandomCode") {
            hanldeUpdateCodebarWithCodeRandom()
        } else if (selectedOption.screen === "CameraModal") {
            setOpenModalCamera(true)
        } else {
            navigation.navigate(selectedOption.screen, { title: selectedOption.title, productDetails });
        }
    }

    const hanldeUpdateCodebarWithCodeFound = async () => {
        if (!productDetails) return;

        await updateCostos({
            codigo: productDetails?.Codigo,
            Id_Marca: productDetails?.Id_Marca,
            body: {
                CodBar: codeBar
            }
        })
        navigation.goBack()
    }

    const hanldeUpdateCodebarWithCodeRandom = async () => {
        if (!productDetails) return;

        await updateCostos({
            codigo: productDetails?.Codigo,
            Id_Marca: productDetails?.Id_Marca,
            body: {
                codeRandom: "true"
            }
        })
        navigation.goBack()
    }


    useEffect(() => {
        console.log("ola")
        const handleGetTypeOfCodebar = async () => {
            setCodebartypeSelected(codebarType || 1)
        }
        handleGetTypeOfCodebar()
    }, [codebarType]);


    return (
        <>
            <View style={styles.CodebarUpdateScreen}>
                <View style={productDetailsStyles.optionsContent}>

                    {
                        !changeTypeOfCodebar ?
                            <View style={styles.actualCodebarType}>
                                <Text style={styles.actualCodebarTypeText}>Actualmente el codigo de barras es tipo {currentType?.type}</Text>
                                <TouchableOpacity
                                    onPress={() => setChangeTypeOfCodebar(true)}
                                >
                                    <Text style={styles.actualCodebarTypeChange}>Cambiar</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={styles.selectorCodebarType}>
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
                                    <Text style={[styles.actualCodebarTypeChange, { marginTop: globalStyles.globalMarginBottomSmall.marginBottom }]}>Ocultar</Text>
                                </TouchableOpacity>
                            </View>
                    }

                    {
                        (codeBarStatus) ?
                            <TouchableOpacity
                                style={[productDetailsStyles.optionCodebar, selectedOption.screen === 'updateWithCode' && productDetailsStyles.selectedOption]}
                                onPress={() => handleOptionOfUpdateCodeSelect({ screen: 'updateWithCode', title: 'updateWithCode' })}
                            >
                                <Icon name="barcode-outline" size={24} color="black" style={productDetailsStyles.optionCodebar_icon} />
                                <Text>Actualizar código con: {codeBar}</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                style={[productDetailsStyles.optionCodebar, selectedOption.screen === 'CameraModal' && productDetailsStyles.selectedOption]}
                                onPress={() => handleOptionOfUpdateCodeSelect({ screen: 'CameraModal', title: 'CameraModal' })}
                            >
                                <Icon name="camera-outline" size={24} color="black" style={productDetailsStyles.optionCodebar_icon} />
                                <Text>Usar camara para escanear codigo</Text>
                            </TouchableOpacity>
                    }

                    {
                        currentType?.type === 'Libre' &&
                        <TouchableOpacity
                            style={[productDetailsStyles.optionCodebar, selectedOption.screen === 'updateWithRandomCode' && productDetailsStyles.selectedOption]}
                            onPress={() => handleOptionOfUpdateCodeSelect({ screen: 'updateWithRandomCode', title: 'updateWithRandomCode' })}
                        >
                            <Icon name="shuffle-outline" size={24} color="black" style={productDetailsStyles.optionCodebar_icon} />
                            <Text>Actualizar con código aleatorio</Text>
                        </TouchableOpacity>
                    }


                    <TouchableOpacity
                        style={[productDetailsStyles.optionCodebar, selectedOption.screen === 'UpdateCodeBarWithInput' && productDetailsStyles.selectedOption]}
                        onPress={() => handleOptionOfUpdateCodeSelect({ screen: 'UpdateCodeBarWithInput', title: 'Actualizar Manualmente' })}
                    >
                        <Icon name="text-outline" size={24} color="black" style={productDetailsStyles.optionCodebar_icon} />
                        <Text>Escribir manualmente</Text>
                    </TouchableOpacity>
                </View>

                {selectedOption && (
                    <TouchableOpacity style={buttonStyles.button} onPress={handleGoToNextStep}>
                        <Text style={buttonStyles.buttonText}>Avanzar</Text>
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
                <CameraModal productDetails={productDetails} onClose={() => {
                    handleCodebarScannedProcces(false)
                    updateBarCode('')
                    setOpenModalCamera(false)
                }} />
            </ModalBottom>
        </>
    )
}


const styles = StyleSheet.create({
    CodebarUpdateScreen: {
        backgroundColor: colores.background_color,
        padding: globalStyles.globalPadding.padding,
        height: "100%"
    },
    selectorCodebarType: {
        marginBottom: globalStyles.globalMarginBottom.marginBottom
    },
    actualCodebarType: {
        display: "flex",
        marginBottom: globalStyles.globalMarginBottom.marginBottom
    },
    actualCodebarTypeText: {
        fontSize: globalFont.font_sm
    },
    actualCodebarTypeChange: {
        fontSize: globalFont.font_sm,
        color: colores.color_blue
    }
})
