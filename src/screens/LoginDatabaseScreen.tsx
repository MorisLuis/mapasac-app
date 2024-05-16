import React, { useContext, useEffect, useState } from 'react';

import { Text, View, TextInput, Platform, KeyboardAvoidingView, Keyboard, Alert, TouchableOpacity, Image } from 'react-native';
import { useForm } from '../hooks/useForm';
import useKeyboardStatus from '../hooks/useKeyboardStatus';
import { LoadingScreen } from './LoadingScreen';

import { loginStyles } from '../theme/loginTheme';
import { buttonStyles } from '../theme/UI/buttons';
import { inputStyles } from '../theme/UI/inputs';
import { globalStyles } from '../theme/appTheme';
import { DbAuthContext } from '../context/dbAuth/DbAuthContext';


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
            style={loginStyles.LoginDBScreen}
            behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
        >
            <View style={loginStyles.formContainer}>
                <View style={loginStyles.imageContainer}>
                    <Image
                        style={[keyboardActive ? loginStyles.imageActived : loginStyles.image]}
                        source={require('../assets/logo01.png')}
                    />
                </View>
                <Text style={[loginStyles.title]}>Ingresa a tu cuenta!</Text>
                <Text style={[globalStyles.globalMarginBottom, globalStyles.globalMarginBottom]}>
                    Iniciemos conectadonos a tu base de datos.
                </Text>
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
                <View style={loginStyles.buttonContainer}>
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