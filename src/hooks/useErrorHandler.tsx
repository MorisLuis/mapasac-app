import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import { sendError } from '../services/errors';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '../navigator/AppNavigation';

export const useErrorHandler = () => {
    const { logOut, user } = useContext(AuthContext);
    const navigation = useNavigation<AppNavigationProp>();

    const handleError = async (error: any) => {
        const { status: statusCode, Message, Metodo } = error ?? {}

        const status = error?.response?.status || statusCode;
        const method = error?.response?.config?.method;

        const message = error?.response?.data?.error
            ? error?.response?.data?.error
            : error?.response?.data?.message
                ? error?.response?.data?.message
                : error?.message
                    ? error?.message
                    : error;

        if (status === 401) {
            console.log("session ended");
            navigation.navigate('OnboardingScreen');
            return logOut?.();
        }

        await sendError({
            From: `${user.idusrmob}`,
            Message: message || Message,
            Id_Usuario: user.idusrmob,
            Metodo: method || Metodo || '',
            code: status.toString()
        });

        Toast.show({
            type: 'error',
            text1: 'Algo salió mal!'
        });

        // Verifica si es posible ir hacia atrás
        setTimeout(() => {
            if (navigation?.canGoBack()) {
                navigation.goBack();
            }
        }, 300);
    };
    return { handleError };
};


export default useErrorHandler;
