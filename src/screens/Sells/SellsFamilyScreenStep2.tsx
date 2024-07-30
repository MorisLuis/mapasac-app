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

interface SellsFamilyScreenStep2Interface {
    route?: {
        params: {
            cvefamilia?: number;
            descripcio?: string
        };
    };
    visible: boolean;
    move: () => void;
    back: () => void
}

export const SellsFamilyScreenStep2 = ({ route, visible, move, back }: SellsFamilyScreenStep2Interface) => {

    const { cvefamilia, descripcio } = route?.params ?? {};

    const { theme, typeTheme } = useTheme();
    const [products, setProducts] = useState<ProductSellsFamilyInterface[]>([]);
    const navigation = useNavigation<any>();
    const [optionSelected, setOptionSelected] = useState<number>()
    const buttondisabled = optionSelected ? false : true

    const handleSelectClass = async () => {
        navigation.navigate('sellsFamilyScreen3')
    }


    return visible && (
        <View style={SellsFamilyScreenStepStyles(theme, typeTheme).SellsFamilyScreenStep}>
            <View style={SellsFamilyScreenStepStyles(theme, typeTheme).header}>
                <Text style={SellsFamilyScreenStepStyles(theme, typeTheme).headerTitle}>Selecciona la clase.</Text>
                {/* <Text style={SellsFamilyScreenStepStyles(theme, typeTheme).headerSubtitle}>{descripcio}</Text> */}
            </View>

            {/* OPCIONES */}
            <View style={SellsFamilyScreenStepStyles(theme, typeTheme).SellsFamilyScreenStep2}>
                <TouchableOpacity style={SellsFamilyScreenStepStyles(theme, typeTheme).optionContent} onPress={handleSelectClass}>
                    <View>
                        <Icon name="arrow-forward-outline" size={16} color={"black"} style={{ marginRight: 10 }} />
                        <Text>Cantidad</Text>
                    </View>
                    <View>
                        <Text>10</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={SellsFamilyScreenStepStyles(theme, typeTheme).optionContent} onPress={() => console.log("option")}>
                    <View>
                        <Icon name="arrow-forward-outline" size={16} color={"black"} style={{ marginRight: 10 }} />
                        <Text>Precio</Text>
                    </View>
                    <View>
                        <Text>10</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={SellsFamilyScreenStepStyles(theme, typeTheme).optionContent} onPress={() => console.log("option")}>
                    <View>
                        <Icon name="arrow-forward-outline" size={16} color={"black"} style={{ marginRight: 10 }} />
                        <Text>Unidad</Text>
                    </View>
                    <View>
                        <Text>10</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ display: "flex", flexDirection: "row", }}>
                <TouchableOpacity
                    style={[buttonStyles(theme).button, buttonStyles(theme).white, { width: "32.5%", marginRight: "2.5%" },
                    ]}
                    onPress={back}
                >
                    <Text style={buttonStyles(theme, typeTheme).buttonTextSecondary}>Regresar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[buttonStyles(theme).button, buttonStyles(theme).yellow, { width: "62.5%", marginLeft: "2.5%" },
                    ]}
                    onPress={handleSelectClass}
                >
                    <Text style={buttonStyles(theme, typeTheme).buttonTextSecondary}>Siguiente</Text>
                    <Icon name="arrow-forward-outline" size={16} color={"black"} style={{ marginRight: 10 }} />
                </TouchableOpacity>
            </View>

        </View>
    )
};
