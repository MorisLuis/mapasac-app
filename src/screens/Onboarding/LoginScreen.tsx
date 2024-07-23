import React, { useContext, useEffect, useState } from 'react';
import { Text, View, TextInput, Platform, KeyboardAvoidingView, Keyboard, Alert, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { AuthContext } from '../../context/auth/AuthContext';
import { useTheme } from '../../context/ThemeContext';

import { globalStyles } from '../../theme/appTheme';
import { loginStyles } from '../../theme/loginTheme';
import { inputStyles } from '../../theme/UI/inputs';
import { buttonStyles } from '../../theme/UI/buttons';

import { LoadingScreen } from '../LoadingScreen';
import useKeyboardStatus from '../../hooks/useKeyboardStatus';
import { useForm } from '../../hooks/useForm';
import { InputPassword } from '../../components/Ui/InputPassword';

export const LoginScreen = () => {
    const { signIn, errorMessage, removeError, loggingIn } = useContext(AuthContext);
    const { theme, typeTheme } = useTheme();

    const { usr, pas, onChange } = useForm({
        usr: '',
        pas: ''
    });

    useEffect(() => {
        if (errorMessage.length === 0) return;
        Alert.alert('Login incorrecto', errorMessage, [{ text: 'Ok', onPress: removeError }]);
    }, []);

    const onLogin = () => {
        Keyboard.dismiss();
        signIn({ usr, pas });
    };


    const keyboardActive = useKeyboardStatus();
    if (loggingIn) return <LoadingScreen message='Iniciando sesion...'/>;

    return (
        <KeyboardAvoidingView
            style={[loginStyles(theme).LoginScreen]}
            behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <View style={loginStyles(theme).formContainer}>

                    <Text style={loginStyles(theme).title}>Bienvenido!</Text>
                    <Text style={loginStyles(theme).textLogin}>Ingresar datos de Usuario</Text>

                    <TextInput
                        placeholder="Escribe tu Id Usuario..."
                        placeholderTextColor={theme.text_color}
                        keyboardType="email-address"
                        style={[inputStyles(theme, typeTheme).input, globalStyles(theme).globalMarginBottom]}
                        selectionColor={theme.text_color}
                        onChangeText={(value) => onChange(value, 'usr')}
                        value={usr}
                        onSubmitEditing={onLogin}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <InputPassword
                        password={pas}
                        onChange={onChange}
                        onLogin={onLogin}
                        placeholder={"Escribe tu contraseña..."}
                        inputName="pas"
                    />

                    <View style={loginStyles(theme).buttonContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[buttonStyles(theme).button, buttonStyles(theme).black]}
                            onPress={onLogin}
                        >
                            <Text style={buttonStyles(theme).buttonText}>Iniciar sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

