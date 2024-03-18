import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { getProductDetails } from '../services/products';
import PorductInterface from '../interface/product';
import { LoadingScreen } from './LoadingScreen';
import { productDetailsStyles } from '../theme/productDetailsTheme';
import { format } from '../utils/currency';
import { globalStyles } from '../theme/appTheme';
import { buttonStyles } from '../theme/UI/buttons';
import { updateCostos } from '../services/costos';
import ModalMiddle from '../components/Modals/ModalMiddle';

export const ProductDetailsPage = ({ route }: any) => {
    const imageDefault = 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=2762&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

    const { selectedProduct: { Codigo, Marca } } = route.params;
    const [productDetails, setProductDetails] = useState<PorductInterface>()
    const [openModalUpdateCodebar, setOpenModalUpdateCodebar] = useState(false);
    const [updatingCostos, setUpdatingCostos] = useState(false)

    const handleGetProductDetails = async () => {
        const productData = await getProductDetails(Codigo, Marca);
        setProductDetails(productData)
    }

    const handleCreateCodebar = async () => {
        if (!productDetails) return;
        setUpdatingCostos(true)

        await updateCostos({
            codigo: productDetails?.Codigo,
            Id_Marca: productDetails?.Id_Marca,
            body: {
                CodBar: ''
            }
        })

        setOpenModalUpdateCodebar(false);
        handleGetProductDetails();
        setUpdatingCostos(false);
    }

    useEffect(() => {
        handleGetProductDetails()
    }, [])


    return productDetails ?
        <>
            <ScrollView style={productDetailsStyles.ProductDetailsPage}>
                <View style={productDetailsStyles.imageContainer}>
                    <Image
                        style={productDetailsStyles.image}
                        source={{
                            uri: productDetails?.imagen ? productDetails?.imagen[0]?.url : imageDefault,
                        }}
                    />
                </View>
                <View style={productDetailsStyles.header}>
                    <Text style={productDetailsStyles.description}>{productDetails?.Descripcion}</Text>
                    <View>
                        <Text style={productDetailsStyles.price}>Precio</Text>
                        <Text>{format(productDetails?.Precio)}</Text>
                    </View>
                </View>

                <View style={productDetailsStyles.information}>
                    <View style={productDetailsStyles.data}>
                        <Text style={productDetailsStyles.label}>Codigo:</Text>
                        <Text>{productDetails?.Codigo}</Text>
                        <View style={productDetailsStyles.separator} />
                    </View>

                    <View style={productDetailsStyles.data}>
                        <Text style={productDetailsStyles.label}>Existencia:</Text>
                        <Text>{productDetails?.Existencia}</Text>
                        <View style={productDetailsStyles.separator} />
                    </View>

                    <View style={productDetailsStyles.data}>
                        <Text style={productDetailsStyles.label}>Familia:</Text>
                        <Text>{productDetails?.Familia}</Text>
                        <View style={productDetailsStyles.separator} />
                    </View>

                    <View style={productDetailsStyles.data}>
                        <Text style={productDetailsStyles.label}>Marca:</Text>
                        <Text>{productDetails?.Marca}</Text>
                        {
                            productDetails?.CodBar &&
                            <View style={productDetailsStyles.separator} />
                        }
                    </View>
                    {
                        productDetails?.CodBar &&
                        <View style={productDetailsStyles.data}>
                            <Text style={productDetailsStyles.label}>Codigo de barras: </Text>
                            <Text>{productDetails?.CodBar}</Text>
                        </View>
                    }
                </View>

                {
                    !productDetails?.CodBar &&
                    <TouchableOpacity style={buttonStyles.button} onPress={() => setOpenModalUpdateCodebar(true)}>
                        <Text style={buttonStyles.buttonText}>Crear codigo de barras</Text>
                    </TouchableOpacity>
                }
            </ScrollView>

            <ModalMiddle
                visible={openModalUpdateCodebar}
                onClose={() => setOpenModalUpdateCodebar(false)}
                title='Quieres actualizar codigo de barras?'
            >
                {
                    updatingCostos ?
                        <View>
                            <Text>Cargando...</Text>
                        </View>
                        :
                        <>
                            <TouchableOpacity
                                style={[buttonStyles.button, buttonStyles.black, globalStyles.globalMarginBottomSmall]}
                                onPress={handleCreateCodebar}
                                disabled={updatingCostos}
                            >
                                <Text style={buttonStyles.buttonText}>Actualizar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[buttonStyles.button, buttonStyles.white]}
                                onPress={() => setOpenModalUpdateCodebar(false)}
                                disabled={updatingCostos}
                            >
                                <Text style={buttonStyles.buttonTextSecondary}>Cancelar</Text>
                            </TouchableOpacity>
                        </>
                }
            </ModalMiddle>
        </>
        :
        <LoadingScreen />
}