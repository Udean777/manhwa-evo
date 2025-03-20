import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Typography from "./Typography";
import { FlatList } from "react-native";
import ChapterItem from "./ChapterItem";
import { fonts } from "@/constants/theme";
import { useRouter } from "expo-router";

const ListChapter = ({ manhwaDetail, manhwaId }: any) => {
  const router = useRouter();

  return (
    <View style={styles.section}>
      <View style={styles.chapterHeaderRow}>
        <Typography style={styles.sectionTitle}>Chapters</Typography>
        <View style={styles.chapterControls}>
          <TouchableOpacity
            style={styles.viewAll}
            onPress={() => router.push(`/manhwa/${manhwaId}/all_chapters`)}
          >
            <Typography style={styles.viewAllText}>Lihat Semua</Typography>
          </TouchableOpacity>
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
    padding: 16,
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
    borderRadius: 6,
    backgroundColor: "#f0f0f0",
  },
  viewAllText: {
    fontSize: 12,
    color: "#333",
    marginLeft: 4,
    fontFamily: fonts.PoppinsMedium,
  },
});
