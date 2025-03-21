import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import Typography from "./Typography";
import { colors, fonts } from "@/constants/theme";
import { ManhwaOngoingProps } from "@/utils/types";
import { Link } from "expo-router";
import { verticalScale } from "@/utils/style";
import { getManhwaId } from "@/utils/common";

const ManhwaCard = ({ item }: { item: ManhwaOngoingProps }) => {
  return (
    <Link href={`/manhwa/${getManhwaId(item.link)}`} asChild>
      <TouchableOpacity style={styles.card}>
        <Image
          source={{
            uri: item.imageUrl
              ? item.imageUrl
              : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
          }}
          style={styles.image}
          contentFit={"cover"}
        />

        <View
          style={{
            gap: 5,
            marginTop: 10,
          }}
        >
          <Typography
            size={verticalScale(14)}
            fontFamily={fonts.PoppinsBold}
            textProps={{
              numberOfLines: 1,
              ellipsizeMode: "tail",
            }}
          >
            {item.title}
          </Typography>

          <View style={styles.infoContainer}>
            <Typography
              size={verticalScale(12)}
              fontFamily={fonts.PoppinsSemiBold}
            >
              {item.latestChapter}
            </Typography>
          </View>

          <View style={styles.ratingContainer}>
            <Typography
              size={verticalScale(12)}
              color={colors.blue}
              fontFamily={fonts.PoppinsSemiBold}
            >
              ⭐ {item.rating}
            </Typography>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default ManhwaCard;

const styles = StyleSheet.create({
  card: {
    width: "30%",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 208, // 52 * 4 to match h-52
    borderRadius: 8,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
