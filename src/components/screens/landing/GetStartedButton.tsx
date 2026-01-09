// File: src/components/screens/landing/GetStartedButton.tsx
// Purpose: Primary Call-to-Action button on Landing Screen
// Dependencies: React, components/ui/Button

import React from 'react';
import { View } from 'react-native';
import { Button } from '../../ui/Button';

interface GetStartedButtonProps {
    onPress: () => void;
}

export const GetStartedButton: React.FC<GetStartedButtonProps> = ({ onPress }) => {
    return (
        <View className="w-full px-6 pb-12 pt-6 bg-white border-t border-gray-100">
            <Button
                title="Get Started"
                onPress={onPress}
                variant="primary"
                fullWidth
            />
        </View>
    );
};
