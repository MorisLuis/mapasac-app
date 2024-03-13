import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { InventoryBagScreen } from '../screens/InventoryBag/InventoryBagScreen';
import { TypeMovementScreen } from '../screens/InventoryBag/TypeMovementScreen';

export const BagInventoryNavigation = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName="InventoryBag">
            <Stack.Screen
                name="InventoryBag"
                component={InventoryBagScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="TypeMovement"
                component={TypeMovementScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}
