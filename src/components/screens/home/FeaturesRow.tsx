// File: src/components/screens/home/FeaturesRow.tsx
// Purpose: Horizontal row of feature icons
// Dependencies: React, NativeWind

import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { COLORS } from '../../../constants/theme';

const FeatureItem = ({ icon, title, color }: { icon: any, title: string, color: string }) => (
    <View className="items-center mr-6">
        <View className={`w-14 h-14 rounded-full items-center justify-center bg-${color}-100 mb-2`}>
            <Ionicons name={icon} size={24} color={COLORS.primary} />
        </View>
        <Text className="text-xs font-semibold text-text text-center">{title}</Text>
    </View>
);

export const FeaturesRow = () => {
    return (
        <View className="mt-6 pl-4">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <FeatureItem icon="refresh" title="Transform" color="blue" />
                <FeatureItem icon="pricetag" title="Sell" color="green" />
                <FeatureItem icon="add-circle" title="Add" color="purple" />
                <FeatureItem icon="gift" title="Gifts" color="red" />
            </ScrollView>
        </View>
    );
};
