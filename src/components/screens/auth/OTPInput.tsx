// File: src/components/screens/auth/OTPInput.tsx
// Purpose: Arabic 6-digit OTP input fields
// Dependencies: React, React Native, NativeWind, components/ui/Input

import React, { useRef, useState } from 'react';
import { NativeSyntheticEvent, Text, TextInput, TextInputKeyPressEventData, View } from 'react-native';
import { Button } from '../../ui/Button';

interface OTPInputProps {
    onVerify: (otp: string) => void;
    onResend: () => void;
}

export const OTPInput: React.FC<OTPInputProps> = ({ onVerify, onResend }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputs = useRef<Array<TextInput | null>>([]);

    const handleChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Auto-advance logic remains same
        if (text && index < 5) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    const handleVerify = () => {
        onVerify(otp.join(''));
    };

    return (
        <View className="w-full items-center">
            <Text className="text-2xl font-cairo-bold text-text mb-2 text-center">
                تحقق من الرمز
            </Text>
            <Text className="text-textLight mb-8 text-center font-cairo-medium">
                لقد أرسلنا رمز التحقق إلى بريدك الإلكتروني
            </Text>

            <View className="flex-row justify-center space-x-2 gap-2 mb-8" style={{ direction: 'ltr' }}>
                {/* OTP inputs kept LTR for number entry, common pattern even in RTL */}
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => { inputs.current[index] = ref; }}
                        value={digit}
                        onChangeText={(text) => handleChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        keyboardType="number-pad"
                        maxLength={1}
                        className="w-12 h-14 border border-border rounded-lg text-center text-xl font-bold bg-white text-primary"
                    />
                ))}
            </View>

            <Button title="تأكيد" onPress={handleVerify} fullWidth />

            <View className="mt-6 flex-row justify-center">
                <Text className="text-textLight font-cairo-medium">لم يصلك الرمز؟ </Text>
                <Text onPress={onResend} className="text-primary font-cairo-bold">
                    إعادة إرسال
                </Text>
            </View>
        </View>
    );
};
