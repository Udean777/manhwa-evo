import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import Typography from "./Typography";
import { fonts } from "@/constants/theme";
import { ManhwaProps } from "@/utils/types";

const ManhwaCard = ({
  item,
  handleManhwaPress,
}: {
  item: ManhwaProps;
  handleManhwaPress: (item: ManhwaProps) => void;
}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleManhwaPress(item)}
      >
        <Image source={{ uri: item.imageSrc }} style={styles.image} />
        <View style={styles.textContainer}>
          <Typography
            style={styles.title}
            textProps={{
              numberOfLines: 1,
              ellipsizeMode: "tail",
            }}
          >
            {item.title}
          </Typography>
          <Typography style={styles.chapter}>{item.chapter}</Typography>
          <Typography style={styles.rating}>⭐ {item.rating}</Typography>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ManhwaCard;

const styles = StyleSheet.create({
  card: {
    width: 140,
    marginRight: 12,
    backgroundColor: "#f8f8f8",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 160,
    borderRadius: 6,
  },
  textContainer: {
    width: "100%",
    marginTop: 8,
    // alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.PoppinsBold,
    // textAlign: "center",
    color: "#333",
    maxWidth: 120,
    lineHeight: 18,
    // height: 36,
    overflow: "hidden",
  },
  chapter: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  rating: {
    fontSize: 12,
    fontFamily: fonts.PoppinsSemiBold,
    color: "#0286FF",
    marginTop: 2,
  },
});
