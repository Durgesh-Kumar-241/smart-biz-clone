import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export interface DecodedToken {
    sub: string;
    email: string;
    role: 'SELLER' | 'CUSTOMER';
    exp: number;
    iat: number;
}

export type Role = 'SELLER' | 'CUSTOMER';

export interface User {
    id: string;
    email: string;
    role: Role;
    token: string;
}

interface AuthContextType {
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser) as User;
            const decoded = jwtDecode<DecodedToken>(user.token);
            const isExpired = decoded.exp * 1000 < Date.now();
            if (isExpired) {
                localStorage.removeItem('user');
            } else {
                setUser(user);
            }
        }
    }, []);

    const login = (token: string) => {
        const decoded = jwtDecode<DecodedToken>(token);
        const user: User = {
            id: decoded.sub,
            email: decoded.email,
            role: decoded.role,
            token: token,
        };
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    }
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const isUserLoggedIn = () : boolean => {
  const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser) as User;
            const decoded = jwtDecode<DecodedToken>(user.token);
            const isExpired = decoded.exp * 1000 < Date.now();
            return !isExpired;
        }else{
            return false;
        }
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
