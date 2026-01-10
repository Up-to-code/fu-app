// File: src/components/screens/ai/LoadingSteps.tsx
// Purpose: Animated loading steps component for AI processing

import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Text, View } from 'react-native';

interface LoadingStep {
    text: string;
    icon: string;
}

interface LoadingStepsProps {
    steps: LoadingStep[];
    currentStep: number;
}

export const LoadingSteps: React.FC<LoadingStepsProps> = ({ steps, currentStep }) => {
    return (
        <View className="mt-8 w-72">
            {steps.map((step, index) => (
                <View
                    key={index}
                    className="flex-row items-center mb-3"
                    style={{
                        opacity: index <= currentStep ? 1 : 0.3,
                    }}
                >
                    <Ionicons
                        name={step.icon as any}
                        size={20}
                        color={index === currentStep ? '#FF6B35' : index < currentStep ? '#22C55E' : 'white'}
                    />
                    <Text
                        className={`text-right flex-1 mr-3 font-cairo-bold text-sm`}
                        style={{
                            color: index <= currentStep ? 'white' : '#6B7280',
                        }}
                    >
                        {step.text}
                    </Text>
                    {index < currentStep && (
                        <Ionicons name="checkmark" size={18} color="#22C55E" />
                    )}
                </View>
            ))}
        </View>
    );
};
