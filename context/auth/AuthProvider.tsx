import { FC, PropsWithChildren, useEffect, useReducer } from 'react';

import inmoApi from '../../api/inmoApi';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import { IAdmin } from '../../interfaces';
import { AuthContext, authReducer } from './';


type Props = {
    children?: React.ReactNode
};

export interface AuthState {
    isLoggedIn: boolean;
    admin?: IAdmin;
}


const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    admin: undefined,
}


export const AuthProvider:FC<PropsWithChildren<Props>> = ({ children }) => {

    const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE );

    const router = useRouter();

    useEffect( () => {
      checkToken();
    }, []);

    const checkToken = async() => {

        try {
            
            const { data } = await inmoApi.get('/admin/validate-token');
            const { token, admin } = data;
            Cookies.set('token', token );
            dispatch({ type: '[Auth] - Login', payload: admin });

        } catch (error) {
            Cookies.remove('token');
        }

    }
    

    const loginAdmin = async( email: string, password: string ): Promise<boolean> => {

        try {
            
            const { data } = await inmoApi.post('/admin/login', { email, password });
            const { token, admin } = data;
            Cookies.set('token', token );
            dispatch({ type: '[Auth] - Login', payload: admin });
            return true;

        } catch (error) {
            return false;
        }

    }


    const logout = () => {

        Cookies.remove('token');
        router.reload();
        
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            loginAdmin,
            logout
        }}>
            { children }
        </AuthContext.Provider>
    )

};