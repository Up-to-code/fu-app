import { Cairo_400Regular, Cairo_500Medium, Cairo_700Bold, useFonts } from "@expo-google-fonts/cairo";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { I18nManager } from "react-native";
import { AuthProvider } from "../src/context/AuthContext";
import "./global.css";

// Enforce RTL
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function RootLayout() {
  const [loaded] = useFonts({
    Cairo_400Regular,
    Cairo_500Medium,
    Cairo_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      // Hide splash screen
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
