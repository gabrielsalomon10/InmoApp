

import { createContext } from 'react';
import { IAdmin } from '../../interfaces';


interface ContextProps {
    isLoggedIn: boolean;
    admin?: IAdmin;

    loginAdmin: ( email: string, password: string ) => Promise<boolean>;
    logout: () => void;
}


export const AuthContext = createContext( {} as ContextProps );