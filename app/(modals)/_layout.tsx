import React from "react";
import { Stack } from "expo-router";

const ModalLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="edit_profile"
        options={{
          presentation: "modal",
        }}
      />
      {/* <Stack.Screen
        name="wallet_modal"
        options={{
          presentation: "modal",
        }}
      /> */}
    </Stack>
  );
};

export default ModalLayout;
