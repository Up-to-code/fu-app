// File: src/screens/ai/CameraCaptureScreen.tsx
// Purpose: Real Camera UI for AI Room Design with Working Flashlight
// Fix: Using `router` global instead of `useRouter()` hook

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { Alert, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/theme';
import { getFlashMode, saveAISession, saveFlashMode } from '../../utils/storage';

const CameraCaptureScreen = () => {
    const [facing, setFacing] = useState<CameraType>('back');
    const [flashMode, setFlashMode] = useState<'off' | 'auto' | 'torch'>(() => getFlashMode());
    const [showFlash, setShowFlash] = useState(false);
    const [isFocused, setIsFocused] = useState(true);
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);

    // Turn off torch when screen loses focus
    useFocusEffect(
        useCallback(() => {
            setIsFocused(true);
            return () => {
                setIsFocused(false);
            };
        }, [])
    );

    // Handle permission
    if (!permission) {
        return <View className="flex-1 bg-black" />;
    }

    if (!permission.granted) {
        return (
            <View className="flex-1 bg-black items-center justify-center px-8">
                <StatusBar barStyle="light-content" />
                <Ionicons name="camera-outline" size={64} color="white" style={{ marginBottom: 20 }} />
                <Text className="text-white text-xl font-bold text-center mb-4" style={{ fontFamily: 'Cairo_700Bold' }}>
                    نحتاج إلى إذن الكاميرا
                </Text>
                <Text className="text-gray-400 text-center mb-8" style={{ fontFamily: 'Cairo_500Medium' }}>
                    للحصول على أفضل تجربة، نحتاج الوصول إلى الكاميرا لتصوير غرفتك
                </Text>
                <TouchableOpacity
                    onPress={requestPermission}
                    className="bg-primary px-8 py-4 rounded-md"
                >
                    <Text className="text-white font-bold text-lg" style={{ fontFamily: 'Cairo_700Bold' }}>
                        السماح بالوصول
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/(tabs)/home');
        }
    };

    const handleCapture = async () => {
        if (cameraRef.current) {
            try {
                // Show flash animation
                setShowFlash(true);
                setTimeout(() => setShowFlash(false), 200);

                const photo = await cameraRef.current.takePictureAsync({
                    quality: 0.8,
                });
                // Save to MMKV storage (AI Session)
                saveAISession({ originalPhotoUri: photo.uri });
                // Navigate directly to results
                router.push('/ai-design/results');
            } catch (error) {
                Alert.alert('خطأ', 'فشل التقاط الصورة');
            }
        }
    };

    const handleGalleryPick = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: false,
                quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
                // Save to MMKV storage (AI Session)
                saveAISession({ originalPhotoUri: result.assets[0].uri });
                router.push('/ai-design/results');
            }
        } catch (error) {
            Alert.alert('خطأ', 'فشل اختيار الصورة');
        }
    };

    const toggleFlash = () => {
        setFlashMode(current => {
            let next: 'off' | 'auto' | 'torch';
            if (current === 'off') next = 'auto';
            else if (current === 'auto') next = 'torch';
            else next = 'off';

            saveFlashMode(next);
            return next;
        });
    };

    const getFlashIconName = () => {
        switch (flashMode) {
            case 'auto': return 'flash-auto';
            case 'torch': return 'flash-on';
            case 'off': return 'flash-off';
            default: return 'flash-off';
        }
    };

    return (
        <View className="flex-1 bg-black">
            <StatusBar barStyle="light-content" />

            {/* Camera View - Background Layer */}
            <CameraView
                ref={cameraRef}
                style={{ flex: 1 }}
                facing={facing}
                flash={flashMode === 'auto' ? 'auto' : 'off'}
                enableTorch={flashMode === 'torch' && isFocused}
            />

            {/* UI Overlay Layer - Rendered *after* CameraView */}

            {/* Top Bar */}
            <View className="absolute top-12 left-0 right-0 px-4 flex-row justify-between items-center z-10">
                <TouchableOpacity
                    onPress={handleBack}
                    className="w-10 h-10 rounded-full bg-black/40 items-center justify-center"
                >
                    <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-white text-lg font-bold" style={{ fontFamily: 'Cairo_700Bold' }}>
                    صوّر غرفتك
                </Text>
                <TouchableOpacity
                    className="w-10 h-10 rounded-full bg-black/40 items-center justify-center"
                >
                    <Ionicons name="help-circle-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Instructions Overlay */}
            <View className="absolute bottom-40 left-0 right-0 items-center z-10">
                <View className="bg-black/50 px-6 py-3 rounded-full">
                    <Text className="text-white text-sm text-center" style={{ fontFamily: 'Cairo_500Medium' }}>
                        {flashMode === 'auto' ? 'الفلاش: تلقائي' : flashMode === 'torch' ? 'الفلاش: تشغيل' : 'الفلاش: إيقاف'}
                    </Text>
                </View>
            </View>

            {/* Bottom Controls */}
            <View className="absolute bottom-0 left-0 right-0 pb-10 pt-8 bg-gradient-to-t from-black/80 to-transparent z-10">
                <View className="flex-row justify-around items-center px-8">
                    <TouchableOpacity
                        onPress={handleGalleryPick}
                        className="w-14 h-14 rounded-full bg-black/40 items-center justify-center border border-white/20"
                    >
                        <Ionicons name="images-outline" size={28} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleCapture}
                        className="w-20 h-20 rounded-full border-4 border-white items-center justify-center"
                        activeOpacity={0.7}
                    >
                        <View className="w-16 h-16 rounded-full bg-white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={toggleFlash}
                        className="w-14 h-14 rounded-full items-center justify-center border-2"
                        style={{
                            backgroundColor: flashMode === 'torch' ? COLORS.primary : 'rgba(0,0,0,0.4)',
                            borderColor: flashMode === 'torch' ? COLORS.primary : flashMode === 'auto' ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)',
                        }}
                    >
                        <MaterialIcons
                            name={getFlashIconName() as any}
                            size={24}
                            color={flashMode === 'torch' ? '#fff' : 'white'}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Flash Overlay */}
            {showFlash && (
                <View className="absolute inset-0 bg-white" style={{ zIndex: 9999 }} />
            )}
        </View>
    );
};

export default CameraCaptureScreen;
