import { StyleSheet, Pressable, ViewStyle } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { CaretLeft } from "phosphor-react-native";
import { verticalScale } from "@/utils/style";
import { colors, radius } from "@/constants/theme";

type BackButtonProps = {
  style?: ViewStyle;
  iconSize?: number;
  icon?: any;
};

const BackButton = ({
  style,
  iconSize = 26,
  icon = (
    <CaretLeft size={verticalScale(iconSize)} color="#fff" weight="bold" />
  ),
}: BackButtonProps) => {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.back()} style={[styles.button, style]}>
      {icon}
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.neutral600,
    alignSelf: "flex-start",
    borderRadius: radius._12,
    borderCurve: "continuous",
    padding: 5,
  },
});
