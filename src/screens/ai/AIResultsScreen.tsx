// File: src/screens/ai/AIResultsScreen.tsx
// Purpose: AI Results with SafeAreaView and Gaps

import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';
import { getLastAIDesignPhoto } from '../../utils/storage';

const GENERATED_IMAGE = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000';
const DETECTED_ITEMS = [
    { id: '1', name: 'كنبة زاوية', price: 3499, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400', discount: 10, pinX: 45, pinY: 50 },
    { id: '2', name: 'طاولة قهوة', price: 599, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=400', pinX: 65, pinY: 60 },
    { id: '3', name: 'سجادة صوف', price: 450, image: 'https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?q=80&w=400', pinX: 30, pinY: 70 },
];

const LOADING_STEPS = [
    'تحليل الصورة...',
    'اختيار الأثاث...',
    'بناء التصميم...',
    'جاهز!',
];

const AIResultsScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [loadingStep, setLoadingStep] = useState(0);
    const [viewMode, setViewMode] = useState<'after' | 'before'>('after');
    const [selectedPin, setSelectedPin] = useState<string | null>(null);
    const originalPhoto = getLastAIDesignPhoto();

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingStep(prev => {
                if (prev >= LOADING_STEPS.length - 1) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 300);
                    return prev;
                }
                return prev + 1;
            });
        }, 600);
        return () => clearInterval(interval);
    }, []);

    const handleClose = () => router.replace('/(tabs)/home');
    const handleTryAgain = () => router.push('/ai-design/camera');

    const totalPrice = DETECTED_ITEMS.reduce((sum, item) => {
        const finalPrice = item.discount ? item.price * (1 - item.discount / 100) : item.price;
        return sum + finalPrice;
    }, 0);

    // Loading Screen with captured image background
    if (isLoading) {
        return (
            <View className="flex-1 bg-slate-900">
                <StatusBar barStyle="light-content" />

                {/* Background: The captured image */}
                {originalPhoto && (
                    <>
                        <Image
                            source={{ uri: originalPhoto }}
                            className="absolute inset-0 w-full h-full"
                            resizeMode="cover"
                            blurRadius={15}
                        />
                        <View className="absolute inset-0 bg-black/60" />
                    </>
                )}

                <SafeAreaView className="flex-1 items-center justify-center">
                    <View className="items-center px-8">
                        <ActivityIndicator size="large" color={COLORS.primary} />

                        <Text className="text-white text-2xl font-cairo-bold mt-8 mb-4 text-center">
                            {LOADING_STEPS[loadingStep]}
                        </Text>

                        <Text className="text-slate-400 text-base font-cairo-medium">
                            {Math.round(((loadingStep + 1) / LOADING_STEPS.length) * 100)}%
                        </Text>
                    </View>
                </SafeAreaView>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white">
            <StatusBar barStyle="light-content" />

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false} bounces={false}>
                {/* Hero Image with Pins */}
                <View className="relative h-[450px]">
                    <Image
                        source={{ uri: viewMode === 'after' ? GENERATED_IMAGE : (originalPhoto || GENERATED_IMAGE) }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                    <View className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />

                    {/* Interactive Pins */}
                    {viewMode === 'after' && DETECTED_ITEMS.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => setSelectedPin(selectedPin === item.id ? null : item.id)}
                            className="absolute"
                            style={{
                                left: `${item.pinX}%`,
                                top: `${item.pinY}%`,
                                transform: [{ translateX: -16 }, { translateY: -16 }]
                            }}
                        >
                            <View className={`w-8 h-8 rounded-full items-center justify-center border-2 ${selectedPin === item.id
                                    ? 'bg-primary border-white'
                                    : 'bg-white/90 border-primary'
                                }`}>
                                <View className={`w-3 h-3 rounded-full ${selectedPin === item.id ? 'bg-white' : 'bg-primary'
                                    }`} />
                            </View>

                            {selectedPin === item.id && (
                                <View className="absolute -top-16 left-1/2 -ml-16 w-32 bg-white rounded-xl p-3 shadow-lg">
                                    <Text className="text-xs font-cairo-bold text-slate-800 text-center mb-1">
                                        {item.name}
                                    </Text>
                                    <Text className="text-xs font-cairo-bold text-center" style={{ color: COLORS.primary }}>
                                        {item.price} ر.س
                                    </Text>
                                    <View className="absolute -bottom-1 left-1/2 -ml-1.5 w-3 h-3 bg-white rotate-45" />
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}

                    {/* Top Controls */}
                    <SafeAreaView className="absolute top-0 left-0 right-0" edges={['top']}>
                        <View className="px-5 py-4 flex-row-reverse justify-between items-center">
                            <TouchableOpacity
                                onPress={handleClose}
                                className="w-11 h-11 rounded-full bg-black/40 items-center justify-center"
                            >
                                <Feather name="x" size={20} color="white" />
                            </TouchableOpacity>

                            {/* Toggle */}
                            <View className="flex-row bg-black/40 rounded-full p-1">
                                <TouchableOpacity
                                    onPress={() => setViewMode('before')}
                                    className={`px-5 py-2 rounded-full ${viewMode === 'before' ? 'bg-white/20' : ''}`}
                                >
                                    <Text className="text-white text-xs font-cairo-bold">قبل</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setViewMode('after')}
                                    className={`px-5 py-2 rounded-full ${viewMode === 'after' ? 'bg-primary' : ''}`}
                                >
                                    <Text className="text-white text-xs font-cairo-bold">بعد</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity className="w-11 h-11 rounded-full bg-black/40 items-center justify-center">
                                <Feather name="share" size={18} color="white" />
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </View>

                {/* Content */}
                <View className="-mt-8 bg-white rounded-t-3xl px-5 pt-6 pb-10">
                    {/* Handle */}
                    <View className="self-center w-10 h-1 bg-slate-200 rounded-full mb-8" />

                    {/* Title */}
                    <Text className="text-xl font-cairo-bold text-slate-800 text-right mb-3">
                        التصميم الجديد ✨
                    </Text>
                    <Text className="text-sm font-cairo-medium text-slate-500 text-right mb-8">
                        اضغط على النقاط في الصورة لرؤية التفاصيل
                    </Text>

                    {/* Products */}
                    <View className="mb-8">
                        {DETECTED_ITEMS.map((item, index) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => setSelectedPin(item.id)}
                                className={`flex-row-reverse items-center bg-slate-50 rounded-2xl p-4 ${index < DETECTED_ITEMS.length - 1 ? 'mb-4' : ''
                                    } ${selectedPin === item.id ? 'border-2 border-primary' : ''}`}
                                activeOpacity={0.8}
                            >
                                <Image
                                    source={{ uri: item.image }}
                                    className="w-20 h-20 rounded-xl bg-slate-200"
                                    resizeMode="cover"
                                />
                                <View className="flex-1 mr-4">
                                    <Text className="text-base font-cairo-bold text-slate-800 text-right mb-2">
                                        {item.name}
                                    </Text>
                                    <View className="flex-row-reverse items-center gap-3">
                                        <Text className="text-base font-cairo-bold" style={{ color: COLORS.primary }}>
                                            {Math.round(item.discount ? item.price * (1 - item.discount / 100) : item.price)} ر.س
                                        </Text>
                                        {item.discount && (
                                            <Text className="text-xs font-cairo-medium text-slate-400 line-through">
                                                {item.price}
                                            </Text>
                                        )}
                                    </View>
                                </View>
                                <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
                                    <Feather name="plus" size={20} color={COLORS.primary} />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Actions */}
                    <TouchableOpacity
                        className="w-full py-5 rounded-2xl flex-row-reverse justify-center items-center gap-3 bg-primary mb-4"
                        activeOpacity={0.8}
                    >
                        <Text className="text-white text-base font-cairo-bold">
                            أضف الكل للسلة ({Math.round(totalPrice)} ر.س)
                        </Text>
                        <Feather name="shopping-cart" size={20} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleTryAgain}
                        className="w-full py-5 rounded-2xl flex-row-reverse justify-center items-center gap-3 border border-slate-200"
                        activeOpacity={0.8}
                    >
                        <Text className="text-slate-700 text-base font-cairo-bold">جرب صورة أخرى</Text>
                        <Feather name="refresh-cw" size={20} color={COLORS.text} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default AIResultsScreen;
