import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors, spacingY } from "@/constants/theme";
import Typography from "@/components/Typography";

const Page = () => {
  return (
    <View style={styles.container}>
      <Typography>Hello</Typography>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: spacingY._7,
    backgroundColor: colors.white,
  },
});
