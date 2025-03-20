import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { colors, fonts } from "@/constants/theme";
import { useAuth } from "@/context/authContext";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import { Image } from "expo-image";
import { getProfileImage } from "@/services/imageService";
import Typography from "@/components/Typography";
import Animated, { FadeInDown } from "react-native-reanimated";
import { accountOptionType } from "@/utils/types";
import * as Icons from "phosphor-react-native";

const accountOptions = [
  {
    title: "Edit Profil",
    icon: <Icons.User size={24} color="#4A97F0" weight="regular" />,
    routeName: "/(modals)/profile_modal",
    bgColor: "#E6F2FF",
  },
  {
    title: "Tema",
    icon: <Icons.Moon size={24} color="#4ACB83" weight="regular" />,
    routeName: "/(tabs)/orders",
    bgColor: "#E6F9F0",
  },
  {
    title: "Kebijakan & Privasi",
    icon: <Icons.Lock size={26} color={colors.neutral600} weight="regular" />,
    // routeName: "/(modals)/profileModal",
    bgColor: colors.neutral200,
  },
  {
    title: "Keluar",
    icon: <Icons.Power size={26} color={"#e11d48"} weight="regular" />,
    // routeName: "/(modals)/profileModal",
    bgColor: "#ffc4b7",
  },
];

const Page = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handlePress = async (item: accountOptionType) => {
    if (item.title === "Keluar") {
      Alert.alert("Konfirmasi", "Apakah Anda yakin ingin keluar?", [
        {
          text: "Batal",
          onPress: () => console.log("Cancel logout"),
          style: "cancel",
        },
        {
          text: "Keluar",
          onPress: async () => await signOut(auth),
          style: "destructive",
        },
      ]);
    }
    if (item.routeName) router.push(item.routeName);
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <Typography
            size={28}
            fontFamily={fonts.PoppinsBold}
            color={colors.white}
          >
            Profile
          </Typography>

          <TouchableOpacity style={styles.moreButton}>
            <Icons.DotsThreeVertical
              size={24}
              color={colors.white}
              weight="bold"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View style={[styles.backgroundShape, styles.shape1]} />
          <View style={[styles.backgroundShape, styles.shape2]} />
          <View style={[styles.backgroundShape, styles.shape3]} />
          <View style={[styles.backgroundShape, styles.shape4]} />
          <View style={[styles.backgroundShape, styles.shape5]} />

          <View style={styles.profileImageContainer}>
            <Image
              style={styles.profileImage}
              source={getProfileImage(user?.image)}
              placeholder="https://via.placeholder.com/100"
              transition={300}
            />
          </View>

          <View style={styles.userInfo}>
            <Typography
              size={24}
              fontFamily={fonts.PoppinsBold}
              color={colors.white}
            >
              {user?.username}
            </Typography>
            <Typography
              size={16}
              fontFamily={fonts.Poppins}
              color={colors.white}
              style={styles.phoneNumber}
            >
              {user?.email}
            </Typography>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.accountContainer}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
        >
          <View style={styles.menuContainer}>
            {accountOptions.map((item, index) => (
              <Animated.View
                key={item.title}
                entering={FadeInDown.delay(index * 50)
                  .springify()
                  .damping(12)}
              >
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handlePress(item)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: item.bgColor },
                    ]}
                  >
                    {item.icon}
                  </View>

                  <View style={styles.menuTitleContainer}>
                    <Typography
                      size={16}
                      fontFamily={fonts.PoppinsSemiBold}
                      color={colors.neutral900}
                    >
                      {item.title}
                    </Typography>
                  </View>

                  <Icons.CaretRight size={20} color={colors.neutral400} />
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  profileSection: {
    paddingVertical: 20,
    alignItems: "center",
    position: "relative",
    height: 220,
    marginBottom: 30,
  },
  backgroundShape: {
    position: "absolute",
    backgroundColor: colors.neutral100 + "50",
    borderRadius: 100,
  },
  shape1: {
    width: 100,
    height: 100,
    top: 10,
    left: 10,
    borderTopLeftRadius: 0,
  },
  shape2: {
    width: 70,
    height: 70,
    top: 30,
    right: 30,
    borderRadius: 20,
  },
  shape3: {
    width: 120,
    height: 120,
    bottom: 0,
    left: 20,
    borderBottomLeftRadius: 0,
  },
  shape4: {
    width: 60,
    height: 60,
    bottom: 40,
    right: 40,
    borderRadius: 10,
  },
  shape5: {
    width: 80,
    height: 80,
    top: 100,
    left: 180,
    borderRadius: 30,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.green,
  },
  userInfo: {
    alignItems: "center",
  },
  phoneNumber: {
    marginTop: 5,
    opacity: 0.9,
  },
  accountContainer: {
    flex: 1,
    backgroundColor: colors.neutral50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  accountTitle: {
    marginBottom: 20,
  },
  menuContainer: {
    gap: 15,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  menuTitleContainer: {
    flex: 1,
  },
});

export default Page;
