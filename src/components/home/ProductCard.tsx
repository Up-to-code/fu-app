
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/theme';

export interface ProductCardProps {
    image: string;
    title: string;
    price: number;
    discount?: number;
    isFavorite: boolean;
    onFavorite: () => void;
    onPress: () => void;
}

export const ProductCard = ({
    image,
    title,
    price,
    discount,
    isFavorite,
    onFavorite,
    onPress
}: ProductCardProps) => {

    const finalPrice = discount ? price - (price * (discount / 100)) : price;

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            className="w-[170px] bg-white rounded-xl overflow-hidden ml-3 border border-gray-100 pb-3"
        >
            {/* Image */}
            <View className="relative w-full h-[170px] bg-gray-50 mb-2">
                <Image
                    source={{ uri: image }}
                    className="w-full h-full"
                    resizeMode="cover"
                />

                <TouchableOpacity
                    onPress={onFavorite}
                    className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full items-center justify-center"
                >
                    <Feather
                        name="heart"
                        size={16}
                        color={isFavorite ? '#ef4444' : '#94a3b8'}
                        fill={isFavorite ? '#ef4444' : 'none'}
                    />
                </TouchableOpacity>

                {discount && (
                    <View className="absolute bottom-2 left-2 bg-red-500 px-2 py-0.5 rounded text-center">
                        <Text className="text-white text-[10px] font-bold">
                            {discount}% خصم
                        </Text>
                    </View>
                )}
            </View>

            {/* Content */}
            <View className="px-3">
                <Text
                    className="text-slate-800 font-cairo-medium text-xs text-right mb-1.5 h-8 leading-4"
                    numberOfLines={2}
                >
                    {title}
                </Text>

                <View className="flex-row-reverse items-center justify-between">
                    <Text
                        className="font-cairo-bold text-sm"
                        style={{ color: COLORS.primary }}
                    >
                        {Math.round(finalPrice)} ر.س
                    </Text>

                    {discount && (
                        <Text className="text-slate-400 text-[10px] line-through decoration-slate-400">
                            {price}
                        </Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};
