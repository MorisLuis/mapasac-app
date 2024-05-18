import React, { useReducer, useEffect, useState } from 'react';
import { api } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { dbAuthReducer } from './dbAuthReducer';
import { DbAuthContext } from './DbAuthContext';

export interface userDB {
    servidor: string;
    database: string
}

export interface DbAuthState {
    status: 'dbChecking' | 'dbAuthenticated' | 'dbNot-authenticated';
    tokenDB: string | null;
    errorMessage: string;
    userDB: userDB | null;

}

export interface LoginResponse {
    userDB: userDB;
    tokenDB: string;
}

export interface LoginData {
    servidor: string;
    database: string;
}

export interface RegisterData {
    servidor: string;
    database: string;
    nombre: string;
}

const AUTH_INITIAL_STATE: DbAuthState = {
    status: 'dbChecking',
    tokenDB: null,
    userDB: null,
    errorMessage: '',
}


export const DbAuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(dbAuthReducer, AUTH_INITIAL_STATE);
    const [loggingIn, setLoggingIn] = useState(false);
    const navigation = useNavigation<any>();


    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async () => {

        try {
            const token = await AsyncStorage.getItem('tokenDB');

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
    
            await AsyncStorage.setItem('tokenDB', resp.data.token);
            dispatch({
                type: 'signUp',
                payload: {
                    tokenDB: resp.data.tokenDB,
                    userDB: resp.data.userDB
                }
            });

        } catch (error) {
            console.log({errorincheck: error})
        }
    }


    const signInDB = async ({ servidor, database }: LoginData) => {
        setLoggingIn(true)
        try {
            state.status = "dbChecking"
            const { data } = await api.post('/api/auth/loginDB', { servidor, database });

            dispatch({
                type: 'signUp',
                payload: {
                    tokenDB: data.tokenDB,
                    userDB: data.userDB
                }
            });

            await AsyncStorage.setItem('tokenDB', data.tokenDB);


        } catch (error: any) {
            setLoggingIn(false)

            dispatch({
                type: 'addErrorDB',
                payload: (error.response ? error.response.data.error : error.message )|| 'Información incorrecta'
            })
        }
    };

    const logOut = async () => {
        setLoggingIn(false);
        await AsyncStorage.removeItem('tokenDB');
        dispatch({ type: 'logout' });
    };

    const removeError = () => {
        dispatch({ type: 'removeError' });
    };


    return (
        <DbAuthContext.Provider value={{
            ...state,
            signInDB,
            loggingIn,
            logOut,
            removeError
        }}>
            {children}
        </DbAuthContext.Provider>

    )
};