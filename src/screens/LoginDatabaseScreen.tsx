import React, { useContext, useEffect } from 'react';

import { Text, View, TextInput, Platform, KeyboardAvoidingView, Keyboard, Alert, TouchableOpacity } from 'react-native';
import { useForm } from '../hooks/useForm';
import useKeyboardStatus from '../hooks/useKeyboardStatus';
import { LoadingScreen } from './LoadingScreen';

import { loginDBStyles } from '../theme/loginTheme';
import { buttonStyles } from '../theme/UI/buttons';
import { inputStyles } from '../theme/UI/inputs';
import { globalStyles } from '../theme/appTheme';
import { DbAuthContext } from '../context/dbAuth/DbAuthContext';
import Banner from "../assets/OLEIAPP.svg";
import Logo from "../assets/Logo.svg";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export const LoginDatabaseScreen = () => {
    const { signInDB, errorMessage, removeError, loggingIn } = useContext(DbAuthContext);
    const { IdUsuarioOLEI, PasswordOLEI, onChange } = useForm({ IdUsuarioOLEI: '', PasswordOLEI: '' });

    useEffect(() => {
        if (errorMessage.length === 0) return;

        Alert.alert('Login incorrecto', errorMessage ? errorMessage : errorMessage, [{
            text: 'Ok',
            onPress: removeError
        }]);

    }, [errorMessage]);

    const onLogin = () => {
        Keyboard.dismiss();
        signInDB({ IdUsuarioOLEI, PasswordOLEI });
    };

    const keyboardActive = useKeyboardStatus();

    if (loggingIn) return <LoadingScreen />;

    return (
        <KeyboardAvoidingView
            style={loginDBStyles.LoginDBScreen}
            behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
        >
            <View style={loginDBStyles.formContainer}>

                <View style={loginDBStyles.logoContainer}>
                    <Logo width={keyboardActive ? wp("35%") : wp("60%")} height={"100%"} />
                </View>

                <View style={[keyboardActive ? loginDBStyles.imageContainerActive : loginDBStyles.imageContainer]}>
                    <Banner width={keyboardActive ? "50%" : "90%"} height={"100%"}  />
                </View>

                <View style={[keyboardActive ? loginDBStyles.headersActive : loginDBStyles.headers]}>
                    <Text style={[keyboardActive ? loginDBStyles.titleDBActive : loginDBStyles.titleDB]}>Con OLEI APP agilice la captura de sus movimientos</Text>
                    <Text style={[keyboardActive ? loginDBStyles.textDBActive : loginDBStyles.textDB]}>
                        Iniciemos conectadonos a tu base de datos.
                    </Text>
                </View>

                <TextInput
                    placeholder="Escribe Id Usuario Olei"
                    placeholderTextColor="gray"
                    keyboardType="email-address"
                    style={[inputStyles.input, globalStyles.globalMarginBottom]}
                    selectionColor="black"
                    onChangeText={(value) => onChange(value, 'IdUsuarioOLEI')}
                    value={IdUsuarioOLEI}
                    onSubmitEditing={onLogin}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TextInput
                    placeholder="Escribe Contraseña Olei"
                    placeholderTextColor="gray"                    
                    secureTextEntry
                    style={[inputStyles.input]}
                    selectionColor="black"
                    onChangeText={(value) => onChange(value, 'PasswordOLEI')}
                    value={PasswordOLEI}
                    onSubmitEditing={onLogin}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <View style={loginDBStyles.buttonContainerDB}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[buttonStyles.button, buttonStyles.yellow]}
                        onPress={onLogin}
                    >
                        <Text style={buttonStyles.buttonTextSecondary}>Ingresar</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </KeyboardAvoidingView>
    );
};