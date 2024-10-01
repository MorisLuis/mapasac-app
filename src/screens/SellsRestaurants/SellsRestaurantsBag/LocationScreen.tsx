import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import InputGooglePlaces, { inputGoogleValue } from '../../../components/Inputs/GooglePlacesAutocomplete';
import ButtonCustum from '../../../components/Inputs/ButtonCustum';
import CustomText from '../../../components/Ui/CustumText';
import { globalStyles } from '../../../theme/appTheme';

interface LocationScreenInterface {
    locationValue?: inputGoogleValue;
    setLocationValue: React.Dispatch<React.SetStateAction<inputGoogleValue | undefined>>;
    onClose?: () => void;
};

export const LocationScreen = ({
    locationValue,
    setLocationValue,
    onClose
}: LocationScreenInterface) => {

    const { typeTheme, theme } = useTheme();
    const [showData, setShowData] = useState(false);

    const onSubmitLocation = () => {
        setLocationValue(locationValue);
        onClose?.();
    };

    const handleFocus = () => {
        setShowData(false);
    };

    const handleBlur = () => {
        if (locationValue) {
            setShowData(true);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })}
        >
            <InputGooglePlaces
                locationValue={locationValue}
                setLocaltionValue={setLocationValue}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />

            {showData && locationValue && (
                <View
                    style={{
                        backgroundColor: theme.background_color_secondary,
                        padding: globalStyles().globalPadding.padding,
                        borderRadius: globalStyles().borderRadius.borderRadius,
                        borderWidth: 0.2,
                        marginVertical: globalStyles().globalMarginBottom.marginBottom / 2
                    }}
                >
                    <CustomText>Calle: {locationValue?.street}</CustomText>
                    <CustomText>No. Calle: {locationValue?.street}</CustomText>
                    <CustomText>Colonia: {locationValue?.neighborhood}</CustomText>
                    <CustomText>Estado: {locationValue?.locality}</CustomText>
                </View>
            )}

            <ButtonCustum
                onPress={onSubmitLocation}
                title="Seleccionar ubicación"
                buttonColor='green'
                extraStyles={{ marginTop: 10 }}
            />
        </KeyboardAvoidingView>
    );
};
