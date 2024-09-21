import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { SuccesMessageScreenStyles } from '../theme/SuccesMessageScreenTheme';
import { useTheme } from '../context/ThemeContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppNavigationProp, AppNavigationStackParamList } from '../navigator/AppNavigation';
import CustomText from '../components/Ui/CustumText';

type SuccesMessageScreenRouteProp = RouteProp<AppNavigationStackParamList, 'succesMessageScreen'>;

interface SuccesMessageProps {
    route: SuccesMessageScreenRouteProp;
}

export const SuccesMessage = ({ route }: SuccesMessageProps) => {
    const { message, redirection } = route.params;
    const navigation = useNavigation<AppNavigationProp>();

    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'light' ? theme.text_color : theme.color_tertiary;

    const handleContinue = () => {
        navigation.push(redirection);
    };

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color }}>
            <View style={[SuccesMessageScreenStyles(theme).SuccesMessage]}>
                <TouchableOpacity
                    style={[SuccesMessageScreenStyles(theme).header]}
                    onPress={handleContinue}
                >
                    <Icon name="close-outline" size={24} color={iconColor} />
                </TouchableOpacity>
                <View style={SuccesMessageScreenStyles(theme, typeTheme).content}>
                    <Icon name="checkmark-done-outline" size={hp("10%")} color={iconColor} />
                    <CustomText style={SuccesMessageScreenStyles(theme, typeTheme).title}>{message}</CustomText>
                </View>
            </View>
        </SafeAreaView>
    );
};
