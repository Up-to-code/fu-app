// File: src/screens/LandingScreen.tsx
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const LandingScreen = () => {
    const router = useRouter();

    return (
        <View className="flex-1 bg-black">
            <StatusBar barStyle="light-content" />

            {/* Background Image */}
            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000' }}
                className="flex-1 justify-end"
                resizeMode="cover"
            >
                {/* Gradient Overlay */}
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.5)', 'black']}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    locations={[0, 0.4, 0.9]}
                />

                {/* Content Container */}
                <View className="px-8 pb-12 w-full">
                    {/* Icon/Logo Placeholder */}
                    <View className="w-16 h-16 bg-primary rounded-2xl items-center justify-center mb-8 self-end shadow-lg shadow-primary/40">
                        <Feather name="box" size={32} color="white" />
                    </View>

                    {/* Headline */}
                    <Text className="text-white text-4xl font-cairo-bold text-right mb-4 leading-tight">
                        صمم منزل {'\n'}
                        <Text className="text-primary">أحلامك</Text> بسهولة
                    </Text>

                    {/* Subtitle */}
                    <Text className="text-gray-400 text-base font-cairo-medium text-right mb-10 leading-7">
                        اكتشف أحدث صيحات الموضة في عالم الأثاث والديكور، واستخدم الذكاء الاصطناعي لتجربة القطع في غرفتك.
                    </Text>

                    {/* Action Buttons */}
                    <View className="space-y-4 gap-4">
                        {/* Get Started (Register) */}
                        <Link href="/auth/register" asChild>
                            <TouchableOpacity
                                className="w-full bg-primary py-4 rounded-2xl items-center shadow-lg shadow-primary/30"
                                activeOpacity={0.9}
                            >
                                <Text className="text-white text-lg font-cairo-bold">
                                    ابدأ الآن
                                </Text>
                            </TouchableOpacity>
                        </Link>

                        {/* Login */}
                        <Link href="/auth/login" asChild>
                            <TouchableOpacity
                                className="w-full bg-white/10 border border-white/20 py-4 rounded-2xl items-center"
                                activeOpacity={0.8}
                            >
                                <Text className="text-white text-lg font-cairo-bold">
                                    لدي حساب بالفعل
                                </Text>
                            </TouchableOpacity>
                        </Link>

                        {/* Guest Access */}
                        <TouchableOpacity
                            onPress={() => router.replace('/(tabs)/home')}
                            className="w-full py-2 items-center"
                        >
                            <Text className="text-gray-500 text-sm font-cairo-medium underline">
                                تصفح كزائر
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

export default LandingScreen;
