import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import React, { ReactNode } from "react";
import { colors, fonts } from "@/constants/theme";
import Typography from "./Typography";
import { useRouter } from "expo-router";

type HeaderProps = {
  title?: string;
  style?: ViewStyle;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  titleColor?: string;
};

const Header = ({
  title = "",
  leftIcon,
  rightIcon,
  style,
  titleColor = colors.neutral900,
}: HeaderProps) => {
  const router = useRouter();

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.iconWrapper}
      >
        {leftIcon}
      </TouchableOpacity>
      <Typography
        size={18}
        color={titleColor}
        fontFamily={fonts.PoppinsBold}
        style={styles.title}
        textProps={{
          numberOfLines: 1,
          ellipsizeMode: "tail",
        }}
      >
        {title}
      </Typography>
      <View style={styles.iconWrapper}>{rightIcon}</View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  iconWrapper: {
    width: 40, // Menjaga ukuran tetap konsisten untuk keseimbangan
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    textAlign: "center",
  },
});
