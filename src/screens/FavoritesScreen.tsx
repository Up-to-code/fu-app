// File: src/screens/FavoritesScreen.tsx
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ProductCard } from '../components/screens/home/ProductCard';
import { COLORS } from '../constants/theme';

const FAVORITES = [
    {
        id: '1',
        name: 'صوفا مودرن مريحة',
        price: 2499,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80',
        category: 'كنب',
        isFavorite: true,
    },
    {
        id: '2',
        name: 'طاولة قهوة خشبية',
        price: 899,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&q=80',
        discount: 15,
        category: 'طاولات',
        isFavorite: true,
    },
    {
        id: '3',
        name: 'مصباح أرضي ذهبي',
        price: 450,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1513506003011-3b03c801e12b?w=500&q=80',
        category: 'إضاءة',
        isFavorite: true,
    },
];

export default function FavoritesScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-white">
            {/* Header */}
            <View className="pt-14 pb-4 px-6 flex-row justify-between items-center bg-white border-b border-gray-100">
                <View style={{ gap: 4 }}>
                    <Text className="text-xl font-cairo-bold text-slate-800 text-right">
                        المفضلة
                    </Text>
                    <Text className="text-sm text-slate-500 text-right font-cairo-medium">
                        {FAVORITES.length} منتجات محفوظة
                    </Text>
                </View>
                <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center">
                    <Feather name="heart" size={20} color={COLORS.accent} />
                </TouchableOpacity>
            </View>

            {/* List */}
            <ScrollView className="flex-1 px-4 pt-6" contentContainerStyle={{ paddingBottom: 100 }}>
                {FAVORITES.length > 0 ? (
                    <View className="flex-row flex-wrap justify-between" style={{ direction: 'rtl' }}>
                        {FAVORITES.map((item) => (
                            <View key={item.id} className="w-[48%] mb-4">
                                <ProductCard
                                    product={item}
                                    onPress={() => router.push(`/product/${item.id}`)}
                                />
                            </View>
                        ))}
                    </View>
                ) : (
                    <View className="flex-1 items-center justify-center pt-20">
                        <View className="w-24 h-24 bg-gray-50 rounded-full items-center justify-center mb-6">
                            <Feather name="heart" size={40} color="#CBD5E1" />
                        </View>
                        <Text className="text-xl text-slate-800 font-cairo-bold mb-2">
                            قائمة المفضلة فارغة
                        </Text>
                        <Text className="text-sm text-slate-500 text-center mb-8 px-8 leading-6 font-cairo-medium">
                            لم تقم بإضافة أي منتجات للمفضلة بعد. تصفح المنتجات واكتشف ما يناسب ذوقك.
                        </Text>
                        <TouchableOpacity
                            onPress={() => router.push('/(tabs)/home')}
                            className="px-8 py-3.5 bg-primary rounded-xl shadow-sm shadow-orange-200"
                            style={{ elevation: 4 }}
                        >
                            <Text className="text-white font-cairo-bold text-base">
                                تصفح المنتجات
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
