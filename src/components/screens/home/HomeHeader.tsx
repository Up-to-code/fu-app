// File: src/components/screens/home/HomeHeader.tsx
// Purpose: Header with blue background, search bar, and camera button
// Dependencies: React, components/screens/home/SearchBar, components/screens/home/CameraSearchButton

import React from 'react';
import { StatusBar, View } from 'react-native';
import { CameraSearchButton } from './CameraSearchButton';
import { SearchBar } from './SearchBar';

export const HomeHeader = () => {
    return (
        <View className="bg-primary pt-12 pb-6 px-4 rounded-b-2xl">
            <StatusBar barStyle="light-content" backgroundColor="#1E40AF" />
            <View className="flex-row items-center space-x-3">
                <SearchBar />
                <CameraSearchButton />
            </View>
        </View>
    );
};
