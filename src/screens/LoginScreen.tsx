import React, { useContext, useEffect } from 'react';
import { Text, View, TextInput, Platform, KeyboardAvoidingView, Keyboard, Alert, TouchableOpacity } from 'react-native';


import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/auth/AuthContext';

interface Props extends StackScreenProps<any, any> { }

export const LoginScreen = ({ navigation }: Props) => {

    const { signIn, errorMessage, removeError } = useContext(AuthContext);

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

    return (
        <>
            {/* Background */}
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            >


                <View style={loginStyles.formContainer}>
                    {/* Keyboard avoid view */}

                    <Text style={loginStyles.title}>Login</Text>

                    <Text style={loginStyles.label}>Email:</Text>
                    <TextInput
                        placeholder="Ingrese su email"
                        placeholderTextColor="black"
                        keyboardType="email-address"
                        underlineColorAndroid="black"
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                        ]}
                        selectionColor="black"

                        onChangeText={(value) => onChange(value, 'email')}
                        value={email}
                        onSubmitEditing={onLogin}


                        autoCapitalize="none"
                        autoCorrect={false}
                    />


                    <Text style={loginStyles.label}>Contraseña:</Text>
                    <TextInput
                        placeholder="Ingrese su constraseña"
                        placeholderTextColor="black"
                        underlineColorAndroid="black"
                        secureTextEntry
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                        ]}
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
                            style={loginStyles.button}
                            onPress={onLogin}
                        >
                            <Text style={loginStyles.buttonText} >Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </KeyboardAvoidingView>
        </>
    )
}
