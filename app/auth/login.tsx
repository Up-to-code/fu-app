// Minimal Centered Login Screen with Polished Transitions
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, KeyboardAvoidingView, LayoutAnimation, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionButton, PolishedOTPInput } from '../../src/components/shared';
import { COLORS } from '../../src/constants/theme';
import { useAuth } from '../../src/hooks/useAuth';

const { width } = Dimensions.get('window');

type Step = 'options' | 'email-form' | 'otp';

export default function LoginScreen() {
    // const router = useRouter(); // Removed hook
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<Step>('options');

    // Login Data
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // OTP Data
    const [otpCode, setOtpCode] = useState('');
    const [timer, setTimer] = useState(30);

    // Transitions
    const changeStep = (newStep: Step) => {
        // System-like smooth transition with subtle expansion
        LayoutAnimation.configureNext({
            duration: 400,
            create: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.scaleXY },
            update: { type: LayoutAnimation.Types.easeInEaseOut },
            delete: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
        });
        setStep(newStep);
    };

    // OTP Logic
    useEffect(() => {
        if (step === 'otp' && timer > 0) {
            const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [step, timer]);

    const handleLogin = async () => {
        if (!email || !password) return;
        setLoading(true);
        try {
            await login(email, password); // Mock login
            changeStep('otp'); // Go to OTP step
            setTimer(30);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async () => {
        if (otpCode.length < 4) return;
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); // Mock API
            router.replace('/(tabs)/home');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Header Content Helper
    const getHeaderContent = () => {
        switch (step) {
            case 'otp': return { icon: 'shield', title: 'تأكيد الرمز', subtitle: 'أدخل الرمز المرسل لبريدك' };
            case 'email-form': return { icon: 'user', title: 'تسجيل الدخول', subtitle: 'أهلاً بك مجدداً' };
            default: return { icon: 'box', title: 'مرحباً', subtitle: 'سجل الدخول للمتابعة' };
        }
    };

    const header = getHeaderContent();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}
                    className="flex-1"
                >
                    <View style={{ width: '100%', maxWidth: 400, alignItems: 'center' }}>

                        {/* Stable Header Container */}
                        <View className="items-center mb-12 h-40 justify-end">
                            <View className="w-20 h-20 bg-primary/10 rounded-3xl items-center justify-center mb-6 shadow-sm rotate-3 transform-gpu">
                                <Feather name={header.icon as any} size={32} color={COLORS.primary} />
                            </View>

                            <Text className="font-cairo-bold text-slate-800 text-2xl mb-2 text-center">
                                {header.title}
                            </Text>
                            <Text className="font-cairo-medium text-slate-400 text-base text-center">
                                {header.subtitle}
                            </Text>
                        </View>

                        {/* Content */}
                        <View className="w-full gap-4">
                            {step === 'options' && (
                                // Step 1: Options
                                <View className="w-full gap-3">
                                    <TouchableOpacity
                                        onPress={() => changeStep('email-form')}
                                        className="bg-primary w-full py-4 rounded-2xl flex-row items-center justify-center gap-3"
                                    >
                                        <Feather name="mail" size={20} color="white" />
                                        <Text className="text-white font-cairo-bold text-base">تسجيل الدخول بالبريد</Text>
                                    </TouchableOpacity>

                                    {Platform.OS === 'ios' && (
                                        <TouchableOpacity className="bg-black w-full py-4 rounded-2xl flex-row items-center justify-center gap-2">
                                            <Feather name="anchor" size={20} color="white" />
                                            <Text className="text-white font-cairo-bold text-base">Apple</Text>
                                        </TouchableOpacity>
                                    )}

                                    <TouchableOpacity className="bg-white border border-slate-200 w-full py-4 rounded-2xl flex-row items-center justify-center gap-2">
                                        <Feather name="globe" size={20} color={COLORS.text} />
                                        <Text className="text-slate-700 font-cairo-bold text-base">Google</Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                            {step === 'email-form' && (
                                // Step 2: Email Form
                                <View className="w-full">
                                    <TouchableOpacity
                                        onPress={() => changeStep('options')}
                                        className="flex-row-reverse items-center justify-center mb-8 bg-slate-50 py-2 px-4 rounded-full self-center"
                                    >
                                        <Feather name="arrow-right" size={16} color={COLORS.text} />
                                        <Text className="font-cairo-bold text-slate-600 ml-2 text-sm">خيارات أخرى</Text>
                                    </TouchableOpacity>

                                    <View className="gap-4 mb-6">
                                        <TextInput
                                            className="bg-slate-50 rounded-2xl px-6 py-4 text-right font-cairo-medium text-slate-800 border border-slate-100 w-full"
                                            placeholder="البريد الإلكتروني"
                                            placeholderTextColor="#94a3b8"
                                            value={email}
                                            onChangeText={setEmail}
                                            autoCapitalize="none"
                                            keyboardType="email-address"
                                            autoFocus
                                            textAlign="center"
                                        />
                                        <View className="relative w-full">
                                            <TextInput
                                                className="bg-slate-50 rounded-2xl px-6 py-4 text-right font-cairo-medium text-slate-800 border border-slate-100 w-full"
                                                placeholder="كلمة المرور"
                                                placeholderTextColor="#94a3b8"
                                                value={password}
                                                onChangeText={setPassword}
                                                secureTextEntry={!showPassword}
                                                textAlign="center"
                                            />
                                            <TouchableOpacity
                                                onPress={() => setShowPassword(!showPassword)}
                                                className="absolute left-6 top-4"
                                            >
                                                <Feather name={showPassword ? 'eye-off' : 'eye'} size={20} color="#94a3b8" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <ActionButton
                                        label={loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
                                        onPress={handleLogin}
                                        disabled={loading}
                                    />
                                </View>
                            )}

                            {step === 'otp' && (
                                // Step 3: OTP Input
                                <View className="w-full">
                                    {/* Change Email button removed per user request */}

                                    <View className="mb-6 w-full items-center">
                                        <PolishedOTPInput
                                            code={otpCode}
                                            onChange={setOtpCode}
                                            length={4}
                                            disabled={loading}
                                        />
                                    </View>

                                    <ActionButton
                                        label={loading ? 'جاري التحقق...' : 'تأكيد الرمز'}
                                        onPress={handleVerify}
                                        disabled={loading || otpCode.length < 4}
                                    />

                                    <View className="flex-row items-center justify-center gap-2 mt-6">
                                        <Text className="font-cairo-medium text-slate-400 text-sm">لم يصلك الرمز؟</Text>
                                        {timer > 0 ? (
                                            <Text className="font-cairo-bold text-slate-600 text-sm">{timer} ثانية</Text>
                                        ) : (
                                            <TouchableOpacity onPress={() => setTimer(30)}>
                                                <Text className="font-cairo-bold text-primary text-sm">إعادة الإرسال</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>
                            )}
                        </View>

                        {/* Footer Links (Only show when not in OTP) */}
                        {step !== 'otp' && (
                            <View className="mt-12">
                                <TouchableOpacity onPress={() => router.push('/auth/register')} className="py-2">
                                    <Text className="text-slate-500 font-cairo-medium">حساب جديد</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
