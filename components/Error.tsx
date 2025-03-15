import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ScreenWrapper from "./ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import Typography from "./Typography";
import { fonts } from "@/constants/theme";

const Error = ({
  onRefresh,
  error,
}: {
  onRefresh: () => void;
  error: string | null;
}) => {
  return (
    <ScreenWrapper>
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={50} color="#ff3b30" />
        <Typography style={styles.errorText}>{error}</Typography>
        <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
          <Typography style={styles.retryButtonText}>Retry</Typography>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

export default Error;

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#0286FF",
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontFamily: fonts.PoppinsMedium,
  },
});
