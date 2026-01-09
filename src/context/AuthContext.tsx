// File: src/context/AuthContext.tsx
// Purpose: Provide global authentication state (Mock)
// Dependencies: React

import React, { createContext, ReactNode, useContext, useState } from 'react';

interface User {
    email: string;
    name?: string;
}

interface AuthContextType {
    user: User | null;
    isGuest: boolean;
    login: (email: string, name?: string) => void;
    logout: () => void;
    loginAsGuest: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isGuest, setIsGuest] = useState(true);

    const login = (email: string, name?: string) => {
        setUser({ email, name });
        setIsGuest(false);
    };

    const loginAsGuest = () => {
        setUser(null);
        setIsGuest(true);
    };

    const logout = () => {
        setUser(null);
        setIsGuest(false);
    };

    return (
        <AuthContext.Provider value={{ user, isGuest, login, logout, loginAsGuest }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};
