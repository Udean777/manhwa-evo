import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";
import Typography from "./Typography";
import * as Icons from "phosphor-react-native";
import { colors, fonts } from "@/constants/theme";
import { getChapterId } from "@/utils/common";

const ChapterItem = ({ item }: any) => {
  return (
    <Link
      href={`/manhwa/${getChapterId(item.chapterLink)}/reading_screen`}
      asChild
    >
      <TouchableOpacity style={styles.chapterItem}>
        <View style={styles.chapterInfoContainer}>
          <Typography style={styles.chapterTitle}>{item.chapterNum}</Typography>
          <Typography style={styles.chapterDate}>{item.chapterDate}</Typography>
        </View>
        <TouchableOpacity style={styles.downloadButton}>
          <Icons.CaretRight size={20} color={colors.neutral900} weight="bold" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Link>
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
