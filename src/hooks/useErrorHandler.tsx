import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import { sendError } from '../services/errors';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '../interface/navigation';
import { AxiosError } from 'axios';
import { CustomAxiosError, ErrorCustum } from '../interface/error';

const isAxiosError = (error: unknown): error is CustomAxiosError => {
    return (
        typeof error === 'object' &&
        error !== null &&
        'isAxiosError' in error &&
        (error as { isAxiosError: boolean }).isAxiosError === true
    );
};


const useErrorHandler = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigation = useNavigation<AppNavigationProp>();

    const handleError = async (error: unknown, avoidAPI?: boolean, avoidToast?: boolean): Promise<void> => {
        if (isAxiosError(error)) {
            // Supongamos que tienes valores por defecto en statusCode y Metodo definidos en otro lado.
            const status = error.response?.status;
            const method = error.response?.config?.method;

            const message =
                error.response?.data?.error ??
                error.response?.data?.message ??
                "Error desconocido";

            console.log({
                status: JSON.stringify(status, null, 2),
                method: JSON.stringify(method, null, 2),
                message: JSON.stringify(message, null, 2),
            });

            if (status === 401) {
                navigation.navigate('SessionExpiredScreen');
                return logOut?.();
            };

            if (!avoidAPI) {
                await sendError({
                    From: `${user.idusrmob}`,
                    Message: message,
                    Id_Usuario: user.idusrmob,
                    Metodo: method || '',
                    code: status?.toString() || ''
                });
            }

            if (!avoidToast) {
                Toast.show({
                    type: 'tomatoError',
                    text1: message
                });
            }

            if (status === 500) {
                navigation.navigate('SessionExpiredScreen');
                logOut?.();
                return;
            };

        } else {
            console.log("Unknown error:", JSON.stringify(error, null, 2));
        }
    };

    const handleErrorCustum = async (error: ErrorCustum) => {
        const { status, Message, Metodo } = error ?? {};

        console.error({ status, Metodo, Message });

        if (status === 401) {
            navigation.navigate('SessionExpiredScreen');
            return logOut?.();
        };


        await sendError({
            From: `${user.idusrmob}`,
            Message: Message,
            Id_Usuario: user.idusrmob,
            Metodo: Metodo || '',
            code: status?.toString() || ''
        });

        Toast.show({
            type: 'tomatoError',
            text1: Message
        });

        if (status === 500) {
            navigation.navigate('SessionExpiredScreen');
            logOut?.();
            return;
        };

        setTimeout(() => {
            if (navigation?.canGoBack()) {
                navigation.goBack();
            }
        }, 300);
    };

    return {
        handleError,
        handleErrorCustum
    };
};

const useCatchError = (errorValue: unknown) => {

    let errorMessage;

    if (errorValue instanceof AxiosError && errorValue.response) {
        let erroBadRequest = errorValue.response.data.errors[0].message
        errorMessage = errorValue.response.data.error || erroBadRequest || 'Error en el servidor';
    } else if (errorValue instanceof Error) {
        errorMessage = errorValue.message;
    } else {
        errorMessage = 'Error desconocido';
    }

    return {
        errorMessage
    }
}

export default useErrorHandler;

export {
    useCatchError
}


