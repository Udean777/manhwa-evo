import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Typography from "./Typography";
import * as Icons from "phosphor-react-native";
import { colors, fonts } from "@/constants/theme";

const ChapterItem = ({ item }: any) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.chapterItem}
      onPress={() => {
        router.push({
          pathname: "/reading_screen",
          params: {
            chapterLink: item.chapterLink,
          },
        });
        // console.log(item.chapterLink);
      }}
    >
      <View style={styles.chapterInfoContainer}>
        <Typography style={styles.chapterTitle}>{item.chapterNum}</Typography>
        <Typography style={styles.chapterDate}>{item.chapterDate}</Typography>
      </View>
      <TouchableOpacity style={styles.downloadButton}>
        <Icons.CaretRight size={20} color={colors.neutral900} weight="bold" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ChapterItem;

const styles = StyleSheet.create({
  chapterItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  chapterInfoContainer: {
    flex: 1,
  },
  chapterTitle: {
    fontSize: 14,
    color: "#333",
    fontFamily: fonts.PoppinsMedium,
  },
  chapterDate: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  downloadButton: {
    padding: 8,
  },
});
