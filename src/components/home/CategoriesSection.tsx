// File: src/components/home/CategoriesSection.tsx
// Purpose: Simplified horizontal categories section

import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const CATEGORIES = [
    { id: '1', name: 'مجالس', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80' },
    { id: '2', name: 'غرف نوم', image: 'https://images.unsplash.com/photo-1505693416388-b0346ef38604?w=200&q=80' },
    { id: '3', name: 'مطابخ', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=200&q=80' },
    { id: '4', name: 'مكاتب', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=200&q=80' },
    { id: '5', name: 'طعام', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=200&q=80' },
    { id: '6', name: 'جلسات خارجية', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=200&q=80' },
];

export const CategoriesSection = () => {
    const router = useRouter();

    return (
        <View className="mb-8">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20, gap: 20 }}
                style={{ transform: [{ scaleX: -1 }] }}
            >
                {CATEGORIES.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        className="items-center"
                        style={{ transform: [{ scaleX: -1 }] }}
                        onPress={() => router.push(`/category/${category.id}`)}
                    >
                        <View className="w-[70px] h-[70px] rounded-full overflow-hidden mb-2 bg-gray-100 border-2 border-transparent">
                            <Image source={{ uri: category.image }} className="w-full h-full" resizeMode="cover" />
                        </View>
                        <Text className="text-xs font-cairo-medium text-slate-700">{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};
