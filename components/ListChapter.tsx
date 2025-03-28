import { StyleSheet, Text, Pressable, View } from "react-native";
import React from "react";
import Typography from "./Typography";
import { FlatList } from "react-native";
import ChapterItem from "./ChapterItem";
import { colors, fonts } from "@/constants/theme";
import { useRouter } from "expo-router";

const ListChapter = ({ manhwaDetail, manhwaId }: any) => {
  const router = useRouter();

  return (
    <View style={styles.section}>
      <View style={styles.chapterHeaderRow}>
        <Typography style={styles.sectionTitle}>Chapters</Typography>
        <View style={styles.chapterControls}>
          <Pressable
            style={styles.viewAll}
            onPress={() => router.push(`/manhwa/${manhwaId}/all_chapters`)}
          >
            <Typography
              style={styles.viewAllText}
              size={12}
              fontFamily={fonts.PoppinsMedium}
              color={colors.neutral800}
            >
              Lihat Semua
            </Typography>
          </Pressable>
        </View>
      </View>
      <FlatList
        data={manhwaDetail?.chapters.slice(0, 10)}
        renderItem={({ item }) => <ChapterItem item={item} />}
        keyExtractor={(item) => item.chapterNum}
        scrollEnabled={false}
      />
    </View>
  );
};

export default ListChapter;

const styles = StyleSheet.create({
  section: {
    // padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fonts.PoppinsBold,
    color: "#333",
    marginBottom: 8,
  },
  chapterHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  chapterControls: {
    flexDirection: "row",
  },
  viewAll: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.pastelPink,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#1a1a1a",
  },
  viewAllText: {
    marginLeft: 4,
  },
});
