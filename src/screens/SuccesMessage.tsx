import React, { useContext } from 'react';
import { SafeAreaView, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { SuccesMessageScreenStyles } from '../theme/SuccesMessageScreenTheme';
import { useTheme } from '../context/ThemeContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppNavigationProp, AppNavigationStackParamList } from '../navigator/AppNavigation';
import CustomText from '../components/Ui/CustumText';
import { globalFont } from '../theme/appTheme';
import FooterScreen from '../components/Navigation/FooterScreen';
import { handleColorWithModule } from '../utils/handleColorWithModule';
import { SettingsContext } from '../context/settings/SettingsContext';

type SuccesMessageScreenRouteProp = RouteProp<AppNavigationStackParamList, 'succesMessageScreen'>;

interface SuccesMessageProps {
    route: SuccesMessageScreenRouteProp;
}

export const SuccesMessage = ({ route }: SuccesMessageProps) => {
    const { message, redirection } = route.params ?? {};
    const navigation = useNavigation<AppNavigationProp>();
    const { actualModule } = useContext(SettingsContext);

    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'light' ? theme.text_color : theme.color_tertiary;

    const handleContinue = () => {
        navigation.push(redirection);
    };

    return (
        <SafeAreaView>
            <View style={SuccesMessageScreenStyles(theme).SuccesMessage}>
                <View style={SuccesMessageScreenStyles(theme).content}>
                    <Icon name="checkmark-done-outline" size={hp("10%")} color={handleColorWithModule({ actualModule })} />
                    <CustomText style={SuccesMessageScreenStyles(theme).headerText}>Venta realizada con existo</CustomText>

                    <View style={[SuccesMessageScreenStyles(theme).dateContainer, { backgroundColor: handleColorWithModule({ actualModule }) + "40" }]}>
                        <Icon name="calendar" size={globalFont.font_normal} color={handleColorWithModule({ actualModule })} />
                        <CustomText>SE REALIZO: 5:00 PM, 27 ENERO 2024</CustomText>
                    </View>

                    <View style={SuccesMessageScreenStyles(theme).dataContainer}>
                        <View style={SuccesMessageScreenStyles(theme).dataContainerInterior}>
                            <View style={SuccesMessageScreenStyles(theme).dataHeader}>
                                <Icon name="stats-chart" size={globalFont.font_normal} color={handleColorWithModule({ actualModule })} />
                                <CustomText style={[SuccesMessageScreenStyles(theme).dataTitle, { color:  handleColorWithModule({actualModule}) }]}>Resumen</CustomText>
                            </View>

                            <View style={SuccesMessageScreenStyles(theme).dataDivider}></View>

                            <View style={SuccesMessageScreenStyles(theme, typeTheme).confirmationItem}>
                                <CustomText style={SuccesMessageScreenStyles(theme, typeTheme).confirmationItemLabel}>Productos afectados: </CustomText>
                                <CustomText style={[SuccesMessageScreenStyles(theme, typeTheme).confirmationText]}>3</CustomText>
                            </View>

                            <View style={SuccesMessageScreenStyles(theme, typeTheme).confirmationItem}>
                                <CustomText style={SuccesMessageScreenStyles(theme, typeTheme).confirmationItemLabel}>Tipo de movimiento: </CustomText>
                                <CustomText style={[SuccesMessageScreenStyles(theme, typeTheme).confirmationText]}>Venta</CustomText>
                            </View>

                            <View style={SuccesMessageScreenStyles(theme, typeTheme).confirmationItem}>
                                <CustomText style={SuccesMessageScreenStyles(theme, typeTheme).confirmationItemLabel}>Total importe: </CustomText>
                                <CustomText style={[SuccesMessageScreenStyles(theme, typeTheme).confirmationText, { color: handleColorWithModule({ actualModule }) }]}>$120,00 MXN</CustomText>
                            </View>
                        </View>
                    </View>
                </View>

                <FooterScreen
                    buttonDisabled={false}
                    buttonOnPress={handleContinue}
                    buttonTitle='Continuar'
                />
            </View>
        </SafeAreaView>
    );
};
