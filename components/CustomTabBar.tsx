import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import React, { useRef, useEffect } from "react";
import { verticalScale } from "@/utils/style";
import { colors } from "@/constants/theme";
import * as Icons from "phosphor-react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Image } from "expo-image";
import { Router } from "expo-router";
import { BlurView } from "expo-blur";
import { UserType } from "@/utils/types";
import { getProfileImage } from "@/services/imageService";

interface CustomTabBarProps extends BottomTabBarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType;
  router: Router;
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  navigation,
  isOpen,
  setIsOpen,
  user,
  router,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const tabBarIcons: any = {
    index: (isFocused: boolean) => (
      <Icons.HouseSimple
        size={verticalScale(28)}
        weight={isFocused ? "fill" : "regular"}
        color={isFocused ? colors.primary : colors.neutral400}
      />
    ),
    bookmark: (isFocused: boolean) => (
      <Icons.BookBookmark
        size={verticalScale(28)}
        weight={isFocused ? "fill" : "regular"}
        color={isFocused ? colors.primary : colors.neutral400}
      />
    ),
    profile: (isFocused: boolean) => (
      <Image
        source={getProfileImage(user?.image)}
        style={{
          width: verticalScale(28),
          height: verticalScale(28),
          borderRadius: verticalScale(14),
          borderWidth: 2,
          borderColor: isFocused ? colors.primary : colors.neutral400,
        }}
      />
    ),
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={50} tint="light" style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            if (route.name === "add_transactions") {
              setIsOpen(!isOpen);
            } else {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            }
          };

          return (
            <TouchableOpacity
              key={route.name}
              onPress={onPress}
              style={styles.tabBarItem}
            >
              {tabBarIcons[route.name] && tabBarIcons[route.name](isFocused)}
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: verticalScale(25),
    width: "92%",
    alignSelf: "center",
    alignItems: "center",
  },
  tabBar: {
    flexDirection: "row",
    height: Platform.OS === "ios" ? verticalScale(70) : verticalScale(60),
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: verticalScale(30),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: "100%",
  },
  tabBarItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: verticalScale(8),
    position: "relative",
    borderRadius: verticalScale(15),
  },
  floatingIcon: {
    position: "absolute",
    bottom: 1,
  },
  menuContainer: {
    position: "absolute",
    bottom: verticalScale(100),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: verticalScale(10),
    borderRadius: verticalScale(25),
  },
  menuItem: {
    width: verticalScale(55),
    height: verticalScale(55),
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    transform: [{ scale: 1 }],
  },
});
