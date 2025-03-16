import { Tabs, useRouter } from "expo-router";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import CustomTabBar from "@/components/CustomTabBar";
import { useAuth } from "@/context/authContext";

export default function TabLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  return (
    <Tabs
      tabBar={(props) => (
        <CustomTabBar
          {...props}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          user={user}
          router={router}
        />
      )}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="bookmark" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
