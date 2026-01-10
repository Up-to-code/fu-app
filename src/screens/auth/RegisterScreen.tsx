// File: src/screens/auth/RegisterScreen.tsx
// Purpose: Arabic Registration screen with shared components

import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionButton } from '../../components/shared';
import { useAuth } from '../../hooks/useAuth';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

const RegisterScreen = () => {
    const { authState, register, verifyOTP } = useAuth();
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async () => {
        await register(name, email, password);
    };

    const handleVerify = async () => {
        const success = await verifyOTP(otp);
        if (success) {
            router.replace('/(tabs)/home');
        } else {
            alert('رمز التحقق غير صحيح');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center',
                        paddingHorizontal: isTablet ? 64 : 24,
                        paddingVertical: 32,
                        maxWidth: isTablet ? 500 : '100%',
                        alignSelf: 'center',
                        width: '100%',
                    }}
                    keyboardShouldPersistTaps="handled"
                >
                    {authState === 'form' ? (
                        <>
                            {/* Header */}
                            <View className="mb-10">
                                <Text className={`text-slate-800 font-cairo-bold text-right mb-2 ${isTablet ? 'text-4xl' : 'text-3xl'}`}>
                                    إنشاء حساب جديد ✨
                                </Text>
                                <Text className={`text-slate-500 font-cairo-medium text-right ${isTablet ? 'text-lg' : 'text-base'}`}>
                                    سجل للحصول على أفضل العروض
                                </Text>
                            </View>

                            {/* Name */}
                            <View className="mb-4">
                                <Text className="text-slate-700 font-cairo-bold text-right mb-2">الاسم الكامل</Text>
                                <View className="flex-row-reverse items-center bg-slate-50 rounded-2xl px-4">
                                    <Feather name="user" size={20} color="#94a3b8" />
                                    <TextInput
                                        value={name}
                                        onChangeText={setName}
                                        placeholder="أحمد منصور"
                                        className="flex-1 py-4 px-3 text-right font-cairo-medium text-slate-800"
                                        placeholderTextColor="#94a3b8"
                                    />
                                </View>
                            </View>

                            {/* Email */}
                            <View className="mb-4">
                                <Text className="text-slate-700 font-cairo-bold text-right mb-2">البريد الإلكتروني</Text>
                                <View className="flex-row-reverse items-center bg-slate-50 rounded-2xl px-4">
                                    <Feather name="mail" size={20} color="#94a3b8" />
                                    <TextInput
                                        value={email}
                                        onChangeText={setEmail}
                                        placeholder="example@email.com"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        className="flex-1 py-4 px-3 text-right font-cairo-medium text-slate-800"
                                        placeholderTextColor="#94a3b8"
                                    />
                                </View>
                            </View>

                            {/* Password */}
                            <View className="mb-8">
                                <Text className="text-slate-700 font-cairo-bold text-right mb-2">كلمة المرور</Text>
                                <View className="flex-row-reverse items-center bg-slate-50 rounded-2xl px-4">
                                    <Feather name="lock" size={20} color="#94a3b8" />
                                    <TextInput
                                        value={password}
                                        onChangeText={setPassword}
                                        placeholder="••••••••"
                                        secureTextEntry={!showPassword}
                                        className="flex-1 py-4 px-3 text-right font-cairo-medium text-slate-800"
                                        placeholderTextColor="#94a3b8"
                                    />
                                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                        <Feather name={showPassword ? 'eye-off' : 'eye'} size={20} color="#94a3b8" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Register Button */}
                            <ActionButton
                                label="إنشاء حساب"
                                icon="arrow-left"
                                onPress={handleRegister}
                            />

                            {/* Divider */}
                            <View className="flex-row items-center my-8">
                                <View className="flex-1 h-px bg-slate-200" />
                                <Text className="px-4 text-slate-400 font-cairo-medium">أو</Text>
                                <View className="flex-1 h-px bg-slate-200" />
                            </View>

                            {/* Social Buttons */}
                            <View className="flex-row gap-4 mb-8">
                                <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-2 py-4 bg-slate-50 rounded-2xl">
                                    <Text className="font-cairo-bold text-slate-700">Google</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-2 py-4 bg-slate-900 rounded-2xl">
                                    <Text className="font-cairo-bold text-white">Apple</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Login Link */}
                            <View className="flex-row justify-center gap-2">
                                <Link href="/auth/login" asChild>
                                    <Text className="text-primary font-cairo-bold">دخول</Text>
                                </Link>
                                <Text className="text-slate-500 font-cairo-medium">لديك حساب بالفعل؟</Text>
                            </View>
                        </>
                    ) : (
                        /* OTP Verification */
                        <>
                            <View className="mb-10">
                                <Text className={`text-slate-800 font-cairo-bold text-right mb-2 ${isTablet ? 'text-3xl' : 'text-2xl'}`}>
                                    التحقق من الرمز
                                </Text>
                                <Text className="text-slate-500 font-cairo-medium text-right">
                                    أدخل الرمز المرسل إلى بريدك الإلكتروني
                                </Text>
                            </View>

                            <TextInput
                                value={otp}
                                onChangeText={setOtp}
                                placeholder="000000"
                                keyboardType="number-pad"
                                maxLength={6}
                                className="text-center text-3xl font-cairo-bold text-slate-800 bg-slate-50 rounded-2xl py-6 mb-6 tracking-widest"
                                placeholderTextColor="#94a3b8"
                            />

                            <ActionButton
                                label="تأكيد"
                                onPress={handleVerify}
                            />

                            <TouchableOpacity className="mt-6">
                                <Text className="text-primary font-cairo-bold text-center">
                                    إعادة إرسال الرمز
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default RegisterScreen;
