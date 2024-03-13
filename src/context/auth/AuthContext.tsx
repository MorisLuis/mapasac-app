import { createContext } from 'react';
import { LoginData } from './AuthProvider';
import UserInterface from '../../interface/user';

type ContextProps = {
    errorMessage: string;
    token: string | null;
    user: UserInterface | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    loggingIn: boolean;
    signIn: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
    updateTypeOfMovements: (value: number) => void;
}


export const AuthContext = createContext({} as ContextProps );