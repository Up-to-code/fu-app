// File: src/components/screens/landing/ImageCarousel.tsx
// Purpose: Auto-rotating image slider (simplified without Reanimated)
// Dependencies: React, React Native

import React, { useEffect, useState } from 'react';
import { Dimensions, Image, View } from 'react-native';

const { width } = Dimensions.get('window');

// Placeholder images
const IMAGES = [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=2070&auto=format&fit=crop'
];

export const ImageCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <View className="flex-1 w-full relative bg-gray-100">
            <Image
                source={{ uri: IMAGES[currentIndex] }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
            />
            <View className="absolute bottom-10 left-0 right-0 flex-row justify-center space-x-2">
                {IMAGES.map((_, index) => (
                    <View
                        key={index}
                        className={`h-2 w-2 rounded-full ${index === currentIndex ? 'bg-primary' : 'bg-gray-300'}`}
                    />
                ))}
            </View>
        </View>
    );
};
