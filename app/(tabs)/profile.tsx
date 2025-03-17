import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { accountOptionType } from "@/utils/types";
import * as Icons from "phosphor-react-native";
import { colors, fonts, radius, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/context/authContext";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import { verticalScale } from "@/utils/style";
import Header from "@/components/Header";
import { Image } from "expo-image";
import { getProfileImage } from "@/services/imageService";
import Typography from "@/components/Typography";
import Animated, { FadeInDown } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const accountOptions: accountOptionType[] = [
  {
    title: "Edit Profil",
    icon: <Icons.User size={26} color={"#6366f1"} weight="regular" />,
    routeName: "/(modals)/profile_modal",
    bgColor: "#6366f1",
  },
  {
    title: "Tema",
    icon: <Icons.Moon size={26} color={"#059669"} weight="regular" />,
    // routeName: "/(modals)/profileModal",
    bgColor: "#059669",
  },
  {
    title: "Kebijakan & Privasi",
    icon: <Icons.Lock size={26} color={colors.neutral600} weight="regular" />,
    // routeName: "/(modals)/profileModal",
    bgColor: colors.neutral600,
  },
  {
    title: "Keluar",
    icon: <Icons.Power size={26} color={"#e11d48"} weight="regular" />,
    // routeName: "/(modals)/profileModal",
    bgColor: "#e11d48",
  },
];

const Page = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handlePress = async (item: accountOptionType) => {
    if (item.title === "Keluar") {
      Alert.alert("Confirm", "Are you sure want to logout?", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel logout"),
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => await signOut(auth),
          style: "destructive",
        },
      ]);
    }
    if (item.routeName) router.push(item.routeName);
  };

  return (
    <ScreenWrapper>
      <LinearGradient
        colors={[colors.primary, colors.primaryLight]}
        style={styles.container}
      >
        <Header title="Profile" />

        <View style={styles.userInfo}>
          <View style={styles.avatarWrapper}>
            <Image
              style={styles.avatar}
              source={getProfileImage(user?.image)}
            />
          </View>

          <View style={styles.nameContainer}>
            <Typography
              size={22}
              fontFamily={fonts.PoppinsBold}
              color={colors.neutral800}
            >
              {user?.username}
            </Typography>
            <Typography
              size={16}
              fontFamily={fonts.Poppins}
              color={colors.neutral700}
            >
              {user?.email}
            </Typography>
          </View>
        </View>

        <View style={styles.accountOptions}>
          {accountOptions.map((item, index) => (
            <Animated.View
              key={item.title}
              style={styles.listItem}
              entering={FadeInDown.delay(index * 50)
                .springify()
                .damping(14)}
            >
              <TouchableOpacity
                style={styles.flexRow}
                onPress={() => handlePress(item)}
              >
                <View
                  style={[
                    styles.listIcon,
                    { backgroundColor: item.bgColor + "20" },
                  ]}
                >
                  {item.icon}
                </View>
                <Typography
                  size={16}
                  style={{ flex: 1 }}
                  fontFamily={fonts.PoppinsSemiBold}
                  color={colors.neutral900}
                >
                  {item.title}
                </Typography>
                <Icons.CaretRight
                  size={20}
                  weight="bold"
                  color={colors.neutral900}
                />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </LinearGradient>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfo: {
    marginTop: 30,
    alignItems: "center",
    gap: 15,
  },
  avatarWrapper: {
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 100,
    padding: 5,
    shadowColor: colors.black,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  avatar: {
    height: 135,
    width: 135,
    borderRadius: 100,
  },
  nameContainer: {
    gap: 4,
    alignItems: "center",
  },
  accountOptions: {
    marginTop: 35,
    backgroundColor: colors.neutral100,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    flex: 1,
    padding: 20,
  },
  listItem: {
    marginBottom: 17,
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 12,
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  listIcon: {
    height: 44,
    width: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
});

export default Page;
