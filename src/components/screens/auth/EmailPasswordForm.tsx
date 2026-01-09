// File: src/components/screens/auth/EmailPasswordForm.tsx
// Purpose: Standard Login/Register form
// Dependencies: React, components/ui/*

import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

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
            <Text className="text-2xl font-bold text-text mb-2">
                {isRegister ? 'Create Account' : 'Welcome Back'}
            </Text>

            {isRegister && (
                <View className="mb-4">
                    <Input
                        placeholder="Full Name"
                        value={name}
                        onChangeText={setName}
                    />
                </View>
            )}

            <View className="mb-4">
                <Input
                    placeholder="Email Address"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>

            <View className="mb-6">
                <Input
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>

            <Button
                title={isRegister ? "Register" : "Log In"}
                onPress={handleSubmit}
                fullWidth
            />
        </View>
    );
};
