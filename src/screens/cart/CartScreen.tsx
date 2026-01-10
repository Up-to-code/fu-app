// File: src/screens/cart/CartScreen.tsx
// Purpose: Shopping Cart Screen

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ActionButton, BottomBar, EmptyState, ScreenHeader } from '../../components/shared';
import { COLORS } from '../../constants/theme';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    discount?: number;
}

const MOCK_CART: CartItem[] = [
    { id: '1', name: 'صوفا مودرن مريحة', price: 2499, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80', quantity: 1 },
    { id: '2', name: 'طاولة قهوة خشبية', price: 899, discount: 15, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&q=80', quantity: 2 },
];

export default function CartScreen() {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>(MOCK_CART);

    const updateQuantity = (id: string, delta: number) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const removeItem = (id: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const getItemTotal = (item: CartItem) => {
        const price = item.discount ? item.price * (1 - item.discount / 100) : item.price;
        return Math.round(price * item.quantity);
    };

    const cartTotal = cartItems.reduce((sum, item) => sum + getItemTotal(item), 0);

    if (cartItems.length === 0) {
        return (
            <View className="flex-1 bg-white">
                <ScreenHeader title="السلة" icon="shopping-cart" />
                <EmptyState
                    icon="shopping-cart"
                    title="السلة فارغة"
                    description="لم تقم بإضافة أي منتجات للسلة بعد"
                    actionLabel="تصفح المنتجات"
                    onAction={() => router.push('/(tabs)/home')}
                />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white">
            <ScreenHeader
                title="السلة"
                subtitle={`${cartItems.length} منتجات`}
                icon="shopping-cart"
            />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{
                    paddingBottom: 140,
                    paddingHorizontal: isTablet ? 24 : 16,
                    paddingTop: isTablet ? 24 : 16,
                    maxWidth: isTablet ? 700 : '100%',
                    alignSelf: 'center',
                    width: '100%'
                }}
            >
                {cartItems.map((item) => (
                    <View
                        key={item.id}
                        className="flex-row-reverse bg-slate-50 rounded-2xl p-4 mb-4"
                    >
                        {/* Image */}
                        <Image
                            source={{ uri: item.image }}
                            className={`rounded-xl bg-slate-200 ${isTablet ? 'w-28 h-28' : 'w-24 h-24'}`}
                            resizeMode="cover"
                        />

                        {/* Content */}
                        <View className="flex-1 mr-4 justify-between">
                            <View>
                                <Text className={`font-cairo-bold text-slate-800 text-right mb-1 ${isTablet ? 'text-lg' : 'text-base'}`}>
                                    {item.name}
                                </Text>
                                <View className="flex-row-reverse items-center gap-2">
                                    <Text className={`font-cairo-bold ${isTablet ? 'text-lg' : 'text-base'}`} style={{ color: COLORS.primary }}>
                                        {getItemTotal(item)} ر.س
                                    </Text>
                                    {item.discount && (
                                        <Text className="text-slate-400 text-xs line-through">
                                            {item.price * item.quantity}
                                        </Text>
                                    )}
                                </View>
                            </View>

                            {/* Quantity & Remove */}
                            <View className="flex-row-reverse items-center justify-between mt-3">
                                <View className="flex-row items-center bg-white rounded-xl">
                                    <TouchableOpacity
                                        onPress={() => updateQuantity(item.id, -1)}
                                        className="w-8 h-8 items-center justify-center"
                                    >
                                        <Feather name="minus" size={16} color={COLORS.text} />
                                    </TouchableOpacity>
                                    <Text className="text-sm font-cairo-bold text-slate-800 px-3">
                                        {item.quantity}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => updateQuantity(item.id, 1)}
                                        className="w-8 h-8 items-center justify-center"
                                    >
                                        <Feather name="plus" size={16} color={COLORS.text} />
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    onPress={() => removeItem(item.id)}
                                    className="w-8 h-8 bg-red-50 rounded-full items-center justify-center"
                                >
                                    <Feather name="trash-2" size={16} color="#EF4444" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Bottom Bar */}
            <BottomBar>
                <View className="flex-1">
                    <Text className={`text-slate-500 font-cairo-medium text-right ${isTablet ? 'text-base' : 'text-sm'}`}>
                        الإجمالي
                    </Text>
                    <Text className={`font-cairo-bold text-right ${isTablet ? 'text-2xl' : 'text-xl'}`} style={{ color: COLORS.primary }}>
                        {cartTotal} ر.س
                    </Text>
                </View>
                <View className="flex-1 ml-4">
                    <ActionButton
                        label="إتمام الطلب"
                        icon="arrow-left"
                        onPress={() => console.log('Checkout')}
                    />
                </View>
            </BottomBar>
        </View>
    );
}
