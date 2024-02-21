import React, { useEffect, useState } from 'react'

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getBriefProductsStatistics } from '../../services/statistics';
import { useNavigation } from '@react-navigation/native';

interface statisticsInterface {
    Estatus: string,
    CantidadProductos: string,
    Path: string
}

const { top } = useSafeAreaInsets();
export const Home = () => {

    const [statistics, setStatistics] = useState<statisticsInterface[]>()
    const { navigate } = useNavigation<any>();

    useEffect(() => {
        console.log('Home effect');

        const fetchData = async () => {
            const result = await getBriefProductsStatistics();
            setStatistics(result)
        }

        fetchData()
    }, [])

    const onClick = (path: string) => {
        navigate('statisticsPage', { path: path });
    }

    return (
        <View style={styles.Home}>
            <Text style={styles.title}>Inicio</Text>

            <View style={styles.statisticContent}>
                {
                    statistics && statistics.map((item, index) =>
                        <TouchableOpacity
                            key={index}
                            onPress={() => onClick(item.Path)}
                            style={[
                                styles.statisticCard,
                                { backgroundColor: styles.statisticCardColors[index % styles.statisticCardColors.length] },
                            ]}
                        >
                            <Text style={styles.statisticsCount}>{item.CantidadProductos}</Text>
                            <Text>{item.Estatus}</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Home: {
        marginTop: top + 10,
        padding: 10
    },
    title: {
        fontSize: 20,
        marginBottom: 10
    },
    statisticContent: {
        display: "flex",
        flexDirection: "row", // Display items in a row
        flexWrap: "wrap", // Allow items to wrap to the next row
        justifyContent: "space-between", // Add space between items
    },
    statisticCard: {
        backgroundColor: "orange",
        width: "48%", // Set the width of each item to take up 48% of the container (allowing space for the gap)
        marginBottom: 10, // Add margin at the bottom for the gap
        padding: 10, // Add padding to each item
        borderRadius: 8, // Optional: Add border radius for rounded corners
    },
    statisticCardColors: [
        "#F5A623", // Orange
        "#4A90E2", // Dodger Blue
        "#50E3C2", // Mint
        "#FF6347", // Tomato
        "#8A2BE2", // Blue Violet
        // Add more colors as needed
    ] as any,
    statisticsCount: {
        fontSize: 20,
        marginBottom: 5
    }

})