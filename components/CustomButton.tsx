import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { verticalScale } from "@/utils/style";
import { colors, radius } from "@/constants/theme";
import Loading from "./Loading";

interface CustomButtonProps extends TouchableOpacityProps {
  style?: ViewStyle;
  onPress?: () => void;
  loading?: boolean;
  children: React.ReactNode;
}

export const CustomButton = ({
  style,
  onPress,
  loading = false,
  children,
}: CustomButtonProps) => {
  if (loading) {
    return (
      <View style={[styles.shadowContainer, style]}>
        <View style={[styles.button, { backgroundColor: "transparent" }]}>
          <Loading />
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.shadowContainer}
    >
      <View style={styles.shadowLayer} />
      <View style={[styles.button, style]}>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    position: "relative",
  },
  shadowLayer: {
    position: "absolute",
    top: 6, 
    left: 6, 
    width: "100%",
    height: verticalScale(52),
    backgroundColor: "black", 
    borderRadius: radius._17,
  },
  button: {
    backgroundColor: colors.neutral100,
    borderRadius: radius._17,
    borderWidth: 1,
    height: verticalScale(52),
    justifyContent: "center",
    alignItems: "center",
  },
});
