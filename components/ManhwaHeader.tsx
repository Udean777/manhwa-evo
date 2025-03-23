import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import Typography from "@/components/Typography";
import { scale, verticalScale } from "@/utils/style";
import * as Icons from "phosphor-react-native";
import { DetailRow } from "./Common";
import { colors, fonts, radius, spacingX, spacingY } from "@/constants/theme";
import { ManhwaDetail } from "@/utils/types";
import SectionCard from "./SectionCard";

const ManhwaHeader = ({
  manhwaDetail,
}: {
  manhwaDetail: ManhwaDetail | null;
}) => (
  <SectionCard bgColor={colors.primaryLight}>
    <View style={styles.headerSection}>
      <Image
        source={{
          uri:
            manhwaDetail?.imageSrc ||
            "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
        }}
        style={styles.coverImage}
        contentFit="cover"
      />
      <View style={styles.headerInfo}>
        <Typography
          size={18}
          fontFamily={fonts.PoppinsBold}
          color={colors.neutral800}
          textProps={{ numberOfLines: 2, ellipsizeMode: "tail" }}
        >
          {manhwaDetail?.title}
        </Typography>
        <View style={styles.ratingContainer}>
          <Icons.Star weight="fill" size={scale(16)} color="#FFD700" />
          <Typography
            size={14}
            color={colors.neutral800}
            fontFamily={fonts.PoppinsSemiBold}
            style={styles.rating}
          >
            {manhwaDetail?.rating}
          </Typography>
          <Typography
            color={colors.neutral800}
            size={12}
            style={styles.followedBy}
          >
            {manhwaDetail?.followedBy}
          </Typography>
        </View>
        <DetailRow label="Status:" value={manhwaDetail?.status!} />
        <DetailRow label="Type:" value={manhwaDetail?.type!} />
        <DetailRow label="Released:" value={manhwaDetail?.released!} />
        <DetailRow label="Updated:" value={manhwaDetail?.updatedOn!} />
      </View>
    </View>
  </SectionCard>
);

export default ManhwaHeader;

const styles = StyleSheet.create({
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: radius._10,
    padding: spacingX._15,
    shadowColor: "#000",
    shadowOffset: { width: scale(2), height: scale(4) },
    shadowOpacity: 0.2,
    shadowRadius: scale(5),
    borderWidth: scale(2),
    borderColor: "#1a1a1a",
    marginBottom: spacingY._15,
  },
  headerSection: {
    flexDirection: "row",
    marginBottom: spacingY._15,
  },
  coverImage: {
    width: scale(130),
    height: verticalScale(180),
    borderRadius: radius._6,
    borderWidth: scale(2),
    borderColor: "#1a1a1a",
  },
  headerInfo: {
    flex: 1,
    marginLeft: spacingX._15,
    justifyContent: "space-between",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.green,
    paddingHorizontal: spacingX._7,
    paddingVertical: spacingY._5,
    borderRadius: radius._6,
    borderWidth: scale(1),
    borderColor: "#1a1a1a",
    alignSelf: "flex-start",
    marginVertical: spacingY._7,
  },
  rating: {
    marginLeft: spacingX._5,
  },
  followedBy: {
    marginLeft: spacingX._7,
  },
  sectionTitle: {
    color: "#333",
    marginBottom: spacingY._10,
  },
  actionButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacingY._12,
    borderRadius: radius._6,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: scale(2),
    borderColor: "#1a1a1a",
    shadowColor: "#000",
    shadowOffset: { width: scale(2), height: scale(2) },
    shadowOpacity: 0.3,
    shadowRadius: scale(3),
  },
});
