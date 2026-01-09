// File: src/components/screens/home/CategorySection.tsx
// Purpose: Section with title and horizontal product list
// Dependencies: React, NativeWind, ProductCard

import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { ProductCard } from './ProductCard';

interface CategorySectionProps {
    title: string;
    products: any[];
}

export const CategorySection: React.FC<CategorySectionProps> = ({ title, products }) => {
    return (
        <View className="mt-8 mb-2">
            <View className="flex-row justify-between items-center px-4 mb-4">
                <Text className="text-lg font-bold text-text">{title}</Text>
                <TouchableOpacity>
                    <Text className="text-primary font-semibold">View All →</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ProductCard product={item} onPress={() => console.log('Product', item.id)} />
                )}
            />
        </View>
    );
};
