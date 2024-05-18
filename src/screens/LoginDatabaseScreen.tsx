import React, { useContext, useEffect, useState } from 'react';

import { Text, View, TextInput, Platform, KeyboardAvoidingView, Keyboard, Alert, TouchableOpacity, Image } from 'react-native';
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


export const LoginDatabaseScreen = () => {
    const { signInDB, errorMessage, removeError, loggingIn } = useContext(DbAuthContext);
    const { servidor, database, onChange } = useForm({ servidor: '', database: '' });

    useEffect(() => {
        if (errorMessage.length === 0) return;

        Alert.alert('Login incorrecto LOGINDB', errorMessage, [{
            text: 'Ok',
            onPress: removeError
        }]);

    }, [errorMessage]);

    const onLogin = () => {
        Keyboard.dismiss();
        signInDB({ servidor, database });
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
                    <Logo width={keyboardActive ? "35%" : "60%"} height={200} />
                </View>

                <View style={loginDBStyles.imageContainer}>
                    <Banner width={keyboardActive ? "50%" : "90%"} height={200} />
                </View>

                <View style={loginDBStyles.headers}>
                    <Text style={[keyboardActive ? loginDBStyles.titleDBActive : loginDBStyles.titleDB]}>Con OLEI APP agilice la captura de sus movimientos</Text>
                    <Text style={[globalStyles.globalMarginBottom, globalStyles.globalMarginBottom]}>
                        Iniciemos conectadonos a tu base de datos.
                    </Text>
                </View>

                <TextInput
                    placeholder="Escribe el servidor..."
                    placeholderTextColor="black"
                    keyboardType="email-address"
                    underlineColorAndroid="black"
                    style={[inputStyles.input, globalStyles.globalMarginBottom]}
                    selectionColor="black"
                    onChangeText={(value) => onChange(value, 'servidor')}
                    value={servidor}
                    onSubmitEditing={onLogin}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TextInput
                    placeholder="Escribe la base de datos..."
                    placeholderTextColor="black"
                    underlineColorAndroid="black"
                    
                    secureTextEntry
                    style={[inputStyles.input]}
                    selectionColor="black"
                    onChangeText={(value) => onChange(value, 'database')}
                    value={database}
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