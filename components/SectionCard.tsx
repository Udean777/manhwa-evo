import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "@/components/Typography";
import { colors, fonts, radius, spacingX, spacingY } from "@/constants/theme";
import { scale, verticalScale } from "@/utils/style";

const SectionCard = ({
  title,
  children,
  bgColor,
}: {
  title?: string;
  children: React.ReactNode;
  bgColor: any;
}) => (
  <View style={styles.container}>
    <View style={styles.innerShadow} />
    <View style={[styles.sectionCard, { backgroundColor: bgColor }]}>
      {title && <Typography style={styles.sectionTitle}>{title}</Typography>}
      {children}
    </View>
  </View>
);

export default SectionCard;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginBottom: spacingY._15,
  },
  innerShadow: {
    position: "absolute",
    top: scale(8),
    left: scale(8),
    right: scale(-4),
    bottom: scale(-4),
    backgroundColor: colors.black,
    borderRadius: radius._10,
    zIndex: 1,
  },
  sectionCard: {
    position: "relative",
    zIndex: 2,
    borderRadius: radius._10,
    padding: spacingX._15,
    borderWidth: scale(2),
    borderColor: "#1a1a1a",
  },
  sectionTitle: {
    color: "#333",
    marginBottom: spacingY._10,
  },
});
