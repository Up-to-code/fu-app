import React from 'react';
import { View } from 'react-native';
import { COLORS } from '../../constants/theme';
import { Typography } from './Typography';

interface BadgeProps {
    label: string;
    color?: string;
    textColor?: string;
}

export const Badge: React.FC<BadgeProps> = ({
    label,
    color = COLORS.background,
    textColor = COLORS.textLight,
}) => {
    return (
        <View style={{ backgroundColor: color, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 }}>
            <Typography variant="caption" color={textColor} bold>
                {label}
            </Typography>
        </View>
    );
};
