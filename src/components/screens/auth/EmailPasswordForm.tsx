// File: src/components/screens/auth/EmailPasswordForm.tsx
// Purpose: Arabic Login/Register form with mocked behavior
// Dependencies: React, components/ui/*

import React, { useState } from 'react';
import { I18nManager, Text, View } from 'react-native';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

// Ensure RTL for local testing if needed, though global setting handles it
I18nManager.allowRTL(true);

interface EmailPasswordFormProps {
    onSubmit: (data: any) => void;
    isRegister?: boolean;
}

export const EmailPasswordForm: React.FC<EmailPasswordFormProps> = ({ onSubmit, isRegister = false }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = () => {
        onSubmit({ email, password, ...(isRegister ? { name } : {}) });
    };

    return (
        <View className="w-full space-y-4">
            <Text className="text-3xl font-cairo-bold text-text mb-4 text-right">
                {isRegister ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
            </Text>

            {isRegister && (
                <View className="mb-4">
                    <Text className="text-textLight mb-2 text-right font-cairo-medium">الاسم الكامل</Text>
                    <Input
                        placeholder="أدخل اسمك الكامل"
                        value={name}
                        onChangeText={setName}
                    />
                </View>
            )}

            <View className="mb-4">
                <Text className="text-textLight mb-2 text-right font-cairo-medium">البريد الإلكتروني</Text>
                <Input
                    placeholder="example@mail.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>

            <View className="mb-6">
                <Text className="text-textLight mb-2 text-right font-cairo-medium">كلمة المرور</Text>
                <Input
                    placeholder="••••••••"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>

            <Button
                title={isRegister ? "إنشاء حساب" : "دخول"}
                onPress={handleSubmit}
                fullWidth
            />
        </View>
    );
};
