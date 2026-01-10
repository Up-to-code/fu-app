
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/theme';

const CATEGORIES = [
    { id: '1', name: 'مجالس', icon: '🛋️', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80' },
    { id: '2', name: 'غرف نوم', icon: '🛏️', image: 'https://images.unsplash.com/photo-1505693416388-b0346ef38604?w=200&q=80' },
    { id: '3', name: 'مطابخ', icon: '🍳', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=200&q=80' },
    { id: '4', name: 'مكاتب', icon: '💻', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=200&q=80' },
    { id: '5', name: 'طعام', icon: '🍽️', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=200&q=80' },
    { id: '6', name: 'جلسات خارجية', icon: '🌳', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=200&q=80' },
];

export const CategoriesSection = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    return (
        <View className="mb-8">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                style={{ transform: [{ scaleX: -1 }] }}
            >
                {CATEGORIES.map((category, index) => {
                    const isSelected = selectedCategory === category.id;
                    return (
                        <TouchableOpacity
                            key={category.id}
                            className="ml-5 items-center"
                            style={{
                                marginLeft: index === CATEGORIES.length - 1 ? 0 : 20,
                                transform: [{ scaleX: -1 }]
                            }}
                            onPress={() => setSelectedCategory(category.id)}
                        >
                            <View
                                className={`w-[70px] h-[70px] rounded-full overflow-hidden mb-2 bg-gray-100 items-center justify-center border-2`}
                                style={{ borderColor: isSelected ? COLORS.primary : 'transparent' }}
                            >
                                <Image
                                    source={{ uri: category.image }}
                                    className="w-full h-full"
                                    resizeMode="cover"
                                />
                            </View>
                            <Text
                                className={`text-xs ${isSelected ? 'font-cairo-bold' : 'font-cairo-medium text-slate-500'}`}
                                style={{ color: isSelected ? COLORS.primary : undefined }}
                            >
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};
