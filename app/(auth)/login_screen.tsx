import { View, StyleSheet, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { colors, fonts, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/style";
import BackButton from "@/components/BackButton";
import Typography from "@/components/Typography";
import ScreenWrapper from "@/components/ScreenWrapper";
import CustomInput from "@/components/CustomInput";
import * as Icons from "phosphor-react-native";
import { CustomButton } from "@/components/CustomButton";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/authContext";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert("Login", "Please fill all the fields");
    }

    setIsLoading(true);
    const res = await login(email, password);
    setIsLoading(false);

    if (!res.success) {
      Alert.alert("Login", res.msg);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton />

        <View style={styles.welcomeContainer}>
          <Typography style={styles.welcomeText} color={colors.neutral900}>
            Hey,
          </Typography>
          <Typography style={styles.welcomeText} color={colors.primary}>
            Welcome back!
          </Typography>
        </View>

        <View style={styles.form}>
          <Typography size={16} color={colors.neutral700}>
            Log in to explore free manhwa now!
          </Typography>
          <CustomInput
            autoCapitalize="none"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            icon={
              <Icons.At
                size={verticalScale(26)}
                color={colors.neutral500}
                weight="fill"
              />
            }
          />
          <CustomInput
            autoCapitalize="none"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            icon={
              <Icons.Lock
                size={verticalScale(26)}
                color={colors.neutral500}
                weight="fill"
              />
            }
          />

          <CustomButton loading={isLoading} onPress={handleLogin}>
            <Typography
              fontFamily={fonts.PoppinsSemiBold}
              color={colors.neutral900}
              size={17}
            >
              Login
            </Typography>
          </CustomButton>
        </View>

        <View style={styles.footer}>
          <Typography size={15} color={colors.neutral900}>
            Don't have an account?
          </Typography>
          <Pressable onPress={() => router.push("/register_screen")}>
            <Typography
              size={15}
              fontFamily={fonts.PoppinsSemiBold}
              color={colors.primary}
            >
              Register
            </Typography>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
    gap: spacingY._30,
  },
  welcomeContainer: {
    gap: 5,
    marginTop: spacingY._20,
  },
  welcomeText: {
    fontSize: 30,
    fontFamily: fonts.PoppinsBold,
  },
  form: {
    gap: spacingY._20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
