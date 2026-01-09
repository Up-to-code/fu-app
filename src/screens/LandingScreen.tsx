// File: src/screens/LandingScreen.tsx
// Purpose: Main entry point screen with carousel and CTA
// Dependencies: React, components/screens/landing/*, hooks/useAuth

import { useRouter } from 'expo-router';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { GetStartedButton } from '../components/screens/landing/GetStartedButton';
import { ImageCarousel } from '../components/screens/landing/ImageCarousel';
import { useAuth } from '../hooks/useAuth';

const LandingScreen = () => {
    const router = useRouter();
    const { user } = useAuth();

    const handleGetStarted = () => {
        router.push('/auth/login');
    };

    return (
        <View className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" />
            <View className="flex-1">
                <ImageCarousel />
            </View>
            <GetStartedButton onPress={handleGetStarted} />
        </View>
    );
};

export default LandingScreen;
