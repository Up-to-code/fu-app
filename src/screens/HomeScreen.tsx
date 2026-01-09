// File: src/screens/HomeScreen.tsx
// Purpose: Main Home screen
// Dependencies: React, components/screens/home/*, hooks/useProducts (simulated)

import React from 'react';
import { ScrollView, View } from 'react-native';
import { CategorySection } from '../components/screens/home/CategorySection';
import { FeaturesRow } from '../components/screens/home/FeaturesRow';
import { HomeHeader } from '../components/screens/home/HomeHeader';
import { OffersSlider } from '../components/screens/home/OffersSlider';

// Mock Data
const BEDROOM_PRODUCTS = [
    { id: '1', name: 'Modern Bed', price: 299, image: 'https://images.unsplash.com/photo-1505693416388-b0346ef41439?q=80&w=1000' },
    { id: '2', name: 'Queen Bed', price: 399, image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1000' },
    { id: '3', name: 'King Bed', price: 499, image: 'https://images.unsplash.com/photo-1522771753035-4850fa6361ea?q=80&w=1000' },
];

const STUDIO_PRODUCTS = [
    { id: '4', name: 'Lounge Chair', price: 99, image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1000' },
    { id: '5', name: 'Office Chair', price: 149, image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=1000' },
    { id: '6', name: 'Accent Chair', price: 199, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=1000' },
];

const HomeScreen = () => {
    return (
        <View className="flex-1 bg-background">
            <HomeHeader />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                <OffersSlider />
                <FeaturesRow />

                <CategorySection title="Bedroom Furniture" products={BEDROOM_PRODUCTS} />
                <CategorySection title="Studios Furniture" products={STUDIO_PRODUCTS} />
            </ScrollView>
        </View>
    );
};

export default HomeScreen;
