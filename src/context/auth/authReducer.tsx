import UserInterface from "../../interface/user";

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    token: string | null;
    errorMessage: string;
    user: UserInterface | null;
    codeBar?: string;
    codeBarStatus?: boolean
}

type AuthAction =
    | { type: 'signUp', payload: { token: string, user: UserInterface } }
    | { type: 'addError', payload: string }
    | { type: 'removeError' }
    | { type: 'notAuthenticated' }
    | { type: 'logout' }
    | { type: 'typeOfMovement', user: UserInterface }
    | { type: 'codeBar', codeBar: string }
    | { type: 'codeBarStatus', codeBarStatus: boolean }


export const authReducer = (state: AuthState, action: AuthAction): AuthState => {

    switch (action.type) {
        case 'addError':
            return {
                ...state,
                user: null,
                status: 'not-authenticated',
                token: null,
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
                status: 'authenticated',
                token: action.payload.token,
                user: action.payload.user
            }

        case 'logout':
        case 'notAuthenticated':
            return {
                ...state,
                status: 'not-authenticated',
                token: null,
                user: null
            }

        case 'typeOfMovement':
            return {
                ...state,
                user: { ...action.user }
            }

        case 'codeBar':
            return {
                ...state,
                codeBar: action.codeBar
            }

        case 'codeBarStatus': 
            return {
                ...state,
                codeBarStatus: action.codeBarStatus
            }

        default:
            return state;
    }


}


