import React, { useContext, useEffect } from 'react';
import { Text, View, TextInput, Platform, KeyboardAvoidingView, Keyboard, Alert, TouchableOpacity, Image, SafeAreaView, Button } from 'react-native';
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../context/auth/AuthContext';
import { LoadingScreen } from '../LoadingScreen';
import useKeyboardStatus from '../../hooks/useKeyboardStatus';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../../theme/appTheme';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { loginStyles } from '../../theme/loginTheme';
import { inputStyles } from '../../theme/UI/inputs';
import { buttonStyles } from '../../theme/UI/buttons';

export const LoginScreen = () => {
    const { signIn, errorMessage, removeError, loggingIn } = useContext(AuthContext);
    const { theme, toggleTheme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black"

    const navigation = useNavigation<any>();
    const { Id_Usuario, password, onChange } = useForm({
        Id_Usuario: '',
        password: ''
    });

    useEffect(() => {
        if (errorMessage.length === 0) return;
        Alert.alert('Login incorrecto', errorMessage, [{ text: 'Ok', onPress: removeError }]);
    }, [errorMessage]);

    const onLogin = () => {
        Keyboard.dismiss();
        signIn({ Id_Usuario, password });
    };

    const handleNavigateToProfile = () => {
        navigation.navigate('BottomNavigation', {
            screen: 'BottomNavigation - Profile', params: {
                screen: '[ProfileNavigation] - personalInformationScreen',
                params: { fromLogIn: true }
            }
        });
    };

    const keyboardActive = useKeyboardStatus();
    if (loggingIn) return <LoadingScreen />;

    return (
        <KeyboardAvoidingView
            style={[loginStyles(theme).LoginScreen]}
            behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <View style={loginStyles(theme).formContainer}>
                    <View style={loginStyles(theme).imageContainer}>
                        <Image
                            style={[keyboardActive ? loginStyles(theme).logoActived : loginStyles(theme).logo]}
                            source={require('../../assets/logo01.png')}
                        />
                    </View>
                    <Text style={loginStyles(theme).title}>Bienvenido!</Text>
                    <Text style={loginStyles(theme).textLogin}>Ingresar datos de Usuario</Text>

                    <TextInput
                        placeholder="Escribe tu Id Usuario..."
                        placeholderTextColor={theme.text_color}          
                        keyboardType="email-address"
                        style={[inputStyles(theme).input, globalStyles(theme).globalMarginBottom]}
                        selectionColor={theme.text_color}
                        onChangeText={(value) => onChange(value, 'Id_Usuario')}
                        value={Id_Usuario}
                        onSubmitEditing={onLogin}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <TextInput
                        placeholder="Escribe tu contraseña..."
                        placeholderTextColor={theme.text_color}          
                        secureTextEntry
                        style={[inputStyles(theme).input]}
                        selectionColor={theme.text_color}
                        onChangeText={(value) => onChange(value, 'password')}
                        value={password}
                        onSubmitEditing={onLogin}
                        autoCapitalize="none"
                        autoCorrect={false}
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

                <TouchableOpacity style={loginStyles(theme).footer} onPress={handleNavigateToProfile}>
                    <Text style={loginStyles(theme).footerText}>Configuración</Text>
                    <Icon name="cog-outline" size={20} color={iconColor} />
                </TouchableOpacity>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

