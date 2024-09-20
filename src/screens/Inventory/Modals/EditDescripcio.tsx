import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { editProductStyles } from '../../../theme/ModalRenders/SearchCodebarWithInputTheme';
import ModalMiddle from '../../../components/Modals/ModalMiddle';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../context/ThemeContext';
import { buttonStyles } from '../../../theme/UI/buttons';
import { globalStyles } from '../../../theme/appTheme';
import DotLoader from '../../../components/Ui/DotLaoder';
import { inputStyles } from '../../../theme/UI/inputs';
import { updateProduct } from '../../../services/products';
import useErrorHandler from '../../../hooks/useErrorHandler';
import { InventoryNavigationProp, InventoryNavigationStackParamList } from '../../../navigator/InventoryNavigation';

type EditDescripcioPageRouteProp = RouteProp<InventoryNavigationStackParamList, '[ProductDetailsPage] - editDescripcio'>;

type EditDescripcioInterface = {
    route: EditDescripcioPageRouteProp
};

export const EditDescripcio = ({ route }: EditDescripcioInterface) => {

    const { product } = route?.params ?? {};
    const { goBack } = useNavigation<InventoryNavigationProp>();
    const { theme, typeTheme } = useTheme();
    const [editingProduct, setEditingProduct] = useState(false);
    const [descripcioState, setDescripcioState] = useState<string>()
    const inputRef = useRef<TextInput>(null);
    const { handleError } = useErrorHandler()

    const handleCloseModal = () => {
        goBack()
    }

    const handleEditDescripcio = (text: string) => {
        setDescripcioState(text)
    }

    const onFinish = () => {
        setEditingProduct(false);
        handleCloseModal()
    }

    const onEdit = async () => {

        try {            
            setEditingProduct(true);
            const productUpdated = await updateProduct({
                idinvearts: product?.idinvearts,
                dataValue: "producto",
                data: descripcioState as string,
                onFinish: onFinish
            });
            if (productUpdated.error) return handleError(productUpdated.error);
        } catch (error) {
            handleError(error)
        }

    }

    useEffect(() => {
        const handleProductPiezasCount = () => {
            setDescripcioState(product?.producto)
        }

        handleProductPiezasCount()
    }, [])

    return (
        <ModalMiddle
            visible={true}
            onClose={handleCloseModal}
        >
            <View style={editProductStyles(theme).EditProductInBag_header}>
                <Text style={editProductStyles(theme).EditProductInBag_title}>Deseas cambiar la descripción?</Text>
                <TextInput
                        ref={inputRef}
                        value={descripcioState}
                        onChangeText={handleEditDescripcio}
                        //keyboardType="numeric"
                        style={[inputStyles(theme, typeTheme).input]}
                    />
            </View>

            <TouchableOpacity
                style={[buttonStyles(theme).button, buttonStyles(theme).black, globalStyles(theme).globalMarginBottomSmall,
                ...(editingProduct ? [buttonStyles(theme).disabled] : [])
                ]}
                onPress={onEdit}
                disabled={editingProduct}
            >
                <Text style={buttonStyles(theme, typeTheme).buttonText}>
                    {editingProduct ? <DotLoader /> : "Editar"}
                </Text>
            </TouchableOpacity>
        </ModalMiddle>
    );
};