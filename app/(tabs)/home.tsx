import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ProductCard } from '../../src/components/screens/home/ProductCard';
import { COLORS } from '../../src/constants/theme';

const FEATURED_PRODUCTS = [
    {
        id: '1',
        name: 'صوفا مودرن مريحة',
        price: 2499,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80',
        category: 'كنب',
        isFavorite: false,
    },
    {
        id: '2',
        name: 'طاولة قهوة خشبية',
        price: 899,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&q=80',
        discount: 15,
        category: 'طاولات',
        isFavorite: true,
    },
    {
        id: '3',
        name: 'مصباح أرضي ذهبي',
        price: 450,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1513506003011-3b03c801e12b?w=500&q=80',
        category: 'إضاءة',
        isFavorite: false,
    },
    {
        id: '4',
        name: 'كرسي استرخاء مخمل',
        price: 1250,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&q=80',
        category: 'كراسي',
        isFavorite: false,
    },
];

export default function HomeScreen() {


    return (
        <View className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="bg-primary pt-14 pb-6 px-6 rounded-b-[32px] shadow-lg shadow-black/20" style={{ zIndex: 100 }}>
                {/* Top Row: User & Name */}
                <View className="flex-row justify-between items-center mb-6">
                    {/* Left: Icon/Notification */}
                    <View className="w-10 h-10 bg-white/10 rounded-full items-center justify-center border border-white/10">
                        <Feather name="bell" size={20} color="white" />
                        <View className="absolute top-2.5 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#1E3A5F]" />
                    </View>

                    {/* Right: Name & Greeting */}
                    <View>
                        <Text className="text-white/70 text-sm text-right font-cairo-medium">
                            مرحباً بك 👋
                        </Text>
                        <Text className="text-white text-lg font-cairo-bold text-right pt-1">
                            Ahmed Mansour
                        </Text>
                    </View>
                </View>

                {/* Search Bar with Camera */}
                <View className="flex-row items-center bg-white rounded-2xl px-4 py-3.5 shadow-sm">
                    <Feather name="search" size={20} color={COLORS.textLight} />
                    <TextInput
                        placeholder="ابحث عن أثاث..."
                        className="flex-1 text-right mx-3 font-cairo-medium text-slate-800 text-base"
                        placeholderTextColor={COLORS.textLight}
                    />
                    <View className="w-px h-6 bg-gray-200 mx-2" />
                    <Link href="/ai-design" asChild>
                        <TouchableOpacity>
                            <Feather name="camera" size={20} color={COLORS.primary} />
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>

            <ScrollView className="flex-1 px-4 pt-6" contentContainerStyle={{ paddingBottom: 100 }}>
                {/* AI Design Banner */}
                <Link href="/ai-design" asChild>
                    <TouchableOpacity
                        className="mb-6 bg-slate-800 rounded-3xl overflow-hidden relative"
                        style={{ elevation: 4 }}
                    >
                        <View className="p-6 relative z-10 w-[70%]">
                            <View className="w-10 h-10 bg-white/10 rounded-full items-center justify-center mb-3">
                                <Feather name="maximize" size={20} color={COLORS.accent} />
                            </View>
                            <Text className="text-white text-lg font-cairo-bold mb-1 text-right">
                                صمم غرفتك بالذكاء الاصطناعي
                            </Text>
                            <Text className="text-gray-300 text-xs text-right leading-5 font-cairo-medium">
                                صور غرفتك وخلي الذكاء الاصطناعي يقترح عليك أفضل الأثاث
                            </Text>
                        </View>

                        {/* Decorative Elements */}
                        <View className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary rounded-full opacity-50" />
                        <View className="absolute right-20 -top-10 w-32 h-32 bg-accent rounded-full opacity-20" />
                    </TouchableOpacity>
                </Link>

                {/* Featured Products */}
                <View className="mb-6">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-primary text-sm font-cairo-bold">
                            عرض الكل
                        </Text>
                        <Text className="text-slate-800 text-lg font-cairo-bold">
                            منتجات مميزة
                        </Text>
                    </View>

                    <View className="flex-row flex-wrap justify-between" style={{ direction: 'rtl' }}>
                        {FEATURED_PRODUCTS.map((item) => (
                            <Link key={item.id} href={`/product/${item.id}`} asChild>
                                <TouchableOpacity className="w-[48%] mb-4">
                                    <ProductCard
                                        product={item}
                                        onPress={() => { }}
                                    />
                                </TouchableOpacity>
                            </Link>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
