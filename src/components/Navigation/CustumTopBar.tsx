import React, { useContext } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { customTopBarStyles } from '../../theme/UI/customTabBarTheme';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { SellsBagContext } from '../../context/Sells/SellsBagContext';

export const CustomTopBar = () => {

    const { numberOfItemsSells } = useContext(SellsBagContext);
    const { navigate } = useNavigation<any>();
    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black"

    return (
        <SafeAreaView style={customTopBarStyles(theme).customTopBar}>
            <View style={[customTopBarStyles(theme).content]}>
                <TouchableOpacity
                    style={customTopBarStyles(theme).buttonBack}
                    onPress={() => navigate("OnboardingScreen")}
                >
                    <Icon name="arrow-back-outline" size={20} color={iconColor} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={customTopBarStyles(theme).bagButton}
                    onPress={() => navigate("BagSellsScreen")}
                >
                    <Icon name="bag-handle-outline" size={20} color={iconColor} />
                    <View style={customTopBarStyles(theme, typeTheme).bagCounter}>
                        <Text>{numberOfItemsSells}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};