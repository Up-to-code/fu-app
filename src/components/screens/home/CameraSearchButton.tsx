// File: src/components/screens/home/CameraSearchButton.tsx
// Purpose: Camera icon button for image search
// Dependencies: React, NativeWind

import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { COLORS } from '../../../constants/theme';

export const CameraSearchButton = () => {
    return (
        <TouchableOpacity className="bg-white p-3 rounded-lg items-center justify-center">
            <Ionicons name="camera-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
    );
};
