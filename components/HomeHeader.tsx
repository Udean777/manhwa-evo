import React from "react";
import { View, TextInput, Pressable, StyleSheet } from "react-native";
import * as Icons from "phosphor-react-native";
import { useAuth } from "@/context/authContext";
import { Image } from "expo-image";
import { getProfileImage } from "@/services/imageService";
import { Link } from "expo-router";
import { getGreeting } from "@/utils/common";
import { colors, fonts, radius } from "@/constants/theme";
import { scale } from "@/utils/style";
import Typography from "./Typography";

const HomeHeader = () => {
  const { user } = useAuth();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTop}>
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <Image
              source={getProfileImage(user?.image)}
              contentFit="cover"
              transition={500}
              style={styles.avatar}
            />
          </View>
          <View style={styles.textContainer}>
            <Typography style={styles.subtitle}>{getGreeting()}</Typography>
            <Typography style={styles.username}>{user?.username}</Typography>
          </View>
        </View>

        <Pressable style={styles.iconButton}>
          <Icons.Moon weight="fill" size={24} color="#333" />
        </Pressable>
      </View>

      <View style={styles.searchBarContainer}>
        <View style={styles.searchBarShadow} />
        <Link href={"/search_results"} asChild>
          <Pressable style={styles.searchBar}>
            <Icons.MagnifyingGlass size={20} color="#666" />
            <TextInput
              placeholder="Cari..."
              style={styles.searchInput}
              placeholderTextColor="#999"
              editable={false}
            />
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerContainer: {
    // paddingHorizontal: 16,
    // paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: "#fff",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  textContainer: {
    marginLeft: 12,
  },
  subtitle: {
    fontSize: 12,
    color: "#888",
  },
  username: {
    fontSize: 18,
    fontFamily: fonts.PoppinsBold,
  },
  iconButton: {
    padding: 8,
  },
  searchBarContainer: {
    position: "relative",
    marginTop: 16,
  },
  searchBarShadow: {
    position: "absolute",
    top: scale(8),
    left: scale(8),
    right: scale(-4),
    bottom: scale(-4),
    backgroundColor: colors.black,
    borderRadius: 12,
    zIndex: 1,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: radius._10,
    position: "relative",
    zIndex: 2,
    borderWidth: scale(2),
    borderColor: "#1a1a1a",
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  clearButton: {
    padding: 4,
    marginRight: 8,
  },
});
