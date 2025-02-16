import React, { ReactNode } from 'react';
import { useReducer, useEffect, useState } from 'react';

import UserInterface from '../../interface/user';
import { authReducer } from './authReducer';
import { AuthContext } from './AuthContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { postLogin, renewLogin } from '../../services/auth';
import { api } from '../../api/api';
import useErrorHandler from '../../hooks/useErrorHandler';
import { AppNavigationProp } from '../../interface/navigation';

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    token: string | null;
    errorMessage: string;
    user: UserInterface;
    codeBar?: string;
    codeBarStatus?: boolean
}

export interface LoginData {
    usr: string;
    pas: string;
}

export const USER_INITIAL_STATE = {
    idusrmob: 0,
    idsucursal: 0,
    port: 0,
    usrdba: '',
    pasdba: ''
}

const AUTH_INITIAL_STATE: AuthState = {
    status: 'checking',
    token: null,
    user: USER_INITIAL_STATE,
    errorMessage: '',
    codeBar: "",
    codeBarStatus: false
}


export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const [loggingIn, setLoggingIn] = useState(false);
    const navigation = useNavigation<AppNavigationProp>();
    const { handleError } = useErrorHandler()

    useEffect(() => {
        const statusLogin = state.status;
        if (statusLogin == 'checking') {
            return;
        }

        if (statusLogin == 'not-authenticated') {

            return navigation.reset({
                index: 0,
                routes: [{ name: 'LoginPage' }],
            })
        }

        if (statusLogin === 'authenticated') {
            navigation.navigate('OnboardingScreen')
        }

    }, [state.status])

    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            // No token, no autenticado
            if (!token) return dispatch({ type: 'notAuthenticated' });

            // Hay token
            const resp = await renewLogin(token);

            // Verificamos si resp contiene error
            if ('error' in resp) {
                return dispatch({ type: 'notAuthenticated' });
            }

            await AsyncStorage.setItem('token', resp.data.token);
            dispatch({
                type: 'signUp',
                payload: {
                    token: resp.data.token,
                    user: resp.data.user
                }
            });

        } catch (error) {
            return dispatch({ type: 'notAuthenticated' });
        }
    };

    const signIn = async ({ usr, pas }: LoginData) => {
        setLoggingIn(true);

        try {
            state.status = "checking";
            const data = await postLogin({ usr, pas });

            // Si el objeto devuelto tiene la propiedad 'error', lanzamos el error.
            if ("error" in data) {
                throw new Error(data.error);
            }

            await AsyncStorage.setItem("token", data.token);

            dispatch({
                type: "signUp",
                payload: {
                    token: data.token,
                    user: data.user,
                },
            });
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Información incorrecta";
            dispatch({
                type: "addError",
                payload: errorMessage,
            });
        } finally {
            // Se retrasa un poco para evitar ver la pantalla de login antes del sign in.
            setTimeout(() => {
                setLoggingIn(false);
            }, 300);
        }
    };


    const logOut = async (isExpired?: boolean) => {

        try {
            setLoggingIn(false);
            if (!isExpired) await api.get('/api/auth/logout');
            AsyncStorage.removeItem('token');
            dispatch({ type: 'logout' });
            if (!isExpired) {
                navigation.goBack();
                navigation.navigate('LoginPage')
            };
        } catch (error) {
            handleError(error)
        }
    };

    const removeError = () => {
        dispatch({ type: 'removeError' });
    };


    return (
        <AuthContext.Provider value={{
            ...state,
            signIn,
            loggingIn,
            logOut,
            removeError
        }}>
            {children}
        </AuthContext.Provider>

    )
};