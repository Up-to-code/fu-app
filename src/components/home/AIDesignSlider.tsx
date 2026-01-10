
import { Link } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SLIDER_MARGIN_X = 20;
const SLIDE_WIDTH = SCREEN_WIDTH - (SLIDER_MARGIN_X * 2);

const SLIDES = [
    {
        id: '1',
        title: 'صمم غرفتك بالذكاء الاصطناعي',
        description: 'حمّل صورة غرفتك ودع الذكاء الاصطناعي يقترح عليك أفضل التصاميم.',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
        cta: 'جرب المصمم الذكي',
        link: '/ai-design'
    },
    {
        id: '2',
        title: 'جرب الأثاث في بيتك',
        description: 'استخدم تقنية الواقع المعزز لتشاهد كيف يبدو الأثاث في غرفتك قبل الشراء.',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
        cta: 'افتح الكاميرا',
        link: '/ar-view'
    },
    {
        id: '3',
        title: 'تشكيلة مودرن جديدة',
        description: 'اكتشف أحدث منتجاتنا بتصاميم عصرية وبسيطة.',
        image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80',
        cta: 'تصفح المجموعة',
        link: '/category/modern'
    }
];

export const AIDesignSlider = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const scrollRef = useRef<ScrollView>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            let nextSlide = activeSlide + 1;
            if (nextSlide >= SLIDES.length) {
                nextSlide = 0;
            }
            setActiveSlide(nextSlide);
            scrollRef.current?.scrollTo({ x: nextSlide * SLIDE_WIDTH, animated: true });
        }, 5000);

        return () => clearInterval(interval);
    }, [activeSlide]);

    const onScroll = (event: any) => {
        const slide = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
        if (slide !== activeSlide && slide >= 0 && slide < SLIDES.length) {
            setActiveSlide(slide);
        }
    };

    return (
        <View className="mx-5 my-4">
            {/* Slider Container */}
            <View className="h-[200px] rounded-2xl overflow-hidden bg-gray-100 relative">
                <ScrollView
                    ref={scrollRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={onScroll}
                    scrollEventThrottle={16}
                // Note: transform scaleX -1 might be used for true RTL scroll on Android sometimes, 
                // but for now keeping standard direction and managing content layout is safer.
                >
                    {SLIDES.map((slide, index) => (
                        <View key={slide.id} style={{ width: SLIDE_WIDTH }} className="h-full relative justify-center">
                            {/* Background Image */}
                            <Image
                                source={{ uri: slide.image }}
                                className="absolute inset-0 w-full h-full"
                                resizeMode="cover"
                            />
                            {/* Overlay - stronger for text readability */}
                            <View className="absolute inset-0 bg-black/40" />

                            {/* Content */}
                            <View className="p-6 relative z-10 items-end">
                                <Text className="text-white text-xl font-cairo-bold mb-2 text-right">
                                    {slide.title}
                                </Text>
                                <Text className="text-white/90 text-sm mb-4 leading-6 text-right w-full font-cairo-medium" numberOfLines={2}>
                                    {slide.description}
                                </Text>

                                <Link href={slide.link as any} asChild>
                                    <TouchableOpacity className="bg-white px-5 py-2.5 rounded-full self-start"
                                        onPress={() => { }} // dummy
                                    >
                                        <Text
                                            className="font-cairo-bold text-sm"
                                            style={{ color: COLORS.primary }}
                                        >
                                            {slide.cta}
                                        </Text>
                                    </TouchableOpacity>
                                </Link>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                {/* Pagination Dots */}
                <View className="absolute bottom-4 w-full flex-row justify-center gap-1.5 direction-ltr">
                    {SLIDES.map((_, index) => (
                        <View
                            key={index}
                            className={`h-1.5 rounded-full ${index === activeSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
};
