// File: src/screens/auth/RegisterScreen.tsx
// Purpose: Registration screen with Email/Password ↔ OTP state
// Dependencies: React, hooks/useAuth, components/screens/auth/*

import { Link, useRouter } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { EmailPasswordForm } from '../../components/screens/auth/EmailPasswordForm';
import { OTPInput } from '../../components/screens/auth/OTPInput';
import { SocialAuthButtons } from '../../components/screens/auth/SocialAuthButtons';
import { useAuth } from '../../hooks/useAuth';

const RegisterScreen = () => {
    const { authState, register, verifyOTP } = useAuth();
    const router = useRouter();

    const handleRegister = async (data: any) => {
        await register(data.name, data.email, data.password);
    };

    const handleVerify = async (otp: string) => {
        const success = await verifyOTP(otp);
        if (success) {
            router.replace('/(tabs)/home');
        } else {
            alert('Invalid OTP');
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
                            <EmailPasswordForm onSubmit={handleRegister} isRegister />
                            <SocialAuthButtons />

                            <View className="mt-8 flex-row justify-center">
                                <Text className="text-textLight">Already have an account? </Text>
                                <Link href="/auth/login" asChild>
                                    <Text className="text-primary font-semibold">Log In</Text>
                                </Link>
                            </View>
                        </>
                    ) : (
                        <OTPInput
                            onVerify={handleVerify}
                            onResend={() => alert('Code resent!')}
                        />
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;
