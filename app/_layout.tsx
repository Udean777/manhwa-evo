import { fonts } from "@/constants/theme";
import { AuthProvider } from "@/context/authContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    [fonts.Poppins]: require("@/assets/fonts/Poppins-Regular.ttf"),
    [fonts.PoppinsMedium]: require("@/assets/fonts/Poppins-Medium.ttf"),
    [fonts.PoppinsSemiBold]: require("@/assets/fonts/Poppins-SemiBold.ttf"),
    [fonts.PoppinsBold]: require("@/assets/fonts/Poppins-Bold.ttf"),
    [fonts.PoppinsExtraBold]: require("@/assets/fonts/Poppins-ExtraBold.ttf"),
    [fonts.PoppinsBlack]: require("@/assets/fonts/Poppins-Black.ttf"),
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
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
