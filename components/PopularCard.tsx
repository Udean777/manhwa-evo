import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import Typography from "./Typography";
import { fonts } from "@/constants/theme";
import { ManhwaProps } from "@/utils/types";
import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";

const PopularCard = ({
  item: { title, link, imageSrc },
  index,
}: {
  item: ManhwaProps;
  index: number;
}) => {
  const getManhwaId = (link: string) => {
    const linkParts = link.split("/");
    const mangaIndex = linkParts.indexOf("manga");

    return mangaIndex !== -1 && mangaIndex + 1 < linkParts.length
      ? linkParts[mangaIndex + 1]
      : null;
  };

  const manhwaId = getManhwaId(link);

  //   console.log(manhwaId);

  return (
    <Link href={`/manhwa/${manhwaId}`} asChild>
      <TouchableOpacity style={styles.card}>
        <Image
          source={{ uri: imageSrc }}
          style={styles.image}
          contentFit="cover"
        />

        <View style={styles.rankingContainer}>
          <MaskedView
            style={styles.maskedView}
            maskElement={<Text style={styles.rankingText}>{index + 1}</Text>}
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
