import React, {
    createContext, PropsWithChildren, useMemo, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookie, LocalStorage } from '~/utils/global';
import { AuthResponseType } from '~/components/Auth/lib/types';

interface AuthContextType {
    isAuth: boolean;
    login: Function;
    logout: Function;
}

export const AuthContext = createContext<AuthContextType>({
    isAuth: false,
    login: () => {},
    logout: () => {},
});

const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isAuth, setIsAuth] = useState<boolean>(() => {
        const accessToken = Cookie.getCookie('accessToken');

        if (accessToken) {
            return true;
        }
        return false;
    });

    const navigate = useNavigate();

    const login = (data: AuthResponseType): void => {
        Cookie.setCookie('accessToken', JSON.stringify(data.accessToken), 3600);
        LocalStorage.setUser(data.user);

        setIsAuth(true);
    };

    const logout = (): void => {
        Cookie.deleteCookie('accessToken');
        LocalStorage.removeUser();

        setIsAuth(false);

        navigate(0);
    };

    const ProviderValue = useMemo(() => ({ isAuth, login, logout }), [isAuth, login, logout]);

    return (
        <AuthContext.Provider value={ProviderValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
