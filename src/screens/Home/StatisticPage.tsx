import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getProductsStatistics } from '../../services/statistics';
import PorductInterface from '../../interface/product';

export const StatisticPage = ({ route }: any) => {
    const { params: { path } } = route;
    const [products, setProducts] = useState<Partial<PorductInterface>[]>()

    useEffect(() => {
        console.log('Profile effect');

        const fetchData = async () => {
            const result = await getProductsStatistics({ path: path, page: 1 });
            setProducts(result)
        }

        fetchData()
    }, [])

    return (
        <View style={styles.StatisticPage}>

            <View style={styles.productsContent}>
                {
                    products && products.map((item, index) =>
                        <TouchableOpacity
                            key={index}
                            //onPress={() => onClick(item.Path)}
                            style={styles.productCard}
                        >
                            <Text>{item.Descripcion}</Text>
                            <Text>Codigo: {item.Codigo}</Text>
                            <Text>Marca: {item.Marca}</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    StatisticPage: {
        padding: 10
    },
    productsContent: {
        

    },
    productCard: {
        backgroundColor: "beige",
        marginBottom: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    }
})