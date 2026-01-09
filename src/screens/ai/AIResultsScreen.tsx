// File: src/screens/ai/AIResultsScreen.tsx
// Purpose: AI-Generated Room Design Results with Auto-Processing

import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { ProductCard } from '../../components/screens/home/ProductCard';
import { COLORS } from '../../constants/theme';
import { getLastAIDesignPhoto } from '../../utils/storage';

const { width, height } = Dimensions.get('window');

// Mock Data with Coordinates for Pins (x, y in percentages)
const GENERATED_IMAGE = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000';
const DETECTED_ITEMS = [
    { id: '5', name: 'كنبة زاوية مريحة', price: 3499, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800', discount: 10, x: 50, y: 40 },
    { id: '6', name: 'طاولة قهوة زجاجية', price: 599, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=800', x: 70, y: 55 },
    { id: '9', name: 'سجادة صوف ناعمة', price: 450, image: 'https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?q=80&w=800', x: 30, y: 65 },
];

const AIResultsScreen = () => {
    const [viewMode, setViewMode] = useState<'after' | 'before'>('after');
    const [selectedPinId, setSelectedPinId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingStep, setLoadingStep] = useState(0);
    const originalPhoto = getLastAIDesignPhoto();

    const LOADING_STEPS = [
        { text: 'رفع الصورة...', icon: 'cloud-upload-outline' },
        { text: 'تحليل المساحة...', icon: 'scan-outline' },
        { text: 'البحث عن أثاث مناسب...', icon: 'search-outline' },
        { text: 'بناء التصميم...', icon: 'construct-outline' },
        { text: 'إضافة التفاصيل...', icon: 'color-palette-outline' },
        { text: 'حفظ النتائج...', icon: 'checkmark-circle-outline' },
    ];

    // Simulate AI processing with steps
    useEffect(() => {
        const stepDuration = 400;
        const totalSteps = 6;
        const stepTimers: any[] = [];

        for (let i = 0; i < totalSteps; i++) {
            const timer = setTimeout(() => {
                setLoadingStep(i);
            }, i * stepDuration);
            stepTimers.push(timer);
        }

        const finalTimer = setTimeout(() => {
            setIsLoading(false);
        }, totalSteps * stepDuration + 200);

        return () => {
            stepTimers.forEach(timer => clearTimeout(timer));
            clearTimeout(finalTimer);
        };
    }, []);

    const handlePinPress = (id: string) => {
        setSelectedPinId(selectedPinId === id ? null : id);
    };

    const handleClose = () => {
        router.replace('/(tabs)/home');
    };

    const handleTryAnother = () => {
        router.push('/ai-design/camera');
    };

    return (
        <View className="flex-1 bg-black">
            <StatusBar barStyle="light-content" />

            {isLoading ? (
                /* LOADING STATE - AI Processing with Background Photo */
                <View className="flex-1">
                    {/* Background Photo with Dark Overlay */}
                    {originalPhoto && (
                        <>
                            <Image
                                source={{ uri: originalPhoto }}
                                className="absolute inset-0 w-full h-full"
                                resizeMode="cover"
                                blurRadius={15}
                            />
                            <View className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }} />
                        </>
                    )}

                    {/* Loading Content */}
                    <View className="flex-1 items-center justify-center px-6">
                        <View className="items-center w-full max-w-sm">
                            <ActivityIndicator size="large" color="#FF6B35" />

                            {/* Progress Percentage */}
                            <Text className="text-orange-500 text-4xl font-cairo-bold mt-6">
                                {Math.round(((loadingStep + 1) / LOADING_STEPS.length) * 100)}%
                            </Text>

                            <Text className="text-white text-2xl font-cairo-bold mt-2 mb-10">
                                جاري تصميم غرفتك
                            </Text>

                            {/* Animated Steps */}
                            <View className="w-full">
                                {LOADING_STEPS.map((step, index) => {
                                    const isActive = index === loadingStep;
                                    const isCompleted = index < loadingStep;
                                    const isPending = index > loadingStep;

                                    return (
                                        <View
                                            key={index}
                                            className="flex-row items-center mb-4"
                                            style={{
                                                opacity: isPending ? 0.4 : 1,
                                            }}
                                        >
                                            <Ionicons
                                                name={step.icon as any}
                                                size={24}
                                                color={isActive ? '#FF6B35' : isCompleted ? '#22C55E' : '#9CA3AF'}
                                            />
                                            <Text
                                                className={`text-right flex-1 mr-4 ${isActive ? 'font-cairo-bold' : 'font-cairo-medium'}`}
                                                style={{
                                                    color: isActive ? 'white' : isPending ? '#9CA3AF' : 'white',
                                                    fontSize: 16
                                                }}
                                            >
                                                {step.text}
                                            </Text>
                                            {isCompleted && (
                                                <Ionicons name="checkmark-circle" size={20} color="#22C55E" />
                                            )}
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    </View>
                </View>
            ) : (
                /* RESULTS STATE */
                <>
                    {/* FIXED HEADER: Top Actions */}
                    <View className="absolute top-12 left-0 right-0 px-4 flex-row justify-between items-center z-50">
                        <TouchableOpacity
                            onPress={handleClose}
                            className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md items-center justify-center border border-white/10"
                        >
                            <Ionicons name="close" size={24} color="white" />
                        </TouchableOpacity>

                        {/* View Toggle */}
                        <View className="bg-black/30 backdrop-blur-md rounded-full p-1 flex-row border border-white/10">
                            <TouchableOpacity
                                onPress={() => setViewMode('before')}
                                className={`px-4 py-1.5 rounded-full ${viewMode === 'before' ? 'bg-white/20' : 'bg-transparent'}`}
                            >
                                <Text className="text-white text-xs font-cairo-bold">قبل</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setViewMode('after')}
                                className={`px-4 py-1.5 rounded-full ${viewMode === 'after' ? 'bg-primary' : 'bg-transparent'}`}
                            >
                                <Text className="text-white text-xs font-cairo-bold">بعد</Text>
                            </TouchableOpacity>
                        </View>

                        <View className="flex-row space-x-2 space-x-reverse">
                            <TouchableOpacity className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md items-center justify-center border border-white/10">
                                <Ionicons name="share-social-outline" size={22} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ScrollView
                        className="flex-1"
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                    >
                        {/* HERO IMAGE SECTION (Scrolls with page) */}
                        <View className="relative w-full h-[550px] bg-black">
                            <Image
                                source={{ uri: viewMode === 'after' ? GENERATED_IMAGE : (originalPhoto || GENERATED_IMAGE) }}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                            <View className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

                            {/* Pins Overlay */}
                            {viewMode === 'after' && DETECTED_ITEMS.map((item) => (
                                <View
                                    key={item.id}
                                    className="absolute items-center justify-center"
                                    style={{
                                        left: `${item.x}%`,
                                        top: `${item.y}%`,
                                        transform: [{ translateX: -16 }, { translateY: -16 }]
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => handlePinPress(item.id)}
                                        className={`w-8 h-8 rounded-full items-center justify-center border-2 shadow-lg ${selectedPinId === item.id
                                            ? 'bg-primary border-white scale-110'
                                            : 'bg-white/90 border-primary/50'
                                            }`}
                                    >
                                        <View className={`w-3 h-3 rounded-full ${selectedPinId === item.id ? 'bg-white' : 'bg-primary'}`} />
                                    </TouchableOpacity>

                                    {/* Tooltip */}
                                    {selectedPinId === item.id && (
                                        <View className="absolute bottom-10 bg-white px-3 py-2 rounded-xl shadow-xl border border-gray-100 min-w-[120px] z-50">
                                            <Text className="text-xs font-cairo-bold text-slate-800 text-center mb-1">
                                                {item.name}
                                            </Text>
                                            <Text className="text-xs font-cairo-bold text-primary text-center">
                                                {item.price} ر.س
                                            </Text>
                                            <View className="absolute -bottom-1.5 left-1/2 -ml-1.5 w-3 h-3 bg-white rotate-45 border-b border-r border-gray-100" />
                                        </View>
                                    )}
                                </View>
                            ))}
                        </View>

                        {/* CONTENT SECTION (Overlaps Hero) */}
                        <View className="-mt-12 bg-white rounded-t-3xl shadow-2xl px-6 pt-8 pb-10 min-h-[500px]">
                            {/* Drag Handle Indicator */}
                            <View className="self-center w-12 h-1.5 bg-gray-200 rounded-full mb-6" />

                            {/* Title Section */}
                            <View className="flex-row justify-between items-start mb-6">
                                <View className="flex-1 mr-4">
                                    <Text className="text-2xl font-cairo-bold text-slate-800 text-right leading-tight">
                                        تصميم غرفة معيشة مودرن
                                    </Text>
                                    <Text className="text-gray-500 text-right mt-2 text-sm leading-relaxed font-cairo-medium">
                                        تم التعرف على ٣ عناصر وتحديث الديكور باستخدام أحدث صيحات الموضة لعام ٢٠٢٤
                                    </Text>
                                </View>
                                <View className="bg-primary/10 p-3 rounded-2xl">
                                    <Ionicons name="sparkles" size={24} color={COLORS.primary} />
                                </View>
                            </View>

                            {/* Shop The Look Section */}
                            <View className="mb-8">
                                <View className="flex-row justify-between items-center mb-4">
                                    <TouchableOpacity onPress={() => { }}>
                                        <Text className="text-primary font-cairo-bold text-sm">عرض الكل</Text>
                                    </TouchableOpacity>
                                    <Text className="text-lg font-cairo-bold text-slate-800">
                                        تسوق هذا التصميم
                                    </Text>
                                </View>

                                <View className="flex-row flex-wrap justify-between" style={{ direction: 'rtl' }}>
                                    {DETECTED_ITEMS.map(item => (
                                        <View key={item.id} className={`w-[48%] mb-4 ${selectedPinId && selectedPinId !== item.id ? 'opacity-50' : 'opacity-100'}`}>
                                            <ProductCard
                                                product={item}
                                                onPress={() => {
                                                    setSelectedPinId(item.id);
                                                }}
                                            />
                                        </View>
                                    ))}
                                </View>
                            </View>

                            {/* Action Buttons */}
                            <View className="space-y-4">
                                <TouchableOpacity
                                    className="w-full bg-primary py-4 rounded-2xl flex-row justify-center items-center shadow-lg shadow-primary/30"
                                    activeOpacity={0.8}
                                >
                                    <Ionicons name="cart" size={22} color="white" style={{ marginRight: 8 }} />
                                    <Text className="text-white text-lg font-cairo-bold">
                                        إضافة كل العناصر للسلة (٤٥٤٨ ر.س)
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    className="w-full bg-white border border-slate-200 py-4 rounded-2xl flex-row justify-center items-center active:bg-slate-50"
                                    activeOpacity={0.8}
                                    onPress={handleTryAnother}
                                >
                                    <Ionicons name="camera-outline" size={22} color={COLORS.text} style={{ marginRight: 8 }} />
                                    <Text className="text-slate-700 text-lg font-cairo-bold">
                                        جرب غرفة أخرى
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </>
            )}
        </View>
    );
};

export default AIResultsScreen;
