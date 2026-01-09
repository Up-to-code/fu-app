import { Tabs } from 'expo-router';
import { CategoryIcon, HeartIcon, HomeIcon, UserIcon } from '../../src/components/icons/CustomIcons';
import { COLORS } from '../../src/constants/theme';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.textLight,
                tabBarStyle: {
                    borderTopWidth: 1,
                    borderTopColor: COLORS.border,
                    height: 80,
                    paddingBottom: 20,
                    paddingTop: 10,
                },
                tabBarLabelStyle: {
                    fontFamily: 'Cairo_700Bold',
                    fontSize: 10,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'الرئيسة',
                    tabBarIcon: ({ color, size, focused }) => (
                        <HomeIcon size={size} color={color} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="categories"
                options={{
                    title: 'التصنيفات',
                    tabBarIcon: ({ color, size, focused }) => (
                        <CategoryIcon size={size} color={color} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    title: 'المفضلة',
                    tabBarIcon: ({ color, size, focused }) => (
                        <HeartIcon size={size} color={color} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    title: 'حسابي',
                    tabBarIcon: ({ color, size, focused }) => (
                        <UserIcon size={size} color={color} focused={focused} />
                    ),
                }}
            />
        </Tabs>
    );
}
