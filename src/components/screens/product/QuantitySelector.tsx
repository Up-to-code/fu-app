import { Feather } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { Typography } from '../../ui/Typography';

interface QuantitySelectorProps {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
    max?: number;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
    quantity,
    onIncrease,
    onDecrease,
    max = 10
}) => {
    return (
        <View className="flex-row items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
            <TouchableOpacity
                onPress={onIncrease}
                disabled={quantity >= max}
                className={`w-8 h-8 rounded-lg items-center justify-center ${quantity >= max ? 'bg-gray-100' : 'bg-white shadow-sm'}`}
            >
                <Feather name="plus" size={16} color={quantity >= max ? COLORS.textLight : COLORS.primary} />
            </TouchableOpacity>

            <View className="w-10 items-center">
                <Typography variant="h3">{quantity}</Typography>
            </View>

            <TouchableOpacity
                onPress={onDecrease}
                disabled={quantity <= 1}
                className={`w-8 h-8 rounded-lg items-center justify-center ${quantity <= 1 ? 'bg-gray-100' : 'bg-white shadow-sm'}`}
            >
                <Feather name="minus" size={16} color={quantity <= 1 ? COLORS.textLight : COLORS.primary} />
            </TouchableOpacity>
        </View>
    );
};
