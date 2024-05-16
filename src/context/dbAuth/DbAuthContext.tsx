import { createContext } from 'react';
import { LoginData, userDB } from './DbAuthProvider';

type ContextProps = {
    errorMessage: string;
    tokenDB: string | null;
    userDB: userDB | null;
    status: 'dbChecking' | 'dbAuthenticated' | 'dbNot-authenticated';
    loggingIn: boolean;
    signInDB: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
}


export const DbAuthContext = createContext({} as ContextProps );