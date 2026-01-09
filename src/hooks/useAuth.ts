// File: src/hooks/useAuth.ts
// Purpose: Authentication hook wrapping context + local UI state handling
// Dependencies: React, AuthContext

import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
    const { user, isGuest, login: ctxLogin, loginAsGuest: ctxLoginAsGuest, logout } = useAuthContext();
    const [authState, setAuthState] = useState<'form' | 'otp'>('form');

    const login = async (email: string, password: string) => {
        // Mock API call simulation
        console.log('Logging in with', email);
        // On success, switch to OTP state
        setAuthState('otp');
    };

    const register = async (name: string, email: string, password: string) => {
        // Mock API call simulation
        console.log('Registering', name, email);
        setAuthState('otp');
    }

    const verifyOTP = async (otp: string): Promise<boolean> => {
        // Mock Verify - Accept ANY OTP for now
        console.log('Verifying OTP', otp);

        // Confirm user is logged in now with a mock name
        ctxLogin('user@example.com', 'أحمد محمد');
        return true;
    };

    const loginAsGuest = () => {
        ctxLoginAsGuest();
    };

    return {
        user,
        isGuest,
        authState,
        setAuthState,
        login,
        register,
        verifyOTP,
        loginAsGuest,
        logout
    };
};
