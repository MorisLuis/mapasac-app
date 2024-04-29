import React from 'react';
import { View } from 'react-native';
import { CodebarUpdateScreen } from '../screens/CodebarUpdate/CodebarUpdateScreen';
import { CodebarUpdateWithInputScreen } from '../screens/CodebarUpdate/CodebarUpdateWithInputScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { CustomHeader } from '../components/Ui/CustomHeader';
import { colores, globalStyles } from '../theme/appTheme';
import PorductInterface from '../interface/product';

type CodebarUpdateNavigationInterface = {
    route?: {
        params: {
            productDetails: PorductInterface;
            selectedProduct: { Codigo: string; Marca: string };
        };
    };
};


export type InventoryNavigationStackParamList = {
    UpdateCodeBarScreen: { product: PorductInterface };
    UpdateCodeBarWithInput: any
};

export const CodebarUpdateNavigation = ({ route }: CodebarUpdateNavigationInterface) => {

    const Stack = createStackNavigator<InventoryNavigationStackParamList>();
    const { productDetails, selectedProduct } = route?.params ?? {};

    return (
        <Stack.Navigator initialRouteName="UpdateCodeBarScreen">

            <Stack.Screen
                name="UpdateCodeBarScreen"
                options={({ navigation }) => ({
                    header: props =>
                        <View style={{ paddingTop: globalStyles.globalPadding.padding, backgroundColor: colores.background_color }}>
                            <CustomHeader {...props} title="Crear codigo de barras" navigation={navigation} />
                        </View>
                })}
            >
                {props => <CodebarUpdateScreen {...props} productDetails={productDetails} selectedProduct={selectedProduct} />}
            </Stack.Screen>
            
            <Stack.Screen
                name="UpdateCodeBarWithInput"
                options={({ navigation }) => ({
                    header: (props: any) =>
                        <View style={{ paddingTop: globalStyles.globalPadding.padding, backgroundColor: colores.background_color }}>
                            <CustomHeader {...props} title={props.route.params.title} navigation={navigation} />
                        </View>
                })}
            >
                {props => <CodebarUpdateWithInputScreen {...props} productDetails={productDetails} selectedProduct={selectedProduct} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
