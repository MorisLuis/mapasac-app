import React, { useContext } from 'react';
import { useReducer, useEffect, useState } from 'react';

import { api } from '../../api/api';
import UserInterface from '../../interface/user';
import { authReducer } from './authReducer';
import { AuthContext } from './AuthContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { DbAuthContext } from '../dbAuth/DbAuthContext';
import { useTheme } from '../ThemeContext';

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
    Id_Usuario: string;
    password: string;
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
    const { status } = useContext(DbAuthContext);

    const [currentScreen, setCurrentScreen] = React.useState('');
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('state', () => {
            setCurrentScreen(navigation.getCurrentRoute().name);
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        const statusLogin = state.status;
        const statusLoginDatabase = status;

        if (statusLoginDatabase == 'dbChecking' && statusLogin == 'checking') {
            return;
        }

        if (statusLoginDatabase == 'dbNot-authenticated' && statusLogin == 'not-authenticated') {

            if(currentScreen === 'LoginDatabaseScreen') return;
            
            return navigation.reset({
                index: 0,
                routes: [{ name: 'LoginDatabaseScreen' }],
            })
        }

        if (statusLoginDatabase == 'dbAuthenticated' && statusLogin == 'not-authenticated') {

            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginPage' }],
            })
            return;
        }

        if (statusLogin === 'authenticated') {
            navigation.navigate('typeOfMovementScreen')
        }

    }, [state.status, status])

    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async () => {

        try {
            const token = await AsyncStorage.getItem('token');

            // No token, no autenticado
            if (!token) return dispatch({ type: 'notAuthenticated' });

            // Hay token
            const resp = await api.get('/api/auth/renewLogin', {
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

        } catch (error) {
            console.log({ errorAuthToken: error })
            return dispatch({ type: 'notAuthenticated' });
        }
    }

    const signIn = async ({ Id_Usuario, password }: LoginData) => {
        setLoggingIn(true)

        try {
            state.status = "checking"
            const { data } = await api.post('/api/auth/login', { Id_Usuario, password });

            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.user
                }
            });

            await AsyncStorage.setItem('token', data.token);

        } catch (error: any) {
            console.log({error})
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


    const updateTypeOfMovements = async (value: number) => {
        try {
            const getTypeOfMovements = await api.put(`/api/typeofmovements`, { Id_TipoMovInv: value });
            const typeOfMov = getTypeOfMovements.data;
            dispatch({ type: '[Settings] - typeOfMovement', user: { ...state.user as UserInterface, Id_TipoMovInv: typeOfMov.user.Id_TipoMovInv} });
            Toast.show({
                type: 'tomatoToast',
                text1: 'Se cambio el tipo de movimiento!'
            })
        } catch (error: any) {
            console.log({ error: error })
        }
    }



    const getTypeOfMovementsName = () => {
        let name;
        if (state.user?.Id_TipoMovInv?.Accion === 1 && state.user?.Id_TipoMovInv?.Id_TipoMovInv === 0) { // Inventario fisico
            name = "Inventario"
        } else if (state.user?.Id_TipoMovInv?.Accion === 1) {
            name = "Entrada"
        } else if (state.user?.Id_TipoMovInv?.Accion === 2) {
            name = "Salida"
        } else {
            name = "Traspaso"
        }
        return name
    }


    return (
        <AuthContext.Provider value={{
            ...state,
            signIn,
            loggingIn,
            logOut,
            removeError,  
            updateTypeOfMovements,
            getTypeOfMovementsName       
        }}>
            {children}
        </AuthContext.Provider>

    )
};