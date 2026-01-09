// File: src/screens/CategoriesScreen.tsx
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/theme';

const CATEGORIES = [
    { id: 1, name: 'sofas', label: 'كنب', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80', count: 120 },
    { id: 2, name: 'beds', label: 'أسرة', image: 'https://images.unsplash.com/photo-1505693416388-b0346efee535?w=500&q=80', count: 85 },
    { id: 3, name: 'tables', label: 'طاولات', image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=500&q=80', count: 65 },
    { id: 4, name: 'chairs', label: 'كراسي', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80', count: 240 },
    { id: 5, name: 'lighting', label: 'إضاءة', image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&q=80', count: 45 },
    { id: 6, name: 'decor', label: 'ديكور', image: 'https://images.unsplash.com/photo-1585128719715-46776b56a0d1?w=500&q=80', count: 180 },
];

export default function CategoriesScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-white">
            {/* Header */}
            <View className="pt-14 pb-4 px-6 flex-row justify-between items-center bg-white border-b border-gray-100">
                <View style={{ gap: 4 }}>
                    <Text className="text-xl font-cairo-bold text-slate-800 text-right">
                        التصنيفات
                    </Text>
                    <Text className="text-sm text-slate-500 text-right font-cairo-medium">
                        اكتشف مجموعاتنا المميزة
                    </Text>
                </View>
                <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center">
                    <Feather name="grid" size={20} color={COLORS.primary} />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 px-4 pt-6" contentContainerStyle={{ paddingBottom: 100 }}>
                <View className="flex-row flex-wrap justify-between">
                    {CATEGORIES.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            className="w-[48%] mb-4 bg-white rounded-2xl border border-slate-100 overflow-hidden"
                            activeOpacity={0.7}
                            onPress={() => router.push({
                                pathname: '/category/[id]',
                                params: { id: category.id, name: category.label }
                            })}
                        >
                            <View className="h-32 bg-slate-100">
                                <Image
                                    source={{ uri: category.image }}
                                    className="w-full h-full"
                                    resizeMode="cover"
                                />
                                <View className="absolute inset-0 bg-black/10" />
                            </View>
                            <View className="p-4 items-end">
                                <Text className="text-base font-cairo-bold text-slate-800 mb-1">
                                    {category.label}
                                </Text>
                                <Text className="text-xs text-slate-500 font-cairo-medium">
                                    {category.count} منتج
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
