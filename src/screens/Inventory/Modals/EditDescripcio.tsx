import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput } from 'react-native';
import ModalMiddle from '../../../components/Modals/ModalMiddle';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../context/ThemeContext';
import { inputStyles } from '../../../theme/UI/inputs';
import { updateProduct } from '../../../services/products';
import useErrorHandler from '../../../hooks/useErrorHandler';
import { InventoryNavigationProp, InventoryNavigationStackParamList } from '../../../navigator/InventoryNavigation';
import CustomText from '../../../components/Ui/CustumText';
import ButtonCustum from '../../../components/Inputs/ButtonCustum';
import { EditProductStyles } from '../../../theme/EditProductTheme';

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
            <View style={EditProductStyles(theme).EditProductInBag_header}>
                <CustomText style={EditProductStyles(theme).EditProductInBag_title}>Deseas cambiar la descripción?</CustomText>
                <TextInput
                    ref={inputRef}
                    value={descripcioState}
                    onChangeText={handleEditDescripcio}
                    style={[inputStyles(theme, typeTheme).input]}
                />
            </View>

            <ButtonCustum
                title="Editar"
                onPress={onEdit}
                disabled={editingProduct}
                buttonColor='black'
            />

        </ModalMiddle>
    );
};