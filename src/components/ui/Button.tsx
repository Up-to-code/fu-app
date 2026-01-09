// File: src/components/ui/Button.tsx
// Purpose: Reusable button component with variants
// Dependencies: React, React Native, NativeWind

import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    fullWidth = false
}) => {
    const getButtonStyle = () => {
        switch (variant) {
            case 'outline':
                return 'bg-transparent border border-primary';
            case 'secondary':
                return 'bg-white border border-border';
            case 'primary':
            default:
                return 'bg-primary';
        }
    };

    const getTextStyle = () => {
        switch (variant) {
            case 'outline':
                return 'text-primary font-semibold';
            case 'secondary':
                return 'text-text font-semibold';
            case 'primary':
            default:
                return 'text-white font-semibold';
        }
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            className={`${getButtonStyle()} rounded-lg px-6 py-4 ${fullWidth ? 'w-full' : 'self-start'} items-center justify-center`}
        >
            <Text className={getTextStyle()}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};
