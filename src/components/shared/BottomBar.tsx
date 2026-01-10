// File: src/components/shared/BottomBar.tsx
// Purpose: Bottom action bar with SafeAreaView

import React from 'react';
import { Dimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

interface BottomBarProps {
    children: React.ReactNode;
    maxWidth?: number;
}

export const BottomBar: React.FC<BottomBarProps> = ({
    children,
    maxWidth = isTablet ? 700 : undefined,
}) => {
    return (
        <SafeAreaView
            className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100"
            edges={['bottom']}
        >
            <View
                className="flex-row items-center justify-between"
                style={{
                    paddingHorizontal: isTablet ? 32 : 20,
                    paddingVertical: isTablet ? 20 : 16,
                    maxWidth: maxWidth,
                    alignSelf: 'center',
                    width: '100%',
                }}
            >
                {children}
            </View>
        </SafeAreaView>
    );
};

export default BottomBar;
