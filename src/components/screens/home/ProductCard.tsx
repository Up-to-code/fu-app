import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/theme';

interface Product {
    id: string;
    name: string;
    price: number;
    rating?: number;
    image: string;
    category?: string;
    isFavorite?: boolean;
    discount?: number;
}

interface ProductCardProps {
    product: Product;
    onPress: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            className="bg-white rounded-2xl overflow-hidden mb-2 border border-gray-100 shadow-sm"
            style={{ elevation: 2 }}
        >
            <View className="relative">
                <Image
                    source={{ uri: product.image }}
                    className="w-full h-40 bg-gray-100"
                    resizeMode="cover"
                />

                {/* Discount Badge */}
                {product.discount && (
                    <View className="absolute top-2 left-2 bg-red-500 px-2 py-1 rounded-md">
                        <Text className="text-white text-xs font-cairo-bold">
                            {product.discount}% خصم
                        </Text>
                    </View>
                )}

                {/* Favorite Button */}
                <TouchableOpacity
                    className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full items-center justify-center shadow-sm"
                >
                    <Feather
                        name="heart"
                        size={16}
                        color={product.isFavorite ? COLORS.accent : COLORS.textLight}
                    />
                </TouchableOpacity>
            </View>

            <View className="p-3">
                <View className="flex-row justify-between items-start mb-1">
                    <View className="flex-1 mr-2">
                        {product.category && (
                            <Text className="text-xs text-gray-400 mb-1 font-cairo-medium">
                                {product.category}
                            </Text>
                        )}
                        <Text
                            numberOfLines={1}
                            className="text-sm font-cairo-bold text-slate-800 text-right"
                        >
                            {product.name}
                        </Text>
                    </View>
                </View>

                <View className="flex-row justify-between items-center mt-2">
                    <View className="flex-row items-baseline gap-1">
                        <Text
                            className="text-lg font-cairo-bold text-primary"
                        >
                            {product.price}
                        </Text>
                        <Text
                            className="text-xs text-primary font-cairo-bold"
                        >
                            ر.س
                        </Text>
                    </View>

                    {product.rating && (
                        <View className="flex-row items-center gap-1 bg-gray-50 px-1.5 py-0.5 rounded-md">
                            <Text className="text-xs text-slate-600 font-cairo-bold">
                                {product.rating}
                            </Text>
                            <Feather name="star" size={10} color="#F59E0B" style={{ marginTop: -2 }} />
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};
