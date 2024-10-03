import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import InputGooglePlaces, { inputGoogleValue } from '../../../components/Inputs/GooglePlacesAutocomplete';
import ButtonCustum from '../../../components/Inputs/ButtonCustum';
import CustomText from '../../../components/Ui/CustumText';
import { globalStyles } from '../../../theme/appTheme';
import ModalBottom from '../../../components/Modals/ModalBottom';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { SellsRestaurantsNavigationStackParamList } from '../../../navigator/SellsRestaurantsNavigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CombinedSellsAndAppNavigationStackParamList } from '../../../interface';

type LocationScreenRouteProp = RouteProp<SellsRestaurantsNavigationStackParamList, '[Modal] - EditLocation'>;

interface LocationScreenInterface {
    route: LocationScreenRouteProp
};

export const LocationScreen = ({ route }: LocationScreenInterface) => {

    const { locationValue } = route.params;
    const { theme } = useTheme();
    const [showData, setShowData] = useState(false);
    const [locationValueLocal, setLocationValueLocal] = useState<inputGoogleValue>()
    const { navigate, goBack } = useNavigation<NativeStackNavigationProp<CombinedSellsAndAppNavigationStackParamList>>();

    const onSubmitLocation = () => {
        navigate('[SellsRestaurants] - confirmationScreen', { addressDirection: locationValueLocal })
    };

    const handleFocus = () => {
        setShowData(false);
    };

    const handleBlur = () => {
        if (locationValueLocal) {
            setShowData(true);
        }
    };

    useEffect(() => {
        if (locationValue) {
            setLocationValueLocal(locationValue)
        }
    }, [locationValue])

    return (
        <ModalBottom
            visible={true}
            onClose={() => goBack()}
        >
            <InputGooglePlaces
                locationValue={locationValueLocal}
                setLocaltionValue={setLocationValueLocal}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />

            {showData && locationValueLocal && (
                <View
                    style={{
                        backgroundColor: theme.background_color_secondary,
                        padding: globalStyles().globalPadding.padding,
                        borderRadius: globalStyles().borderRadius.borderRadius,
                        borderWidth: 0.2,
                        marginVertical: globalStyles().globalMarginBottom.marginBottom / 2
                    }}
                >
                    <CustomText>Calle: {locationValueLocal?.street}</CustomText>
                    <CustomText>No. Calle: {locationValueLocal?.street}</CustomText>
                    <CustomText>Colonia: {locationValueLocal?.neighborhood}</CustomText>
                    <CustomText>Estado: {locationValueLocal?.locality}</CustomText>
                </View>
            )}

            <ButtonCustum
                onPress={onSubmitLocation}
                title="Seleccionar ubicación"
                buttonColor='green'
                extraStyles={{ marginTop: 10 }}
            />
        </ModalBottom>
    );
};
