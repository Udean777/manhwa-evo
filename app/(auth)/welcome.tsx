import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { colors, fonts, spacingX, spacingY } from "@/constants/theme";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { verticalScale } from "@/utils/style";
import Typography from "@/components/Typography";
import { useRouter } from "expo-router";
import { CustomButton } from "@/components/CustomButton";

const Page = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View>
        <Animated.Image
          entering={FadeIn.duration(1000)}
          source={require("@/assets/images/welcome.png")}
          style={styles.welcomeImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.footer}>
        <Animated.View
          entering={FadeInDown.duration(1000)
            .delay(100)
            .springify()
            .damping(12)}
          style={{ alignItems: "center", gap: 2 }}
        >
          <Typography
            size={30}
            fontFamily={fonts.PoppinsBold}
            color={colors.neutral900}
          >
            Read comics
          </Typography>
          <Typography
            size={30}
            fontFamily={fonts.PoppinsBold}
          >
            Everywhere.
          </Typography>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(1000)
            .delay(100)
            .springify()
            .damping(12)}
          style={{ alignItems: "center", gap: 2 }}
        >
          <Typography
            size={17}
            color={colors.neutral600}
            fontFamily={fonts.PoppinsMedium}
          >
            Read comics anywhere,
          </Typography>
          <Typography
            size={17}
            color={colors.neutral600}
            fontFamily={fonts.PoppinsMedium}
          >
            anytime with anyone.
          </Typography>
        </Animated.View>

        <Animated.View
          style={styles.buttonContainer}
          entering={FadeInDown.duration(1000)
            .delay(200)
            .springify()
            .damping(12)}
        >
          <CustomButton onPress={() => router.push("/(auth)/auth_screen")}>
            <Typography
              size={17}
              color={colors.black}
              fontFamily={fonts.PoppinsSemiBold}
            >
              Get Started
            </Typography>
          </CustomButton>
        </Animated.View>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: spacingY._7,
    backgroundColor: colors.white,
  },
  welcomeImage: {
    width: "100%",
    height: verticalScale(280),
    alignSelf: "center",
    marginTop: verticalScale(80),
  },
  footer: {
    backgroundColor: colors.neutral100,
    alignItems: "center",
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(45),
    gap: spacingY._20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -5 },
    elevation: 5,
    shadowRadius: 20,
    shadowOpacity: 0.1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: spacingX._25,
  },
});
