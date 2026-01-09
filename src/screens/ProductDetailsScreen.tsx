import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Share, TouchableOpacity, View } from 'react-native';
import { ProductImageGallery } from '../components/screens/product/ProductImageGallery';
import { QuantitySelector } from '../components/screens/product/QuantitySelector';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Typography } from '../components/ui/Typography';
import { COLORS } from '../constants/theme';

export default function ProductDetailsScreen({ id }: { id: string }) {
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

    // Mock Data - Replace with actual data fetching
    const product = {
        id,
        name: 'صوفا مودرن مريحة',
        description: 'صوفا عالية الجودة مصممة لتوفير أقصى درجات الراحة والأناقة لغرفة المعيشة الخاصة بك. مصنوعة من خشب الزان المتين وقماش الكتان الفاخر.',
        price: 2499,
        rating: 4.8,
        reviews: 124,
        images: [
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
            'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80',
            'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
        ],
        colors: [
            { id: 1, name: 'رمادي', code: '#808080' },
            { id: 2, name: 'كحلي', code: '#000080' },
            { id: 3, name: 'بيج', code: '#F5F5DC' },
        ],
        category: 'غرف معيشة',
        tags: ['صوفا', 'مودرن', 'مريح'],
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Check out this amazing product: ${product.name}`,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View className="flex-1 bg-white">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Header Actions */}
                <View className="absolute top-12 left-0 right-0 z-10 flex-row justify-between px-6">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-10 h-10 bg-white/80 rounded-full items-center justify-center backdrop-blur-sm shadow-sm"
                    >
                        <Feather name="arrow-right" size={24} color={COLORS.text} />
                    </TouchableOpacity>
                    <View className="flex-row space-x-3 gap-3">
                        <TouchableOpacity
                            onPress={handleShare}
                            className="w-10 h-10 bg-white/80 rounded-full items-center justify-center backdrop-blur-sm shadow-sm"
                        >
                            <Feather name="share-2" size={20} color={COLORS.text} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setIsFavorite(!isFavorite)}
                            className="w-10 h-10 bg-white/80 rounded-full items-center justify-center backdrop-blur-sm shadow-sm"
                        >
                            <Feather
                                name="heart"
                                size={20}
                                color={isFavorite ? COLORS.accent : COLORS.text}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Image Gallery */}
                <ProductImageGallery images={product.images} />

                {/* Content */}
                <View className="px-6 pt-6 -mt-6 bg-white rounded-t-[32px]">
                    <View className="w-12 h-1 bg-gray-200 rounded-full self-center mb-6" />

                    <View className="flex-row justify-between items-start mb-4">
                        <View className="flex-1 mr-4">
                            <Badge label={product.category} color={COLORS.primary + '15'} textColor={COLORS.primary} />
                            <Typography variant="h2" className="mt-2 text-right">{product.name}</Typography>
                        </View>
                        <View className="items-end">
                            <View className="flex-row items-baseline gap-1">
                                <Typography variant="h1" color={COLORS.primary} bold>{product.price}</Typography>
                                <Typography variant="body" color={COLORS.primary} bold>ر.س</Typography>
                            </View>
                            <View className="flex-row items-center gap-1 mt-1">
                                <Feather name="star" size={14} color="#F59E0B" />
                                <Typography variant="caption" bold>{product.rating} ({product.reviews} تقييم)</Typography>
                            </View>
                        </View>
                    </View>

                    {/* Description */}
                    <View className="mb-6">
                        <Typography variant="h3" className="mb-2 text-right">الوصف</Typography>
                        <Typography variant="body" color={COLORS.textLight} className="text-right leading-6">
                            {product.description}
                        </Typography>
                    </View>

                    {/* Colors */}
                    <View className="mb-6">
                        <Typography variant="h3" className="mb-3 text-right">الألوان</Typography>
                        <View className="flex-row justify-end space-x-4 gap-4" style={{ direction: 'rtl' }}>
                            {product.colors.map((color, index) => (
                                <TouchableOpacity
                                    key={color.id}
                                    onPress={() => setSelectedColor(index)}
                                    className={`w-12 h-12 rounded-full items-center justify-center border-2 ${selectedColor === index ? 'border-primary' : 'border-transparent'}`}
                                >
                                    <View style={{ backgroundColor: color.code }} className="w-9 h-9 rounded-full" />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Action Bar */}
            <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-6 flex-row items-center justify-between pb-10" style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 20
            }}>
                <View className="flex-row w-[40%]">
                    <QuantitySelector
                        quantity={quantity}
                        onIncrease={() => setQuantity(q => q + 1)}
                        onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
                    />
                </View>

                <View className="flex-1 ml-4">
                    <Button
                        title="إضافة للسلة"
                        onPress={() => console.log('Add to cart')}
                        fullWidth
                    />
                </View>
            </View>
        </View>
    );
}
