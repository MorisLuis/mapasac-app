import { DbAuthState, userDB } from "./DbAuthProvider";

type AuthAction =
    | { type: 'signUp', payload: { tokenDB: string, userDB: userDB } }
    | { type: 'addError', payload: string }
    | { type: 'removeError' }
    | { type: 'notAuthenticated' }
    | { type: 'logout' }


export const dbAuthReducer = (state: DbAuthState, action: AuthAction): DbAuthState => {

    switch (action.type) {
        case 'addError':
            return {
                ...state,
                userDB: null,
                status: 'dbNot-authenticated',
                tokenDB: null,
                errorMessage: action.payload
            }

        case 'removeError':
            return {
                ...state,
                errorMessage: ''
            };

        case 'signUp':
            return {
                ...state,
                errorMessage: '',
                status: 'dbAuthenticated',
                tokenDB: action.payload.tokenDB,
                userDB: action.payload.userDB
            }

        case 'logout':
        case 'notAuthenticated':
            return {
                ...state,
                status: 'dbNot-authenticated',
                tokenDB: null,
                userDB: null
            }

        default:
            return state;
    }


}


