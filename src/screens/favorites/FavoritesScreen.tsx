// File: src/screens/favorites/FavoritesScreen.tsx
// Purpose: User Favorites Screen - Using Shared Components

import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { EmptyState, ProductGrid, ScreenHeader } from '../../components/shared';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

const FAVORITES = [
    { id: '1', name: 'صوفا مودرن مريحة', price: 2499, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80', isFavorite: true },
    { id: '2', name: 'طاولة قهوة خشبية', price: 899, discount: 15, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&q=80', isFavorite: true },
    { id: '3', name: 'مصباح أرضي ذهبي', price: 450, image: 'https://images.unsplash.com/photo-1513506003011-3b03c801e12b?w=500&q=80', isFavorite: true },
];

export default function FavoritesScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-white">
            {/* Shared Header */}
            <ScreenHeader
                title="المفضلة"
                subtitle={`${FAVORITES.length} منتجات محفوظة`}
                icon="heart"
                iconBgColor="#fef2f2"
                iconColor="#EF4444"
            />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{
                    paddingBottom: 100,
                    paddingHorizontal: isTablet ? 24 : 16,
                    paddingTop: isTablet ? 24 : 16,
                    maxWidth: isTablet ? 900 : '100%',
                    alignSelf: 'center',
                    width: '100%'
                }}
            >
                {FAVORITES.length > 0 ? (
                    <ProductGrid
                        products={FAVORITES}
                        onProductPress={(product) => router.push(`/product/${product.id}`)}
                    />
                ) : (
                    <EmptyState
                        icon="heart"
                        title="قائمة المفضلة فارغة"
                        description="لم تقم بإضافة أي منتجات للمفضلة بعد"
                        actionLabel="تصفح المنتجات"
                        onAction={() => router.push('/(tabs)/home')}
                    />
                )}
            </ScrollView>
        </View>
    );
}
