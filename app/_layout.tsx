import { fonts } from "@/constants/theme";
import { AuthProvider } from "@/context/authContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(screens)" />
            <Stack.Screen name={"manhwa/[id]"} />
            <Stack.Screen name={"manhwa/[id]/all_chapters"} />
            <Stack.Screen name={"manhwa/[id]/reading_screen"} />
          </Stack>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
