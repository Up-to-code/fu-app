// File: src/components/screens/home/ProductCard.tsx
// Purpose: Single product display card
// Dependencies: React, NativeWind

import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
}

interface ProductCardProps {
    product: Product;
    onPress: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="w-36 mr-4 bg-white rounded-lg shadow-sm overflow-hidden"
        >
            <Image
                source={{ uri: product.image }}
                className="w-full h-36"
                resizeMode="cover"
            />
            <View className="p-3">
                <Text className="font-semibold text-text mb-1" numberOfLines={1}>{product.name}</Text>
                <Text className="text-primary font-bold">${product.price}</Text>
            </View>
        </TouchableOpacity>
    );
};
