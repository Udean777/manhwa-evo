import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as Icons from "phosphor-react-native";
import { useAuth } from "@/context/authContext";
import {Image} from "expo-image"
import { getProfileImage } from "@/services/imageService";

const HomeHeader = () => {
  const {user} = useAuth()

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTop}>
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <Image
              source={getProfileImage(user?.image)}
              contentFit="cover"
              transition={500}
              style={styles.avatar}
            />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.subtitle}>Stay trending!</Text>
            <Text style={styles.username}>{user?.username}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.iconButton}>
          <Icons.GridFour size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Icons.MagnifyingGlass size={20} color="#666" />
        <TextInput
          placeholder="Search manga"
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
        <TouchableOpacity>
          <Icons.SlidersHorizontal size={22} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    // paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: "#fff",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    backgroundColor: "#0286FF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  textContainer: {
    marginLeft: 12,
  },
  subtitle: {
    fontSize: 12,
    color: "#888",
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  iconButton: {
    padding: 8,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    marginTop: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
});
