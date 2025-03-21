import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React, { useMemo } from "react";
import { Image } from "expo-image";
import Typography from "./Typography";
import { colors, fonts } from "@/constants/theme";
import { Link } from "expo-router";
import { scale, verticalScale } from "@/utils/style";
import { getManhwaId } from "@/utils/common";

const ManhwaCard = ({
  imageUrl,
  title,
  latestChapter,
  rating,
  link,
}: {
  imageUrl: string;
  latestChapter: string;
  title: string;
  rating: string;
  link: string;
}) => {
  const backgroundColors = [
    colors.green,
    colors.pastelLavender,
    colors.rose,
    colors.pastelTeal,
  ];
  const randomColor = useMemo(
    () => backgroundColors[Math.floor(Math.random() * backgroundColors.length)],
    []
  );

  return (
    <View style={styles.cardContainer}>
      <View style={styles.innerShadow} />
      <View style={[styles.card, { backgroundColor: randomColor }]}>
        <Image
          source={{
            uri: imageUrl || "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
          }}
          style={styles.image}
          contentFit={"cover"}
        />

        <View style={styles.contentContainer}>
          <Typography
            size={scale(14)}
            fontFamily={fonts.PoppinsBold}
            textProps={{ numberOfLines: 1, ellipsizeMode: "tail" }}
          >
            {title}
          </Typography>

          <View style={styles.infoContainer}>
            <View style={styles.chapterContainer}>
              <Typography size={scale(12)} fontFamily={fonts.PoppinsSemiBold}>
                {latestChapter}
              </Typography>
            </View>

            <View style={styles.ratingContainer}>
              <Typography
                size={scale(12)}
                color={colors.primary}
                fontFamily={fonts.PoppinsSemiBold}
              >
                ⭐ {rating}
              </Typography>
            </View>
          </View>
        </View>

        <Link href={`/manhwa/${getManhwaId(link)}`} asChild>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.buttonShadow} />
            <View style={styles.buttonContent}>
              <Typography
                size={scale(12)}
                color={colors.neutral900}
                fontFamily={fonts.PoppinsSemiBold}
              >
                Baca Sekarang
              </Typography>
            </View>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default ManhwaCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: "45%",
    marginBottom: verticalScale(20),
    position: "relative",
  },
  innerShadow: {
    position: "absolute",
    top: scale(8),
    left: scale(8),
    right: scale(-4),
    bottom: scale(-4),
    backgroundColor: colors.neutral900,
    borderRadius: scale(10),
    zIndex: 1,
  },
  card: {
    zIndex: 2,
    position: "relative",
    width: "100%",
    borderRadius: scale(10),
    padding: scale(5),
    borderWidth: scale(2),
    borderColor: "#1a1a1a",
  },
  image: {
    width: "100%",
    height: verticalScale(150),
    borderRadius: scale(8),
    borderWidth: scale(2),
    borderColor: "#1a1a1a",
  },
  contentContainer: {
    gap: scale(5),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
  },
  infoContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
  },
  chapterContainer: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(2),
    borderRadius: scale(4),
    borderWidth: scale(1),
    borderColor: "#1a1a1a",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.neutral500,
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(2),
    borderRadius: scale(4),
    borderWidth: scale(1),
    borderColor: "#1a1a1a",
  },
  actionButton: {
    position: "relative",
    width: "100%",
    borderRadius: scale(8),
  },
  buttonShadow: {
    position: "absolute",
    top: scale(4),
    left: scale(4),
    right: scale(-2),
    bottom: scale(-2),
    backgroundColor: colors.neutral900,
    borderRadius: scale(8),
    zIndex: 1,
  },
  buttonContent: {
    position: "relative",
    zIndex: 2,
    backgroundColor: colors.primary,
    paddingVertical: verticalScale(8),
    borderRadius: scale(8),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: scale(2),
    borderColor: "#1a1a1a",
  },
});
