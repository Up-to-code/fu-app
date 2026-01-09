// File: src/screens/AccountScreen.tsx
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Image, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/theme';
import { useAuth } from '../hooks/useAuth';

export default function AccountScreen() {
    const router = useRouter();
    const { logout, user } = useAuth();
    const [isDrakMode, setIsDarkMode] = React.useState(false);
    const [notifications, setNotifications] = React.useState(true);

    const handleLogout = async () => {
        Alert.alert(
            'تسجيل الخروج',
            'هل أنت متأكد أنك تريد تسجيل الخروج؟',
            [
                { text: 'إلغاء', style: 'cancel' },
                {
                    text: 'خروج',
                    style: 'destructive',
                    onPress: async () => {
                        await logout();
                        router.replace('/');
                    }
                },
            ]
        );
    };

    const SettingItem = ({ icon, label, subLabel, onPress, color = COLORS.text, showArrow = true }: any) => (
        <TouchableOpacity
            onPress={onPress}
            className="flex-row items-center justify-between py-4 border-b border-gray-50"
            activeOpacity={0.7}
        >
            {showArrow && <Feather name="chevron-left" size={20} color="#CBD5E1" />}

            <View className="flex-1 items-end mr-4">
                <Text className="text-base text-slate-800 font-cairo-bold">
                    {label}
                </Text>
                {subLabel && (
                    <Text className="text-xs text-slate-400 mt-0.5 font-cairo-medium">
                        {subLabel}
                    </Text>
                )}
            </View>

            <View className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center">
                {icon}
            </View>
        </TouchableOpacity>
    );

    return (
        <ScrollView className="flex-1 bg-white" contentContainerStyle={{ paddingBottom: 100 }}>
            {/* Header */}
            <View className="pt-16 pb-8 px-6 bg-slate-50 items-center">
                <View className="relative mb-4">
                    <View className="w-24 h-24 rounded-full bg-white p-1 shadow-sm">
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=80' }}
                            className="w-full h-full rounded-full"
                        />
                    </View>
                    <TouchableOpacity className="absolute bottom-0 right-0 bg-primary w-8 h-8 rounded-full items-center justify-center border-2 border-white">
                        <Feather name="camera" size={14} color="white" />
                    </TouchableOpacity>
                </View>

                <Text className="text-xl font-cairo-bold text-slate-800 mb-1">
                    {user?.name || 'أحمد منصور'}
                </Text>
                <Text className="text-sm text-slate-500 font-cairo-medium">
                    {user?.email || 'ahmed@example.com'}
                </Text>
            </View>

            {/* Settings Sections */}
            <View className="px-6 pt-6">
                <Text className="text-right text-lg font-cairo-bold text-slate-800 mb-4">
                    إعدادات الحساب
                </Text>

                <SettingItem
                    label="تعديل الملف الشخصي"
                    subLabel="الاسم، البريد الإلكتروني، الصورة"
                    icon={<Feather name="user" size={20} color={COLORS.primary} />}
                />
                <SettingItem
                    label="طلباتي"
                    subLabel="تتبع وإدارة طلباتك السابقة"
                    icon={<Feather name="package" size={20} color={COLORS.primary} />}
                />
                <SettingItem
                    label="العناوين المحفوظة"
                    subLabel="إدارة عناوين التوصيل الخاصة بك"
                    icon={<Feather name="map-pin" size={20} color={COLORS.primary} />}
                />
            </View>

            <View className="h-2 bg-slate-50 my-6" />

            <View className="px-6">
                <Text className="text-right text-lg font-cairo-bold text-slate-800 mb-4">
                    عام
                </Text>

                <View className="flex-row items-center justify-between py-4 border-b border-gray-50">
                    <Switch
                        value={notifications}
                        onValueChange={setNotifications}
                        trackColor={{ true: COLORS.primary }}
                    />
                    <View className="flex-1 items-end mr-4">
                        <Text className="text-base text-slate-800 font-cairo-bold">
                            الإشعارات
                        </Text>
                    </View>
                    <View className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center">
                        <Feather name="bell" size={20} color={COLORS.primary} />
                    </View>
                </View>

                <SettingItem
                    label="اللغة"
                    subLabel="العربية (الافتراضية)"
                    icon={<Feather name="globe" size={20} color={COLORS.primary} />}
                />

                <SettingItem
                    label="المساعدة والدعم"
                    icon={<Feather name="help-circle" size={20} color={COLORS.primary} />}
                />
            </View>

            <View className="h-2 bg-slate-50 my-6" />

            <View className="px-6 pb-8">
                <TouchableOpacity
                    onPress={handleLogout}
                    className="flex-row items-center justify-center py-4 bg-red-50 rounded-xl space-x-2 space-x-reverse"
                >
                    <Feather name="log-out" size={20} color="#EF4444" />
                    <Text className="text-red-500 font-cairo-bold text-base mr-2">
                        تسجيل الخروج
                    </Text>
                </TouchableOpacity>

                <Text className="text-center text-xs text-slate-400 mt-6 font-cairo-medium">
                    الإصدار 1.0.0
                </Text>
            </View>

        </ScrollView>
    );
}
