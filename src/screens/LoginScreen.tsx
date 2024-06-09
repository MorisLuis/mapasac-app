import React, { useContext, useEffect } from 'react';

import { Text, View, TextInput, Platform, KeyboardAvoidingView, Keyboard, Alert, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useForm } from '../hooks/useForm';
import { AuthContext } from '../context/auth/AuthContext';
import { LoadingScreen } from './LoadingScreen';
import useKeyboardStatus from '../hooks/useKeyboardStatus';
import Icon from 'react-native-vector-icons/Ionicons';

import { loginStyles } from '../theme/loginTheme';
import { buttonStyles } from '../theme/UI/buttons';
import { inputStyles } from '../theme/UI/inputs';
import { globalStyles } from '../theme/appTheme';
import { useNavigation } from '@react-navigation/native';

export const LoginScreen = () => {

    const { signIn, errorMessage, removeError, loggingIn, user } = useContext(AuthContext);
    const navigation = useNavigation<any>();

    const { Id_Usuario, password, onChange } = useForm({
        Id_Usuario: '',
        password: ''
    });

    useEffect(() => {
        if (errorMessage.length === 0) return;

        Alert.alert('Login incorrecto', errorMessage ? errorMessage : errorMessage, [{
            text: 'Ok',
            onPress: removeError
        }]);

    }, [])

    const onLogin = () => {
        Keyboard.dismiss();
        signIn({ Id_Usuario, password });
    }

    const handleNavigateToProfile = () => {
        navigation.navigate('personalInformationScreen', { fromLogIn: true });
    }

    const keyboardActive = useKeyboardStatus();

    if (loggingIn) return <LoadingScreen />

    return (
        <KeyboardAvoidingView
            style={loginStyles.LoginScreen}
            behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <View style={loginStyles.formContainer}>

                    {/* Keyboard avoid view */}

                    <View style={loginStyles.imageContainer}>
                        <Image
                            style={[keyboardActive ? loginStyles.logoActived : loginStyles.logo]}
                            source={require('../assets/logo01.png')}
                        />
                    </View>


                    <Text style={loginStyles.title}>Bienvenido!</Text>
                    <Text style={loginStyles.textLogin}>Ingresar datos de Usuario</Text>

                    <TextInput
                        placeholder="Escribe tu Id Usuario..."
                        placeholderTextColor="gray"
                        keyboardType="email-address"
                        style={[inputStyles.input, globalStyles.globalMarginBottom]}
                        selectionColor="black"

                        onChangeText={(value) => onChange(value, 'Id_Usuario')}
                        value={Id_Usuario}
                        onSubmitEditing={onLogin}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <TextInput
                        placeholder="Escribe tu contraseña..."
                        placeholderTextColor="gray"
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

                    {/* <View style={loginStyles.buttonContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[buttonStyles.button, buttonStyles.white]}
                        onPress={logOut}
                    >
                        <Text style={buttonStyles.buttonTextSecondary} >Cerrar DB</Text>
                    </TouchableOpacity>
                </View> */}
                </View>

                <TouchableOpacity style={loginStyles.footer} onPress={handleNavigateToProfile}>
                    <Text style={loginStyles.footerText}>Configuración</Text>
                    <Icon name="cog-outline" size={20} color="black" />
                </TouchableOpacity>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}