import React from 'react';
import { useReducer, useEffect, useState } from 'react';

import UserInterface from '../../interface/user';
import { authReducer } from './authReducer';
import { AuthContext } from './AuthContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { postLogin, renewLogin } from '../../services/auth';

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    token: string | null;
    errorMessage: string;
    user: UserInterface | null;
    codeBar?: string;
    codeBarStatus?: boolean
}

export interface LoginResponse {
    usuario: UserInterface;
    token: string;
}

export interface LoginData {
    usr: string;
    pas: string;
}

const AUTH_INITIAL_STATE: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: '',
    codeBar: "",
    codeBarStatus: false
}


export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const [loggingIn, setLoggingIn] = useState(false);
    const navigation = useNavigation<any>();

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
            const resp = await renewLogin({ token })

            if (resp?.status !== 200) {
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
            console.log({ errorAuthToken: error })
            return dispatch({ type: 'notAuthenticated' });
        }
    }

    const signIn = async ({ usr, pas }: LoginData) => {
        setLoggingIn(true)

        try {
            state.status = "checking"
            const data = await postLogin({ usr, pas })

            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.user
                }
            });

            await AsyncStorage.setItem('token', data.token);

        } catch (error: any) {
            console.log({ error })
            setLoggingIn(false)

            dispatch({
                type: 'addError',
                payload: (error.response ? error.response.data.error : error.message) || 'Información incorrecta'
            })
        }
    };

    const logOut = async () => {
        setLoggingIn(false);
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logout' });
    };

    const removeError = () => {
        dispatch({ type: 'removeError' });
    };


    // TEMPORAL
    const getTypeOfMovementsName = () => {
        return "Inventario"
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            signIn,
            loggingIn,
            logOut,
            removeError,
            getTypeOfMovementsName
            /* updateTypeOfMovements */
        }}>
            {children}
        </AuthContext.Provider>

    )
};