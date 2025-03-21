import { Text, TextProps, TextStyle } from "react-native";
import React from "react";
import { verticalScale } from "@/utils/style";
import { colors, fonts } from "@/constants/theme";

type TypoProps = {
  size?: number;
  color?: string;
  fontWeight?: TextStyle["fontWeight"];
  children: any | null;
  style?: any;
  textProps?: TextProps;
  fontFamily?: TextStyle["fontFamily"];
};

const Typography = ({
  size,
  color = colors.neutral700,
  fontWeight = "400",
  fontFamily = fonts.Poppins,
  children,
  style,
  textProps = {},
}: TypoProps) => {
  const textStyle: TextStyle = {
    fontSize: size ? verticalScale(size) : verticalScale(18),
    color,
    fontWeight,
    fontFamily,
  };

  return (
    <Text style={[textStyle, style]} {...textProps}>
      {children}
    </Text>
  );
};

export default Typography;
