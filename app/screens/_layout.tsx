import { Stack } from "expo-router";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function ScreensLayout() {
  // const [loaded] = useFonts({
  //   "AnekBangla-Regular": require("../assets/fonts/AnekBangla-Regular.ttf"),
  //   "AnekBangla-Medium": require("../assets/fonts/AnekBangla-Medium.ttf"),
  //   "AnekBangla-SemiBold": require("../assets/fonts/AnekBangla-SemiBold.ttf"),
  //   "AnekBangla-Bold": require("../assets/fonts/AnekBangla-Bold.ttf"),
  // });

  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded]);

  // if (!loaded) {
  //   return null;
  // }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
