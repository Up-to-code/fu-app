// Image Search - redirect to shared camera
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';

export default function ImageSearchScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <View className="flex-row-reverse items-center justify-between px-4 py-3 border-b border-slate-100">
                <TouchableOpacity onPress={() => router.back()}><Feather name="arrow-right" size={24} color={COLORS.text} /></TouchableOpacity>
                <Text className="font-cairo-bold text-lg text-slate-800">البحث بالصورة</Text>
                <View className="w-6" />
            </View>

            <View className="flex-1 items-center justify-center px-6">
                <View className="w-32 h-32 rounded-full bg-primary/10 items-center justify-center mb-6">
                    <Feather name="camera" size={48} color={COLORS.primary} />
                </View>
                <Text className="font-cairo-bold text-xl text-slate-800 text-center mb-2">ابحث بصورة</Text>
                <Text className="font-cairo-medium text-slate-500 text-center mb-8">التقط صورة للعثور على منتجات مشابهة</Text>

                <View className="w-full gap-3" style={{ maxWidth: 320 }}>
                    <TouchableOpacity onPress={() => router.push('/camera?mode=search' as any)} className="bg-primary py-4 rounded-2xl flex-row-reverse items-center justify-center gap-2">
                        <Feather name="camera" size={20} color="white" />
                        <Text className="font-cairo-bold text-white text-base">فتح الكاميرا</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('/camera?mode=search' as any)} className="bg-slate-100 py-4 rounded-2xl flex-row-reverse items-center justify-center gap-2">
                        <Feather name="image" size={20} color={COLORS.text} />
                        <Text className="font-cairo-bold text-slate-700 text-base">اختيار من المعرض</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
