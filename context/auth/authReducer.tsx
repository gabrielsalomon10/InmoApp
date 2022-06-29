import { AuthState } from './';
import { IAdmin } from '../../interfaces';


type AuthActionType = 
    | { type: '[Auth] - Login', payload: IAdmin }
    | { type: '[Auth] - Logout' }
    
export const authReducer = ( state: AuthState, action: AuthActionType ): AuthState => {

    switch (action.type) {
        case '[Auth] - Login':
            return {
                ...state,
                isLoggedIn: true,
                admin: action.payload
            }

        case '[Auth] - Logout':
            return {
                ...state,
                isLoggedIn: false,
                admin: undefined
            }

        default:
            return state;
    }

}