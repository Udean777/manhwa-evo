import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Image } from "expo-image";
import Typography from "./Typography";
import { colors, fonts } from "@/constants/theme";
import { Link } from "expo-router";
import { getManhwaId } from "@/utils/common";

const PopularCard = ({ item: { rank, title, url, image } }: { item: any }) => {
  const getRankColor = (rankNumber: number) => {
    const rankNum = Number(rankNumber);

    if (rankNum === 1) return colors.pastelMint;
    if (rankNum === 2) return colors.green;
    if (rankNum === 3) return colors.pastelTeal;
    if (rankNum === 5) return colors.rose;
    return colors.primary;
  };

  return (
    <Link href={`/manhwa/${getManhwaId(url)}`} asChild>
      <Pressable style={styles.card}>
        <View style={styles.imageContainerWrapper}>
          <View style={styles.imageShadow} />
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: image }}
              style={styles.image}
              contentFit="cover"
            />
          </View>
        </View>

        <View style={styles.rankingContainerWrapper}>
          <View style={styles.rankingShadow} />
          <View
            style={[
              styles.rankingContainer,
              { backgroundColor: getRankColor(rank) },
            ]}
          >
            <Typography
              size={25}
              color={colors.neutral900}
              fontFamily={fonts.PoppinsBold}
            >
              {rank}
            </Typography>
          </View>
        </View>

        <Typography
          fontFamily={fonts.PoppinsBold}
          size={14}
          textProps={{
            numberOfLines: 1,
            ellipsizeMode: "tail",
          }}
          style={styles.title}
        >
          {title}
        </Typography>
      </Pressable>
    </Link>
  );
};

export default PopularCard;

const styles = StyleSheet.create({
  card: {
    width: 136,
    paddingLeft: 20,
    position: "relative",
    alignItems: "center",
  },
  imageContainerWrapper: {
    position: "relative",
  },
  imageShadow: {
    position: "absolute",
    top: 8,
    left: 8,
    right: -4,
    bottom: -4,
    backgroundColor: colors.neutral900,
    borderRadius: 8,
    zIndex: 1,
  },
  imageContainer: {
    position: "relative",
    zIndex: 2,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#1a1a1a",
  },
  image: {
    width: 128,
    height: 192,
    borderRadius: 8,
  },
  rankingContainerWrapper: {
    position: "absolute",
    bottom: 36,
    left: -5,
    zIndex: 3,
  },
  rankingShadow: {
    position: "absolute",
    top: 4,
    left: 4,
    width: 42,
    height: 42,
    borderRadius: 9999,
    backgroundColor: colors.neutral900,
    zIndex: 1,
  },
  rankingContainer: {
    position: "relative",
    zIndex: 2,
    width: 45,
    height: 45,
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#1a1a1a",
  },
  title: {
    marginTop: 8,
    width: 120,
  },
});
