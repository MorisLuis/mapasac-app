import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import ModalBottom from '../../components/Modals/ModalBottom';
import { ProductSellsFamilyInterface } from '../../interface/productSells';
import { getProductsSellsFromFamily } from '../../services/productsSells';
import { buttonStyles } from '../../theme/UI/buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../../theme/appTheme';
import { SellsFamilyScreenStepStyles } from '../../theme/SellsFamilyScreenStep';

interface SellsFamilyScreenStep3Interface {
    route?: {
        params: {
            cvefamilia?: number;
            descripcio?: string
        };
    };
}

export const SellsFamilyScreenStep3 = ({ route }: SellsFamilyScreenStep3Interface) => {

    const { theme, typeTheme } = useTheme();
    const navigation = useNavigation<any>();
    const [optionSelected, setOptionSelected] = useState<number>()

    const handleSelectClass = async () => {

    }


    return (
        <View style={[SellsFamilyScreenStepStyles(theme, typeTheme).SellsFamilyScreenStep, { flex: 1, backgroundColor: "white", paddingVertical: 100 }]}>
            <View style={SellsFamilyScreenStepStyles(theme, typeTheme).header}>
                <Text style={SellsFamilyScreenStepStyles(theme, typeTheme).headerTitle}>Selecciona la clase.</Text>
            </View>

            {/* OPCIONES */}
            <View>
                <Text>Opcion 3</Text>
            </View>

            <TouchableOpacity style={SellsFamilyScreenStepStyles(theme, typeTheme).optionContent} onPress={() => navigation.goBack()}>
                <View>
                    <Text>Regresar</Text>
                </View>
            </TouchableOpacity>

        </View>
    )
};
