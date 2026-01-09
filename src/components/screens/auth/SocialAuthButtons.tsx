// File: src/components/screens/auth/SocialAuthButtons.tsx
// Purpose: Social login buttons (Google/Apple)
// Dependencies: React, React Native, components/ui/Button

import React from 'react';
import { Platform, Text, View } from 'react-native';
import { Button } from '../../ui/Button';

export const SocialAuthButtons = () => {
    return (
        <View className="w-full mt-6">
            <View className="flex-row items-center mb-6">
                <View className="flex-1 h-px bg-border" />
                <Text className="mx-4 text-textLight">or</Text>
                <View className="flex-1 h-px bg-border" />
            </View>

            <View className="space-y-4 gap-4">
                <Button
                    title="Continue with Google"
                    onPress={() => console.log('Google Auth')}
                    variant="outline"
                    fullWidth
                />

                {Platform.OS === 'ios' && (
                    <Button
                        title="Continue with Apple"
                        onPress={() => console.log('Apple Auth')}
                        variant="outline"
                        fullWidth
                    />
                )}
            </View>
        </View>
    );
};
