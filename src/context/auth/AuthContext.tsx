import { createContext } from 'react';
import { LoginData } from './AuthProvider';
import UserInterface from '../../interface/user';

type ContextProps = {
    errorMessage: string;
    token: string | null;
    user: UserInterface | null;
    codeBar?: string; 
    codeBarStatus?: boolean;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    loggingIn: boolean;
    signIn: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
    updateBarCode: (value: string) => void;
    updateTypeOfMovements: (value: number) => void;
    handleCodebarScannedProcces: (value: boolean) => void;
    handleSetupUser: (value: UserInterface) => void;
}


export const AuthContext = createContext({} as ContextProps );