import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Platform, KeyboardAvoidingView, Keyboard, Alert, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { AuthContext } from '../../context/auth/AuthContext';
import { useTheme } from '../../context/ThemeContext';

import {  globalStyles } from '../../theme/appTheme';
import { loginStyles } from '../../theme/loginTheme';
import { inputStyles } from '../../theme/UI/inputs';
import { buttonStyles } from '../../theme/UI/buttons';

import { LoadingScreen } from '../LoadingScreen';
import { InputPassword } from '../../components/Ui/InputPassword';
import DotLoader from '../../components/Ui/DotLaoder';
import { TextInput } from 'react-native-paper';
import { useForm } from '../../hooks/useForm';


export const LoginScreen = () => {
    const { signIn, errorMessage, removeError, loggingIn } = useContext(AuthContext);
    const { theme, typeTheme } = useTheme();
    const [loadingLogin, setLoadingLogin] = useState(false)

    const { usr, pas, onChange } = useForm({
        usr: '',
        pas: ''
    });


    useEffect(() => {
        if (errorMessage.length === 0) return;
        Alert.alert('Login incorrecto', errorMessage, [{ text: 'Ok', onPress: removeError }]);
    }, []);


    const onLogin = () => {
        setLoadingLogin(true)
        Keyboard.dismiss();
        signIn({ usr, pas });
        setLoadingLogin(false)
    };


    if (loggingIn) return <LoadingScreen message='Iniciando sesion...' loading={loggingIn}/>;

    return (
        <KeyboardAvoidingView
            style={[loginStyles(theme).LoginScreen]}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={loginStyles(theme).formContainer}>

                    <Text style={loginStyles(theme).title}>Mapasoft & Morado IT Software.</Text>
                    <Text style={loginStyles(theme).textLogin}>Ingresar datos de Usuario</Text>

                    <TextInput
                        label="Escribe tu usuario."
                        placeholderTextColor={theme.text_color}
                        keyboardType="email-address"
                        style={[inputStyles(theme, typeTheme).input, globalStyles(theme).globalMarginBottomSmall, { borderWidth: 0, paddingHorizontal:  globalStyles(theme).globalPadding.padding / 2 }]}
                        selectionColor={theme.text_color}
                        onChangeText={(value) => onChange(value, 'usr')}
                        value={usr}
                        onSubmitEditing={onLogin}
                        autoCapitalize="none"
                        autoCorrect={false}
                        mode="outlined"
                        theme={{
                            ...theme,
                            colors: {
                                primary: theme.color_border,
                            },
                        }}
                    />

                    <InputPassword
                        password={pas}
                        onChange={onChange}
                        onLogin={onLogin}
                        placeholder={"Escribe tu contraseña."}
                        inputName="pas"
                    />

                    <View style={loginStyles(theme).buttonContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[buttonStyles(theme).button, buttonStyles(theme).black]}
                            onPress={onLogin}
                            disabled={loadingLogin}
                        >
                            <Text style={buttonStyles(theme, typeTheme).buttonText}>
                                {loadingLogin ? <DotLoader /> : "Iniciar sesión"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

