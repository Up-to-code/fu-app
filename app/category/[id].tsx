import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function CategoryDetailsRoute() {
    const { id, name } = useLocalSearchParams();

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text>Category: {name} (ID: {id})</Text>
        </View>
    );
}
