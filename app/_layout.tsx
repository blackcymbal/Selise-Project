import AuthProvider from "@/hooks/auth/authContext";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "AnekBangla-Regular": require("../assets/fonts/AnekBangla-Regular.ttf"),
    "AnekBangla-Medium": require("../assets/fonts/AnekBangla-Medium.ttf"),
    "AnekBangla-SemiBold": require("../assets/fonts/AnekBangla-SemiBold.ttf"),
    "AnekBangla-Bold": require("../assets/fonts/AnekBangla-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="signin" />
            <Stack.Screen name="otpScreen" />
            <Stack.Screen name="createProfileScreen" />
          </Stack>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
