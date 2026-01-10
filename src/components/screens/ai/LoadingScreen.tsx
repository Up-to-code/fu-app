// File: src/components/screens/ai/LoadingScreen.tsx
// Purpose: AI Processing loading screen with blurred background photo

import React from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { LoadingSteps } from './LoadingSteps';

const LOADING_STEPS = [
    { text: 'رفع الصورة...', icon: 'cloud-upload-outline' },
    { text: 'تحليل المساحة...', icon: 'scan-outline' },
    { text: 'البحث عن أثاث مناسب...', icon: 'search-outline' },
    { text: 'بناء التصميم...', icon: 'construct-outline' },
    { text: 'إضافة التفاصيل...', icon: 'color-palette-outline' },
    { text: 'حفظ النتائج...', icon: 'checkmark-circle-outline' },
];

interface LoadingScreenProps {
    backgroundImage?: string;
    currentStep: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ backgroundImage, currentStep }) => {
    return (
        <View className="flex-1">
            {/* Background Photo with Blur and Dark Overlay */}
            {backgroundImage && (
                <>
                    <Image
                        source={{ uri: backgroundImage }}
                        className="absolute inset-0 w-full h-full"
                        resizeMode="cover"
                        blurRadius={15}
                    />
                    <View className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }} />
                </>
            )}

            {/* Loading Content */}
            <View className="flex-1 items-center justify-center">
                <View className="items-center">
                    <ActivityIndicator size="large" color="#FF6B35" />

                    <Text className="text-white text-2xl font-cairo-bold mt-8">
                        جاري تصميم غرفتك بالذكاء الاصطناعي
                    </Text>

                    <LoadingSteps steps={LOADING_STEPS} currentStep={currentStep} />
                </View>
            </View>
        </View>
    );
};
