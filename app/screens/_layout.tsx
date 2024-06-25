import useAuth from "@/hooks/auth/useAuth";
import { Redirect, Stack } from "expo-router";
import "react-native-reanimated";

export default function ScreensLayout() {
  const { token } = useAuth();

  if (!token) {
    return <Redirect href={`/signIn`} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="courseDetails/[courseId]" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
