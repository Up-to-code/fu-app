// File: src/hooks/useAuth.ts
// Purpose: Authentication hook for managing user state and login/otp flow
// Dependencies: React

import { useState } from 'react';

export const useAuth = () => {
    const [user, setUser] = useState<{ email: string } | null>(null);
    const [authState, setAuthState] = useState<'form' | 'otp'>('form');

    const login = async (email: string, password: string) => {
        // Mock API call simulation
        console.log('Logging in with', email, password);
        // On success, switch to OTP state
        setAuthState('otp');
    };

    const register = async (name: string, email: string, password: string) => {
        // Mock API call simulation
        console.log('Registering', name, email, password);
        setAuthState('otp');
    }

    const verifyOTP = async (otp: string): Promise<boolean> => {
        // Mock Verify
        console.log('Verifying OTP', otp);
        if (otp === '123456') {
            setUser({ email: 'test@example.com' });
            return true;
        }
        return false;
    };

    return { user, authState, setAuthState, login, register, verifyOTP };
};
