// File: src/components/screens/home/SearchBar.tsx
// Purpose: Search input field
// Dependencies: React, NativeWind

import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { TextInput, View } from 'react-native';
import { COLORS } from '../../../constants/theme';

export const SearchBar = () => {
    return (
        <View className="flex-1 flex-row items-center bg-white rounded-lg px-3 h-12">
            <Ionicons name="search" size={20} color={COLORS.textLight} />
            <TextInput
                placeholder="Search furniture..."
                placeholderTextColor={COLORS.textLight}
                className="flex-1 ml-2 text-text"
            />
        </View>
    );
};
