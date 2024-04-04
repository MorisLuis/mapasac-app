import React, { useContext, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { productDetailsStyles } from '../../theme/productDetailsTheme';
import { buttonStyles } from '../../theme/UI/buttons';
import { colores, globalStyles } from '../../theme/appTheme';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/auth/AuthContext';
import { updateCostos } from '../../services/costos';
import ModalBottom from '../../components/Modals/ModalBottom';
import CameraModal from '../../components/CameraModal';

type optionSelectedInterface = {
    screen: string,
    title: string
}

export const CodebarUpdateScreen = ({ productDetails, route }: any) => {

    const navigation = useNavigation<any>();
    const { codeBar, codeBarStatus, updateBarCode, handleCodebarScannedProcces } = useContext(AuthContext);
    const [selectedOption, setSelectedOption] = useState<optionSelectedInterface>({ screen: "", title: "" });
    const [openModalCamera, setOpenModalCamera] = useState(false)

    const handleOptionSelect = (option: optionSelectedInterface) => {
        setSelectedOption(option);
    };


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

    return (
        <>
            <View style={styles.CodebarUpdateScreen}>
                <View style={productDetailsStyles.optionsContent}>

                    {
                        (codeBarStatus) ?
                            <TouchableOpacity
                                style={[productDetailsStyles.optionCodebar, selectedOption.screen === 'updateWithCode' && productDetailsStyles.selectedOption]}
                                onPress={() => handleOptionSelect({ screen: 'updateWithCode', title: 'updateWithCode' })}
                            >
                                <Icon name="barcode-outline" size={24} color="black" style={productDetailsStyles.optionCodebar_icon} />
                                <Text>Actualizar código con: {codeBar}</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                style={[productDetailsStyles.optionCodebar, selectedOption.screen === 'CameraModal' && productDetailsStyles.selectedOption]}
                                onPress={() => handleOptionSelect({ screen: 'CameraModal', title: 'CameraModal' })}
                            >
                                <Icon name="camera-outline" size={24} color="black" style={productDetailsStyles.optionCodebar_icon} />
                                <Text>Usar camara para escanear codigo</Text>
                            </TouchableOpacity>
                    }

                    <TouchableOpacity
                        style={[productDetailsStyles.optionCodebar, selectedOption.screen === 'updateWithRandomCode' && productDetailsStyles.selectedOption]}
                        onPress={() => handleOptionSelect({ screen: 'updateWithRandomCode', title: 'updateWithRandomCode' })}
                    >
                        <Icon name="shuffle-outline" size={24} color="black" style={productDetailsStyles.optionCodebar_icon} />
                        <Text>Actualizar con código aleatorio</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[productDetailsStyles.optionCodebar, selectedOption.screen === 'UpdateCodeBarWithInput' && productDetailsStyles.selectedOption]}
                        onPress={() => handleOptionSelect({ screen: 'UpdateCodeBarWithInput', title: 'Actualizar Manualmente' })}
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
    }
})
