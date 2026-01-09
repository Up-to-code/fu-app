// File: src/screens/auth/LoginScreen.tsx
// Purpose: Arabic Login screen with mocked behaviors
// Dependencies: React, hooks/useAuth, components/screens/auth/*

import { Link, useRouter } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { EmailPasswordForm } from '../../components/screens/auth/EmailPasswordForm';
import { OTPInput } from '../../components/screens/auth/OTPInput';
import { SocialAuthButtons } from '../../components/screens/auth/SocialAuthButtons';
import { useAuth } from '../../hooks/useAuth';

const LoginScreen = () => {
    const { authState, login, verifyOTP } = useAuth();
    const router = useRouter();

    const handleLogin = async (data: any) => {
        // Mock logic
        await login(data.email, data.password);
    };

    const handleVerify = async (otp: string) => {
        const success = await verifyOTP(otp);
        if (success) {
            router.replace('/(tabs)/home');
        } else {
            alert("رمز التحقق غير صحيح");
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-background"
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
                <View className="w-full">
                    {authState === 'form' ? (
                        <>
                            <EmailPasswordForm onSubmit={handleLogin} />
                            <SocialAuthButtons />

                            <View className="mt-8 flex-row justify-center">
                                <Text className="text-textLight font-cairo-bold">ليس لديك حساب؟ </Text>
                                <Link href="/auth/register" asChild>
                                    <Text className="text-primary font-cairo-bold">سجل الآن</Text>
                                </Link>
                            </View>
                        </>
                    ) : (
                        <OTPInput
                            onVerify={handleVerify}
                            onResend={() => alert('تم إعادة الإرسال!')}
                        />
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;
