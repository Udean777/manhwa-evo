import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const DetailLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="search_results"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default DetailLayout;
