import React, { useCallback } from 'react';
import { ProductSellsSquareCard } from '../../components/Cards/ProductSellsSquareCard';
import { ProductSellsInterface } from '../../interface/productSells';
import { LayoutSell } from '../../components/Layouts/LayoutSell';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../../components/Ui/CustumText';

export const SellsScreen = () => {

    const renderItem = useCallback(({ item }: { item: ProductSellsInterface }) => (
        <ProductSellsSquareCard product={item} />
    ), []);

    
        return (
            <LayoutSell
                renderItem={renderItem}
                opcion={2}
            />
        )

    return (
        <LinearGradient
            colors={['#D8D2F6', '#ffffff']} // Color morado a blanco
            style={styles.gradient}
            locations={[0, 0.75]} // Cambia el color en la mitad
        >
            <View style={styles.content}>
                <CustomText style={styles.text}>¡Hola, mundo!</CustomText>
            </View>
        </LinearGradient>
    )
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        // Puedes agregar estilos para el contenido aquí
    },
    text: {
        fontSize: 24,
        color: '#000', // Color del texto
    },
});