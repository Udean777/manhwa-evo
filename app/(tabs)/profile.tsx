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
import SectionCard from "@/components/SectionCard";

const accountOptions = [
  {
    title: "Edit Profil",
    icon: <Icons.User size={24} color="#4A97F0" weight="regular" />,
    routeName: "/(modals)/edit_profile",
    bgColor: "#E6F2FF",
  },
  {
    title: "Tema",
    icon: <Icons.Moon size={24} color="#4ACB83" weight="regular" />,
    bgColor: "#E6F9F0",
  },
  {
    title: "Kebijakan & Privasi",
    icon: <Icons.Lock size={24} color={colors.neutral600} weight="regular" />,
    bgColor: colors.neutral200,
  },
  {
    title: "Keluar",
    icon: <Icons.Power size={24} color={"#e11d48"} weight="regular" />,
    bgColor: "#FFE6E9",
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.accountContainer}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <View style={styles.profileHeader}>
          <View style={styles.headerContent}>
            <Typography
              size={24}
              fontFamily={fonts.PoppinsBold}
              color={colors.neutral900}
            >
              Profile
            </Typography>

            <TouchableOpacity style={styles.themeButton}>
              <Icons.Moon size={22} color={colors.neutral900} weight="fill" />
            </TouchableOpacity>
          </View>

          <View style={styles.headerWave}>
            <View style={styles.wave} />
          </View>
        </View>

        <View style={styles.profileCardWrapper}>
          <SectionCard bgColor="#FFFFFF">
            <View style={styles.profileContent}>
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
                  size={22}
                  fontFamily={fonts.PoppinsBold}
                  color={colors.neutral900}
                >
                  {user?.username}
                </Typography>
                <Typography
                  size={15}
                  fontFamily={fonts.Poppins}
                  color={colors.neutral600}
                  style={styles.emailText}
                >
                  {user?.email}
                </Typography>
              </View>
            </View>
          </SectionCard>
        </View>

        <View style={styles.menuContainer}>
          <Typography
            size={18}
            fontFamily={fonts.PoppinsSemiBold}
            color={colors.neutral800}
            style={styles.menuSectionTitle}
          >
            Pengaturan Akun
          </Typography>

          {accountOptions.map((item, index) => (
            <Animated.View
              key={item.title}
              entering={FadeInDown.delay(index * 70)
                .springify()
                .damping(12)}
            >
              <SectionCard bgColor="#FFFFFF">
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
                      color={
                        item.title === "Keluar" ? "#e11d48" : colors.neutral800
                      }
                    >
                      {item.title}
                    </Typography>
                  </View>

                  <Icons.CaretRight
                    size={20}
                    color={
                      item.title === "Keluar" ? "#e11d48" : colors.neutral400
                    }
                  />
                </TouchableOpacity>
              </SectionCard>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  accountContainer: {
    flex: 1,
    backgroundColor: colors.neutral50,
  },
  profileHeader: {
    backgroundColor: colors.pastelGreen,
    paddingTop: 30,
    position: "relative",
    height: 160,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerWave: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    overflow: "hidden",
  },
  wave: {
    position: "absolute",
    bottom: -20,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  themeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    // backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
  },
  profileCardWrapper: {
    marginTop: -60,
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  profileCard: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  profileContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImageContainer: {
    position: "relative",
    marginRight: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  userInfo: {
    flex: 1,
  },
  emailText: {
    marginTop: 3,
  },
  menuContainer: {
    paddingHorizontal: 20,
    gap: 10,
  },
  menuSectionTitle: {
    marginBottom: 15,
    marginLeft: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  menuTitleContainer: {
    flex: 1,
  },
});

export default Page;
