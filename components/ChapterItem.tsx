import { StyleSheet, Text, Pressable, View } from "react-native";
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
      <Pressable style={styles.chapterItem}>
        <View style={styles.chapterInfoContainer}>
          <Typography
            fontFamily={fonts.PoppinsBold}
            size={14}
            color={colors.neutral800}
          >
            {item.chapterNum}
          </Typography>
          <Typography
            fontFamily={fonts.PoppinsMedium}
            size={11}
            color={colors.neutral600}
          >
            {item.chapterDate}
          </Typography>
        </View>
        <Pressable style={styles.downloadButton}>
          <Icons.CaretRight size={20} color={colors.neutral900} weight="bold" />
        </Pressable>
      </Pressable>
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
    borderBottomColor: colors.neutral900,
  },
  chapterInfoContainer: {
    flex: 1,
  },
  downloadButton: {
    padding: 8,
  },
});
