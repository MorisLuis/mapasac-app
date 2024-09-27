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
        console.log({ errorFHOOK: error })
        const { status: statusCode, Message, Metodo } = error ?? {}

        const status = error?.response?.status || statusCode;
        const method = error?.response?.config?.method || Metodo;

        const message = error?.response?.data?.error
            ? error?.response?.data?.error
            : error?.response?.data?.message
                ? error?.response?.data?.message
                : error?.message
                    ? error?.message
                    : error;

        /* await sendError({
            From: `${user.idusrmob}`,
            Message: message || Message,
            Id_Usuario: user.idusrmob,
            Metodo: method || Metodo || '',
            code: status?.toString()
        }); */

        if (status === 401) {
            console.log("session ended");
            navigation.navigate('LoginPage');
            return logOut?.();
        }

        if (status === 400 || status === 404) {
            if (navigation?.canGoBack()) {
                return navigation.goBack();
            }
        }

        if (method === undefined) return;

        Toast.show({
            type: 'error',
            text1: 'Algo salió mal!'
        });
    };
    return { handleError };
};


export default useErrorHandler;
