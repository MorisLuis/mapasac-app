import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../context/ThemeContext';
import { Counter } from '../../../components/Inputs/Counter';
import Toast from 'react-native-toast-message';
import { SellsBagContext } from '../../../context/Sells/SellsBagContext';
import { SellsNavigationStackParamList } from '../../../navigator/SellsNavigation';
import CustomText from '../../../components/Ui/CustumText';
import { EditProductStyles } from '../../../theme/Screens/Inventory/EditProductTheme';
import ButtonCustum from '../../../components/Inputs/ButtonCustum';
import { SellsNavigationProp } from '../../../interface/navigation';
import ModalBottom from '../../../components/Modals/ModalBottom';

type EditProductSellScreenRouteProp = RouteProp<SellsNavigationStackParamList, '[Sells] - EditProductInBag'>;

interface EditProductSellInBagInterface {
    route: EditProductSellScreenRouteProp
};

export const EditProductSellInBag = ({ route }: EditProductSellInBagInterface) => {

    const { product } = route.params;
    const { editProductSell, deleteProductSell } = useContext(SellsBagContext);
    const { goBack } = useNavigation<SellsNavigationProp>();
    const { theme } = useTheme();
    const [piezasCount, setPiezasCount] = useState(0);
    const [editingProduct, setEditingProduct] = useState(false)

    const handleCloseModal = () => {
        goBack()
    }

    const onEdit = () => {
        setEditingProduct(true)

        if(!product.idenlacemob) return;
        if (piezasCount < 1) {
            deleteProductSell(product.idenlacemob)
        } else {
            editProductSell({ idenlacemob: product.idenlacemob, cantidad: piezasCount });
        }

        setTimeout(() => {
            Toast.show({
                type: 'tomatoToast',
                text1: 'Se actualizo la cantidad!'
            })
            setEditingProduct(false);
            handleCloseModal()
        }, 500);

    }

    useEffect(() => {
        const handleProductPiezasCount = () => {
            if(!product?.cantidad) return
            setPiezasCount(product?.cantidad)
        }

        handleProductPiezasCount()
    }, [])

    return (
        <ModalBottom
            visible={true}
            onClose={handleCloseModal}
        >
            <View style={EditProductStyles(theme).EditProductInBag_header}>
                <CustomText style={EditProductStyles(theme).EditProductInBag_title}>Deseas cambiar la cantidad de piezas?</CustomText>
                <Counter counter={piezasCount} setCounter={setPiezasCount} unit={product?.unidad_nombre} secondaryDesign />
            </View>

            {
                piezasCount < 1 &&
                <View>
                    <CustomText style={EditProductStyles(theme).EditProductInBag_warning}>Si lo dejas en 0 se eliminare el producto.</CustomText>
                </View>
            }

            <ButtonCustum
                title='Editar'
                onPress={onEdit}
                disabled={editingProduct}
            />

        </ModalBottom>
    );
};