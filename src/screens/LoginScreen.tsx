import React, { useContext, useEffect } from 'react';

import { Text, View, TextInput, Platform, KeyboardAvoidingView, Keyboard, Alert, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/auth/AuthContext';
import { LoadingScreen } from './LoadingScreen';
import { buttonStyles } from '../theme/UI/buttons';
import { inputStyles } from '../theme/UI/inputs';
import { globalStyles } from '../theme/appTheme';

interface Props extends StackScreenProps<any, any> { }

export const LoginScreen = ({ navigation }: Props) => {

    const { signIn, errorMessage, removeError, loggingIn } = useContext(AuthContext);

    const { email, password, onChange } = useForm({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (errorMessage.length === 0) return;

        Alert.alert('Login incorrecto', errorMessage, [{
            text: 'Ok',
            onPress: removeError
        }]);

    }, [errorMessage])

    const onLogin = () => {
        Keyboard.dismiss();
        signIn({ correo: email, password });
    }

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
                        style={loginStyles.image}
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
            </View>

        </KeyboardAvoidingView>
    )
}