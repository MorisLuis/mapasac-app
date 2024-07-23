import React, { useContext, useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsContext } from '../context/settings/SettingsContext';

// Screens
import { SellsScreen } from '../screens/Sells/SellsScreen';
import { CustomHeader } from '../components/Ui/CustomHeader';

export type SellsNavigationStackParamList = {
    // Navigation
    sellsScreen: undefined
};

const Stack = createNativeStackNavigator<SellsNavigationStackParamList>();

export const SellsNavigation = () => {
    const { handleCameraAvailable, updateBarCode } = useContext(SettingsContext);

    const stackScreens = useMemo(() => (
        <>
            <Stack.Screen
                name="sellsScreen"
                component={SellsScreen}
                options={({ navigation }: any) => ({
                    header: props => (
                        <CustomHeader
                            {...props}
                            title={"Ventas"}
                            navigation={navigation}
                            backCustum={true}
                            secondaryDesign={true}
                            back={() => navigation.goBack()}
                        />
                    )
                })}
            />
        </>
    ), [handleCameraAvailable, updateBarCode]);

    return (
        <Stack.Navigator>
            {stackScreens}
        </Stack.Navigator>
    );
};
