import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import SectionCard from "./SectionCard";
import Typography from "@/components/Typography";
import { scale, verticalScale } from "@/utils/style";
import { ManhwaDetail } from "@/utils/types";
import { colors, fonts, radius, spacingX, spacingY } from "@/constants/theme";

const Genres = ({ manhwaDetail }: { manhwaDetail: ManhwaDetail | null }) => (
  <SectionCard title="Genres" bgColor={colors.secondary}>
    <FlatList
      data={manhwaDetail?.genres}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.genreBadge}>
          <Typography
            size={verticalScale(12)}
            fontFamily={fonts.PoppinsMedium}
            style={styles.genreText}
          >
            {item.genreName}
          </Typography>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.genreName}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.genreContainer}
    />
  </SectionCard>
);

export default Genres;

const styles = StyleSheet.create({
  genreContainer: {
    paddingVertical: spacingY._7,
  },
  genreBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacingX._12,
    paddingVertical: spacingY._5,
    borderRadius: radius._15,
    marginRight: spacingX._7,
    borderWidth: scale(1),
    borderColor: "#1a1a1a",
  },
  genreText: {
    color: "#333",
  },
});
