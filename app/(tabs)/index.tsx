import { CustomButton } from "@/components/CustomButton";
import Typography from "@/components/Typography";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { Image, StyleSheet, Platform, View, Text } from "react-native";

export default function HomeScreen() {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <View>
      <Text>Home Screen</Text>
      <CustomButton onPress={handleLogout}>
        <Typography>Logout</Typography>
      </CustomButton>
    </View>
  );
}
