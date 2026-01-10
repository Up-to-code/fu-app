// File: src/components/home/HomeHeader.tsx
// Purpose: Simple home screen header with user info and actions

import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/theme';

export const HomeHeader = () => (
    <View className="flex-row-reverse justify-between items-center px-5 py-4">
        {/* User Info */}
        <View className="flex-row-reverse items-center gap-3">
            <View className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-white">
                <Image
                    source={{ uri: 'https://ui-avatars.com/api/?name=Ahmed+Mansour&background=1E3A5F&color=fff' }}
                    className="w-full h-full"
                />
            </View>
            <View>
                <Text className="text-xs text-slate-500 font-cairo-medium text-right mb-0.5">مرحباً بك 👋</Text>
                <Text className="text-base font-cairo-bold text-right" style={{ color: COLORS.primary }}>
                    أحمد منصور
                </Text>
            </View>
        </View>

        {/* Actions */}
        <View className="flex-row items-center gap-3">
            <Link href={"/search" as any} asChild>
                <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-white/80">
                    <Feather name="search" size={22} color={COLORS.primary} />
                </TouchableOpacity>
            </Link>
            <Link href={"/ai-design" as any} asChild>
                <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-white/80">
                    <Feather name="camera" size={22} color={COLORS.primary} />
                </TouchableOpacity>
            </Link>
        </View>
    </View>
);
