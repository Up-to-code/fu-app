// File: app/ai-design/index.tsx
// Purpose: AI Room Design Configuration Screen

import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { COLORS } from '../../src/constants/theme';
import { getAIPreferences, getAISession, saveAIPreferences, saveAISession } from '../../src/utils/storage';

const ROOM_TYPES = [
    { id: 'living', name: 'غرفة المعيشة', icon: 'tv-outline' },
    { id: 'bedroom', name: 'غرفة النوم', icon: 'bed-outline' },
    { id: 'dining', name: 'غرفة الطعام', icon: 'restaurant-outline' },
    { id: 'office', name: 'مكتب منزلي', icon: 'desktop-outline' },
    { id: 'majlis', name: 'مجلس', icon: 'people-outline' },
    { id: 'outdoor', name: 'جلسة خارجية', icon: 'leaf-outline' },
];

const ROOM_STYLES = [
    { id: 'modern', name: 'مودرن', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=400' },
    { id: 'classic', name: 'كلاسيك', image: 'https://images.unsplash.com/photo-1505693416388-50efe58338d4?q=80&w=400' },
    { id: 'boho', name: 'بوهيمي', image: 'https://images.unsplash.com/photo-1522771753062-5887739e5c5e?q=80&w=400' },
    { id: 'industrial', name: 'صناعي', image: 'https://images.unsplash.com/photo-1505692794-52f65d0feda7?q=80&w=400' },
    { id: 'minimalist', name: 'تبسيطي', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=400' },
    { id: 'islamic', name: 'إسلامي حديث', image: 'https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?q=80&w=400' },
];

export default function AIConfigurationScreen() {
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
    const [customPrompt, setCustomPrompt] = useState('');

    useEffect(() => {
        // Load from current session first
        const session = getAISession();
        if (session.roomType) setSelectedType(session.roomType);
        if (session.roomStyle) setSelectedStyle(session.roomStyle);
        if (session.customPrompt) setCustomPrompt(session.customPrompt);

        // If no session data, load from preferences
        if (!session.roomType && !session.roomStyle) {
            const prefs = getAIPreferences();
            if (prefs.lastRoomType) setSelectedType(prefs.lastRoomType);
            if (prefs.lastRoomStyle) setSelectedStyle(prefs.lastRoomStyle);
            if (prefs.lastCustomPrompt) setCustomPrompt(prefs.lastCustomPrompt);
        }
    }, []);

    const handleBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/(tabs)/home');
        }
    };

    const handleContinue = () => {
        if (selectedType && selectedStyle) {
            // Save to session for current flow
            saveAISession({
                roomType: selectedType,
                roomStyle: selectedStyle,
                customPrompt
            });
            // Also save to preferences for next time
            saveAIPreferences({
                lastRoomType: selectedType,
                lastRoomStyle: selectedStyle,
                lastCustomPrompt: customPrompt
            });
            router.push('/ai-design/camera');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-white"
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="flex-1">
                    <StatusBar barStyle="dark-content" />

                    {/* Header */}
                    <View className="pt-16 px-6 pb-4 flex-row justify-between items-center z-10 bg-white">
                        <TouchableOpacity onPress={handleBack} className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center">
                            <Ionicons name="arrow-forward" size={24} color={COLORS.text} />
                        </TouchableOpacity>
                        <Text className="text-lg font-bold text-slate-800" style={{ fontFamily: 'Cairo_700Bold' }}>تصميم غرفتك بالذكاء الاصطناعي</Text>
                        <View className="w-10" />
                    </View>

                    <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
                        <View className="py-2 mb-8">
                            <Text className="text-2xl font-bold text-slate-800 text-right leading-tight mb-2" style={{ fontFamily: 'Cairo_700Bold' }}>
                                إيش نوع غرفتك؟
                            </Text>
                            <Text className="text-gray-500 text-right text-sm mb-6" style={{ fontFamily: 'Cairo_500Medium' }}>
                                عشان نختار الأثاث اللي يناسب مساحتك
                            </Text>

                            <View className="flex-row flex-wrap justify-end gap-3">
                                {ROOM_TYPES.map((type) => (
                                    <TouchableOpacity
                                        key={type.id}
                                        onPress={() => setSelectedType(type.id)}
                                        className={`px-5 py-3 rounded-2xl border flex-row items-center ${selectedType === type.id
                                            ? 'bg-primary border-primary'
                                            : 'bg-white border-slate-200'
                                            }`}
                                    >
                                        <Ionicons
                                            name={type.icon as any}
                                            size={18}
                                            color={selectedType === type.id ? 'white' : COLORS.text}
                                            style={{ marginRight: 8 }}
                                        />
                                        <Text
                                            className={`font-bold ${selectedType === type.id ? 'text-white' : 'text-slate-700'}`}
                                            style={{ fontFamily: 'Cairo_700Bold' }}
                                        >
                                            {type.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <View className="mb-24">
                            <Text className="text-2xl font-bold text-slate-800 text-right leading-tight mb-2" style={{ fontFamily: 'Cairo_700Bold' }}>
                                ايش الستايل اللي يعجبك؟
                            </Text>
                            <Text className="text-gray-500 text-right text-sm mb-6" style={{ fontFamily: 'Cairo_500Medium' }}>
                                الذكاء الاصطناعي بيصمم الغرفة بناءً على ذوقك
                            </Text>

                            <View className="flex-row flex-wrap justify-between">
                                {ROOM_STYLES.map((style) => (
                                    <TouchableOpacity
                                        key={style.id}
                                        onPress={() => setSelectedStyle(style.id)}
                                        className={`w-[48%] mb-4 rounded-3xl overflow-hidden border-2 relative h-40 ${selectedStyle === style.id
                                            ? 'border-primary'
                                            : 'border-transparent'
                                            }`}
                                        activeOpacity={0.9}
                                    >
                                        <Image source={{ uri: style.image }} className="w-full h-full absolute" resizeMode="cover" />
                                        <View className={`absolute inset-0 ${selectedStyle === style.id ? 'bg-primary/40' : 'bg-black/30'}`} />

                                        {selectedStyle === style.id && (
                                            <View className="absolute top-3 right-3 bg-white rounded-full p-1">
                                                <Ionicons name="checkmark" size={16} color={COLORS.primary} />
                                            </View>
                                        )}

                                        <View className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                                            <Text className="text-white text-center font-bold" style={{ fontFamily: 'Cairo_700Bold' }}>
                                                {style.name}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Custom Prompt Section */}
                        <View className="mb-32 mt-6">
                            <Text className="text-xl font-bold text-slate-800 text-right leading-tight mb-2" style={{ fontFamily: 'Cairo_700Bold' }}>
                                تفاصيل إضافية (اختياري)
                            </Text>
                            <Text className="text-gray-500 text-right text-sm mb-4" style={{ fontFamily: 'Cairo_500Medium' }}>
                                مثل: "ضيف نباتات"، "إضاءة دافئة"، "ألوان فاتحة"
                            </Text>
                            <TextInput
                                className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-right h-28 text-slate-800"
                                placeholder="اكتب هنا..."
                                placeholderTextColor="#9CA3AF"
                                multiline
                                textAlignVertical="top"
                                value={customPrompt}
                                onChangeText={setCustomPrompt}
                                style={{ fontFamily: 'Cairo_500Medium', lineHeight: 24 }}
                            />
                        </View>
                    </ScrollView>

                    {/* Sticky Action Button */}
                    <View className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-100" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 8 }}>
                        <TouchableOpacity
                            onPress={handleContinue}
                            disabled={!selectedType || !selectedStyle}
                            className="w-full py-4 rounded-2xl flex-row justify-center items-center"
                            style={{
                                backgroundColor: selectedType && selectedStyle ? '#FF6B35' : '#E2E8F0',
                                shadowColor: selectedType && selectedStyle ? '#FF6B35' : 'transparent',
                                shadowOffset: { width: 0, height: 8 },
                                shadowOpacity: selectedType && selectedStyle ? 0.4 : 0,
                                shadowRadius: 16,
                                elevation: selectedType && selectedStyle ? 12 : 0
                            }}
                        >
                            <Text className={`text-lg font-bold ${selectedType && selectedStyle ? 'text-white' : 'text-slate-400'}`} style={{ fontFamily: 'Cairo_700Bold' }}>
                                {selectedType && selectedStyle ? 'التقط صورة الغرفة' : 'اختار النوع والستايل'}
                            </Text>
                            {selectedType && selectedStyle && (
                                <Ionicons name="camera" size={24} color="white" style={{ marginLeft: 10 }} />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
