import React from 'react'
import { Button, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { SuccesMessageScreenStyles } from '../theme/SuccesMessageScreenTheme';
import { useTheme } from '../context/ThemeContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const SuccesMessage = () => {

    const { navigate } = useNavigation<any>();
    const { theme, toggleTheme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'light' ? theme.text_color : theme.color_tertiary

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color }}>
            <View style={[SuccesMessageScreenStyles(theme).SuccesMessage]}>

                <TouchableOpacity style={[SuccesMessageScreenStyles(theme).header]} onPress={() => {
                    navigate('ScanneNavigation');
                }}>
                    <Icon name="close-outline" size={24} color={iconColor} />
                </TouchableOpacity>
                <View style={SuccesMessageScreenStyles(theme, typeTheme).content}>
                    <Icon name="checkmark-done-outline" size={hp("10%")} color={iconColor} />
                    <Text style={SuccesMessageScreenStyles(theme, typeTheme).title}>Tu inventario ha sido exitoso.</Text>
                </View>
            </View>

        </SafeAreaView>
    )
}