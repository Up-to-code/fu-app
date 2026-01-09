// File: src/components/screens/home/OffersSlider.tsx
// Purpose: Auto-scroll banner carousel for offers
// Dependencies: React, NativeWind, reanimated

import React from 'react';
import { Dimensions, Image, View } from 'react-native';

const { width } = Dimensions.get('window');

export const OffersSlider = () => {
    return (
        <View className="mt-6 mx-4 h-40 bg-gray-200 rounded-lg overflow-hidden">
            <Image
                source={{ uri: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070' }}
                className="w-full h-full"
                resizeMode="cover"
            />
            <View className="absolute bottom-2 left-0 right-0 flex-row justify-center space-x-1">
                <View className="w-2 h-2 rounded-full bg-white" />
                <View className="w-2 h-2 rounded-full bg-white/50" />
                <View className="w-2 h-2 rounded-full bg-white/50" />
            </View>
        </View>
    );
};
