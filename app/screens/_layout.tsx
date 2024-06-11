import { Stack } from "expo-router";
import "react-native-reanimated";

export default function ScreensLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="coursedetails/[courseSlug]" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
