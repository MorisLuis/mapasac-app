import React from 'react';
import { useReducer, useEffect, useState } from 'react';
import UserInterface from '../../interface/user';
import { authReducer } from './authReducer';
import { api } from '../../api/api';
import { AuthContext } from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    token: string | null;
    errorMessage: string;
    user: UserInterface | null;
}

export interface LoginResponse {
    usuario: UserInterface;
    token: string;
}

export interface LoginData {
    correo: string;
    password: string;
}

export interface RegisterData {
    correo:   string;
    password: string;
    nombre:   string;
}

const AUTH_INITIAL_STATE: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}


export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const [loggingIn, setLoggingIn] = useState(false)

    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');

        
        // No token, no autenticado
        if (!token) return dispatch({ type: 'notAuthenticated' });

        // Hay token
        const resp = await api.get('/api/auth/renew', {
            headers: {
                'Content-type': 'application/json',
                'x-token': token || ''
            }
        });

        if (resp.status !== 200) {
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
    }

    const signIn = async ({ correo, password }: LoginData) => {
        setLoggingIn(true)
        try {
            state.status = "checking"
            const {data} = await api.post('/api/auth/login', { email: correo, password });

            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.user
                }
            });

            await AsyncStorage.setItem('token', data.token);

        } catch (error: any) {
            setLoggingIn(false)

            dispatch({
                type: 'addError',
                payload: error?.response?.data?.msg || 'Información incorrecta'
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

    return (
        <AuthContext.Provider value={{
            ...state,
            signIn,
            loggingIn,
            logOut,
            removeError,
        }}>
            {children}
        </AuthContext.Provider>

    )
};