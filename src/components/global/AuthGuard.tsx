// File: src/components/global/AuthGuard.tsx
// Purpose: Protect screens from guest access
// Dependencies: React, useAuth, components/ui/Button

import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';

interface AuthGuardProps {
    children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const { user, isGuest } = useAuth();
    const router = useRouter();

    if (isGuest && !user) {
        return (
            <View className="flex-1 justify-center items-center bg-background px-6">
                <View className="items-center space-y-4 mb-8">
                    <Text className="text-2xl font-bold text-text text-center font-cairo-bold" style={{ fontFamily: 'Cairo_700Bold' }}>
                        تسجيل الدخول مطلوب
                    </Text>
                    <Text className="text-textLight text-center font-cairo-regular" style={{ fontFamily: 'Cairo_400Regular' }}>
                        يرجى تسجيل الدخول للوصول إلى هذه الصفحة والاستمتاع بكافة المميزات.
                    </Text>
                </View>

                <Button
                    title="تسجيل الدخول / إنشاء حساب"
                    onPress={() => router.push('/auth/login')}
                    fullWidth
                />
            </View>
        );
    }

    return <>{children}</>;
};
