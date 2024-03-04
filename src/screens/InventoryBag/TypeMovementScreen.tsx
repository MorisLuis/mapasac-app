import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Button, SafeAreaView } from 'react-native';
import { Text } from 'react-native'
import { View } from 'react-native'

export const TypeMovementScreen = () => {
    const { navigate } = useNavigation<any>();

    return (
        <SafeAreaView style={{ flex: 1, marginTop: 0 }}>
            <Text>TypeMovementScreen</Text>
            <Button title="Atrás" onPress={() => navigate('InventoryBag')} />

        </SafeAreaView>
    )
}
