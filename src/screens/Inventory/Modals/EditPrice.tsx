import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import ModalMiddle from '../../../components/Modals/ModalMiddle';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../context/ThemeContext';
import { buttonStyles } from '../../../theme/UI/buttons';
import { globalStyles } from '../../../theme/appTheme';
import { Counter } from '../../../components/Inputs/Counter';
import DotLoader from '../../../components/Ui/DotLaoder';
import { updateProduct } from '../../../services/products';
import useErrorHandler from '../../../hooks/useErrorHandler';
import { InventoryNavigationProp, InventoryNavigationStackParamList } from '../../../navigator/InventoryNavigation';
import CustomText from '../../../components/Ui/CustumText';
import { EditProductStyles } from '../../../theme/EditProductTheme';

type EditPricePageRouteProp = RouteProp<InventoryNavigationStackParamList, '[ProductDetailsPage] - editPrice'>;

type EditPriceInterface = {
    route: EditPricePageRouteProp
};

export const EditPrice = ({ route }: EditPriceInterface) => {

    const { product } = route.params;
    const { goBack } = useNavigation<InventoryNavigationProp>();
    const { theme, typeTheme } = useTheme();
    const { handleError } = useErrorHandler()
    const [piezasCount, setPiezasCount] = useState(0);
    const [editingProduct, setEditingProduct] = useState(false)

    const handleCloseModal = () => {
        goBack()
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
                dataValue: "precio1",
                data: piezasCount,
                onFinish: onFinish
            });

            if (productUpdated.error) return handleError(productUpdated.error);

        } catch (error) {
            handleCloseModal();
            handleError(error)
        } finally {
            setEditingProduct(false);
        }
    }

    useEffect(() => {
        const handleProductPiezasCount = () => {
            setPiezasCount(product?.precio1 ? product?.precio1 : 0)
        }

        handleProductPiezasCount()
    }, [])

    return (
        <ModalMiddle
            visible={true}
            onClose={handleCloseModal}
        >
            <View style={EditProductStyles(theme).EditProductInBag_header}>
                <CustomText style={EditProductStyles(theme).EditProductInBag_title}>Deseas cambiar la cantidad de piezas?</CustomText>
                <Counter counter={piezasCount} setCounter={setPiezasCount} unit={"MXN"} secondaryDesign />
            </View>

            {
                piezasCount < 1 &&
                <View>
                    <CustomText style={EditProductStyles(theme).EditProductInBag_warning}>Si lo dejas en 0 se eliminare el producto.</CustomText>
                </View>
            }

            <TouchableOpacity
                style={[buttonStyles(theme).button, buttonStyles(theme).black, globalStyles(theme).globalMarginBottomSmall,
                ...(editingProduct ? [buttonStyles(theme).disabled] : [])
                ]}
                onPress={onEdit}
                disabled={editingProduct}
            >
                <CustomText style={buttonStyles(theme, typeTheme).buttonText}>
                    {editingProduct ? <DotLoader /> : "Editar"}
                </CustomText>
            </TouchableOpacity>
        </ModalMiddle>
    );
};