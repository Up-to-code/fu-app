
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/theme';
import { ProductCard } from './ProductCard';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    discount?: number;
    isFavorite: boolean;
}

interface ProductListSectionProps {
    title: string;
    products: Product[];
    onToggleFavorite: (id: string) => void;
}

export const ProductListSection = ({ title, products, onToggleFavorite }: ProductListSectionProps) => {
    return (
        <View className="mb-6">
            {/* Header - RTL */}
            <View className="flex-row-reverse justify-between items-center px-5 mb-4">
                <Text className="text-base font-cairo-bold text-slate-800">
                    {title}
                </Text>
                <Link href={`/category/${title}` as any} asChild>
                    <TouchableOpacity className="flex-row-reverse items-center gap-1">
                        <Text className="text-sm font-cairo-medium text-slate-500">
                            عرض الكل
                        </Text>
                        {/* Arrow icon needs to point left in RTL if we strictly follow "back", but usually chevrons point to "next".
                In RTL, "next" is Left. Feather 'chevron-left'. */}
                        <Feather name="chevron-left" size={16} color={COLORS.textLight} />
                    </TouchableOpacity>
                </Link>
            </View>

            {/* List - RTL */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                style={{ transform: [{ scaleX: -1 }] }}
            >
                {products.map((item, index) => (
                    <View key={item.id} style={{ transform: [{ scaleX: -1 }] }}>
                        <ProductCard
                            image={item.image}
                            title={item.name}
                            price={item.price}
                            discount={item.discount}
                            isFavorite={item.isFavorite}
                            onFavorite={() => onToggleFavorite(item.id)}
                            onPress={() => { }}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};
