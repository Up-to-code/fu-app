import { Text, TextProps } from 'react-native';
import { COLORS } from '../../constants/theme';

interface TypographyProps extends TextProps {
    variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'button';
    color?: string;
    align?: 'left' | 'center' | 'right';
    bold?: boolean;
}

export const Typography: React.FC<TypographyProps> = ({
    children,
    variant = 'body',
    color = COLORS.text,
    align = 'left',
    bold = false,
    style,
    ...props
}) => {
    const getStyle = () => {
        switch (variant) {
            case 'h1':
                return { fontSize: 24, fontFamily: 'Cairo_700Bold', lineHeight: 32 };
            case 'h2':
                return { fontSize: 20, fontFamily: 'Cairo_700Bold', lineHeight: 28 };
            case 'h3':
                return { fontSize: 18, fontFamily: 'Cairo_700Bold', lineHeight: 24 };
            case 'body':
                return { fontSize: 14, fontFamily: bold ? 'Cairo_700Bold' : 'Cairo_500Medium', lineHeight: 22 };
            case 'caption':
                return { fontSize: 12, fontFamily: 'Cairo_500Medium', lineHeight: 18 };
            case 'button':
                return { fontSize: 16, fontFamily: 'Cairo_700Bold', lineHeight: 24 };
            default:
                return {};
        }
    };

    return (
        <Text
            style={[
                getStyle(),
                { color, textAlign: align },
                style,
            ]}
            {...props}
        >
            {children}
        </Text>
    );
};
