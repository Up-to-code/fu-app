// File: src/components/ui/Input.tsx
// Purpose: Reusable input component with consistent styling
// Dependencies: React, React Native, NativeWind

import React from 'react';
import { KeyboardTypeOptions, TextInput } from 'react-native';
import { COLORS } from '../../constants/theme';

interface InputProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: KeyboardTypeOptions;
}

export const Input: React.FC<InputProps> = ({
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    keyboardType
}) => {
    return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor={COLORS.textLight}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            className="border border-border rounded-lg px-4 py-4 text-text bg-white"
        />
    );
};
