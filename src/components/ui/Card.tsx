// File: src/components/ui/Card.tsx
// Purpose: Reusable card container with shadow and spacing
// Dependencies: React, React Native, NativeWind

import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
    return (
        <View
            className={`bg-white rounded-lg p-4 shadow-sm ${className || ''}`}
            {...props}
        >
            {children}
        </View>
    );
};
