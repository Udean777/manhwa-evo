import Typography from "@/components/Typography";
import { scale, verticalScale } from "@/utils/style";
import { StyleSheet, View } from "react-native";
import { ManhwaDetail } from "@/utils/types";
import { colors, fonts, spacingY } from "@/constants/theme";
import SectionCard from "./SectionCard";

export const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <View style={styles.detailRow}>
    <Typography
      size={12}
      fontFamily={fonts.PoppinsBold}
      style={styles.detailLabel}
      color={colors.neutral800}
    >
      {label}
    </Typography>
    <Typography size={12} style={styles.detailValue}>
      {value}
    </Typography>
  </View>
);

export const AuthorArtist = ({
  manhwaDetail,
}: {
  manhwaDetail: ManhwaDetail | null;
}) => (
  <SectionCard bgColor={colors.expense} title="Author & Artist">
    <Typography size={12} style={styles.author}>
      Author: {manhwaDetail?.author}
    </Typography>
    <Typography size={12} style={styles.artist}>
      Artist: {manhwaDetail?.artist}
    </Typography>
  </SectionCard>
);

export const AlternativeTitles = ({
  manhwaDetail,
}: {
  manhwaDetail: ManhwaDetail | null;
}) => (
  <SectionCard bgColor={colors.primary} title="Alternative Titles">
    <Typography size={12} style={styles.alternativeText}>
      {manhwaDetail?.alternative}
    </Typography>
  </SectionCard>
);

export const Synopsis = ({
  manhwaDetail,
}: {
  manhwaDetail: ManhwaDetail | null;
}) => (
  <SectionCard bgColor={colors.pastelMint} title="Synopsis">
    <Typography size={12} style={styles.synopsis}>
      {manhwaDetail?.synopsis}
    </Typography>
  </SectionCard>
);

const styles = StyleSheet.create({
  detailRow: {
    flexDirection: "row",
    marginTop: spacingY._5,
  },
  detailLabel: {
    width: scale(70),
  },
  detailValue: {
    flex: 1,
  },
  author: {
    marginBottom: spacingY._7,
  },
  artist: {},
  alternativeText: {
    lineHeight: 20,
  },
  synopsis: {
    lineHeight: 20,
  },
});
