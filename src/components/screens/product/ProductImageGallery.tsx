import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, View } from 'react-native';

const { width } = Dimensions.get('window');

interface ProductImageGalleryProps {
    images: string[];
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const onScroll = (event: any) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(index);
        setActiveIndex(roundIndex);
    };

    return (
        <View>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                scrollEventThrottle={16}
                className="bg-gray-100"
            >
                {images.map((image, index) => (
                    <View key={index} style={{ width, height: width }}>
                        <Image
                            source={{ uri: image }}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                        />
                    </View>
                ))}
            </ScrollView>

            {/* Pagination Dots */}
            <View className="flex-row justify-center items-center absolute bottom-4 left-0 right-0 space-x-2">
                {images.map((_, index) => (
                    <View
                        key={index}
                        className={`h-2 rounded-full mx-1 ${index === activeIndex ? 'w-6 bg-primary' : 'w-2 bg-gray-300'}`}
                        style={{ elevation: 2 }}
                    />
                ))}
            </View>
        </View>
    );
};
