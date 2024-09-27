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
import { format } from '../utils/currency';
import moment from 'moment-timezone';

type SuccesMessageScreenRouteProp = RouteProp<AppNavigationStackParamList, 'succesMessageScreen'>;

interface SuccesMessageProps {
    route: SuccesMessageScreenRouteProp;
}

export const SuccesMessage = ({ route }: SuccesMessageProps) => {
    const { redirection, from, numberOfProducts, importe } = route.params ?? {};
    const navigation = useNavigation<AppNavigationProp>();
    const { actualModule } = useContext(SettingsContext);
    const { theme, typeTheme } = useTheme();

    const handleContinue = () => {
        navigation.push(redirection);
    };

    const handleMovementText = () => {
        let title;
        let text;

        if (from === 'Inventory') {
            title = 'Inventario realizado'
            text = 'Inventario'
        } else {
            title = 'Venta realizada'
            text = 'Venta'
        }

        return {
            title,
            text
        }
    };

    const date = new Date();
    const formattedDate = moment(date)
        .tz('America/Mexico_City')
        .format('LT, D MMMM YYYY'); // Formato: Hora (LT), día mes en letras año


    return (
        <SafeAreaView>
            <View style={SuccesMessageScreenStyles(theme).SuccesMessage}>
                <View style={SuccesMessageScreenStyles(theme).content}>
                    <Icon name="checkmark-done-outline" size={hp("10%")} color={handleColorWithModule({ actualModule })} />
                    <CustomText style={SuccesMessageScreenStyles(theme).headerText}>{handleMovementText().title} con existo</CustomText>

                    <View style={[SuccesMessageScreenStyles(theme).dateContainer, { backgroundColor: handleColorWithModule({ actualModule }) + "40" }]}>
                        <Icon name="calendar" size={globalFont.font_normal} color={handleColorWithModule({ actualModule })} />
                        <CustomText>SE REALIZO: {formattedDate.toUpperCase()}</CustomText>
                    </View>

                    <View style={SuccesMessageScreenStyles(theme).dataContainer}>
                        <View style={SuccesMessageScreenStyles(theme).dataContainerInterior}>
                            <View style={SuccesMessageScreenStyles(theme).dataHeader}>
                                <Icon name="stats-chart" size={globalFont.font_normal} color={handleColorWithModule({ actualModule })} />
                                <CustomText style={[SuccesMessageScreenStyles(theme).dataTitle, { color: handleColorWithModule({ actualModule }) }]}>Resumen</CustomText>
                            </View>

                            <View style={SuccesMessageScreenStyles(theme).dataDivider}></View>

                            <View style={SuccesMessageScreenStyles(theme, typeTheme).confirmationItem}>
                                <CustomText style={SuccesMessageScreenStyles(theme, typeTheme).confirmationItemLabel}>Productos afectados: </CustomText>
                                <CustomText style={[SuccesMessageScreenStyles(theme, typeTheme).confirmationText]}>{numberOfProducts}</CustomText>
                            </View>

                            <View style={SuccesMessageScreenStyles(theme, typeTheme).confirmationItem}>
                                <CustomText style={SuccesMessageScreenStyles(theme, typeTheme).confirmationItemLabel}>Tipo de movimiento: </CustomText>
                                <CustomText style={[SuccesMessageScreenStyles(theme, typeTheme).confirmationText]}>{handleMovementText().text}</CustomText>
                            </View>

                            {
                                importe &&
                                <View style={SuccesMessageScreenStyles(theme, typeTheme).confirmationItem}>
                                    <CustomText style={SuccesMessageScreenStyles(theme, typeTheme).confirmationItemLabel}>Total importe: </CustomText>
                                    <CustomText style={[SuccesMessageScreenStyles(theme, typeTheme).confirmationText, { color: handleColorWithModule({ actualModule }) }]}>{format(importe)}</CustomText>
                                </View>
                            }
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
