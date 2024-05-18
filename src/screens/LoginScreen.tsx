import React, { useContext, useEffect } from 'react';

import { Text, View, TextInput, Platform, KeyboardAvoidingView, Keyboard, Alert, TouchableOpacity, Image } from 'react-native';
import { useForm } from '../hooks/useForm';
import { AuthContext } from '../context/auth/AuthContext';
import { LoadingScreen } from './LoadingScreen';
import useKeyboardStatus from '../hooks/useKeyboardStatus';

import { loginStyles } from '../theme/loginTheme';
import { buttonStyles } from '../theme/UI/buttons';
import { inputStyles } from '../theme/UI/inputs';
import { globalStyles } from '../theme/appTheme';
import { DbAuthContext } from '../context/dbAuth/DbAuthContext';


export const LoginScreen = () => {

    const { signIn, errorMessage, removeError, loggingIn } = useContext(AuthContext);
    const {  logOut } = useContext(DbAuthContext);

    const { email, password, onChange } = useForm({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (errorMessage.length === 0) return;

        console.log({errorMessage})

        Alert.alert('Login incorrecto LOGIN', errorMessage, [{
            text: 'Ok',
            onPress: removeError
        }]);

    }, [errorMessage])

    const onLogin = () => {
        Keyboard.dismiss();
        signIn({ correo: email, password });
    }

    const keyboardActive = useKeyboardStatus();

    if (loggingIn) return <LoadingScreen />

    return (
        <KeyboardAvoidingView
            style={loginStyles.LoginScreen}
            behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
        >
            <View style={loginStyles.formContainer}>

                {/* Keyboard avoid view */}

                <View style={loginStyles.imageContainer}>
                    <Image
                        style={[keyboardActive ? loginStyles.logoActived : loginStyles.logo]}
                        source={require('../assets/logo01.png')}
                    />
                </View>


                <Text style={[loginStyles.title]}>Bienvenido!</Text>
                <Text style={[globalStyles.globalMarginBottom, globalStyles.globalMarginBottom]}>Por favor, inicia sesión abajo.</Text>

                <TextInput
                    placeholder="Escribe tu e-mail..."
                    placeholderTextColor="black"
                    keyboardType="email-address"
                    underlineColorAndroid="black"
                    style={[inputStyles.input, globalStyles.globalMarginBottom]}
                    selectionColor="black"

                    onChangeText={(value) => onChange(value, 'email')}
                    value={email}
                    onSubmitEditing={onLogin}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <TextInput
                    placeholder="Escribe tu contraseña..."
                    placeholderTextColor="black"
                    underlineColorAndroid="black"
                    secureTextEntry
                    style={[inputStyles.input]}
                    selectionColor="black"
                    onChangeText={(value) => onChange(value, 'password')}
                    value={password}
                    onSubmitEditing={onLogin}
                    autoCapitalize="none"
                    autoCorrect={false}
                />


                {/* Boton login */}
                <View style={loginStyles.buttonContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[buttonStyles.button, buttonStyles.black]}
                        onPress={onLogin}
                    >
                        <Text style={buttonStyles.buttonText} >Iniciar sesión</Text>
                    </TouchableOpacity>
                </View>

                <View style={loginStyles.buttonContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[buttonStyles.button, buttonStyles.white]}
                        onPress={logOut}
                    >
                        <Text style={buttonStyles.buttonTextSecondary} >Cerrar DB</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </KeyboardAvoidingView>
    )
}