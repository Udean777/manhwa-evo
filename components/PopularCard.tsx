import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import Typography from "./Typography";
import { fonts } from "@/constants/theme";
import { ManhwaProps } from "@/utils/types";
import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { getManhwaId } from "@/utils/common";

const PopularCard = ({ item: { rank, title, url, image } }: { item: any }) => {
  //   console.log(manhwaId);

  return (
    <Link href={`/manhwa/${getManhwaId(url)}`} asChild>
      <TouchableOpacity style={styles.card}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          contentFit="cover"
        />

        <View style={styles.rankingContainer}>
          <MaskedView
            style={styles.maskedView}
            maskElement={<Text style={styles.rankingText}>{rank}</Text>}
          >
            <Image
              source={require("@/assets/images/rankingGradient.png")}
              style={styles.rankingImage}
              contentFit="cover"
            />
          </MaskedView>
        </View>

        <Typography
          textProps={{
            numberOfLines: 1,
            ellipsizeMode: "tail",
          }}
          style={styles.title}
        >
          {title}
        </Typography>
      </TouchableOpacity>
    </Link>
  );
};

export default PopularCard;

const styles = StyleSheet.create({
  card: {
    width: 128,
    paddingLeft: 20,
    position: "relative",
  },
  image: {
    width: 128,
    height: 192,
    borderRadius: 8,
  },
  rankingContainer: {
    position: "absolute",
    bottom: 36,
    left: -14,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999, // Mirip `rounded-full` di NativeWind
  },
  maskedView: {
    flex: 1,
  },
  rankingText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
  },
  rankingImage: {
    width: 56,
    height: 56,
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.PoppinsBold,
    marginTop: 8,
  },
});
