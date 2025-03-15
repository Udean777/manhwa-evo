import HomeHeader from "@/components/HomeHeader";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typography from "@/components/Typography";
import { fonts } from "@/constants/theme";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

type ManhwaProps = {
  title: string;
  chapter: string;
  rating: string;
  imageSrc: string;
  link: string;
};

export default function HomeScreen() {
  const [data, setData] = useState<ManhwaProps[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchManhwaPopular = async () => {
      try {
        const response = await axios.get(
          "https://kurokami.vercel.app/api/manhwa-popular"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchManhwaPopular();
  }, []);

  const handleManhwaPress = (item: any) => {
    const linkParts = item.link.split("/");
    const mangaIndex = linkParts.indexOf("manga");
    if (mangaIndex !== -1 && mangaIndex + 1 < linkParts.length) {
      const manhwaId = linkParts[mangaIndex + 1];
      router.push({ pathname: "/manhwa_detail", params: { manhwaId } });
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <HomeHeader />

        <FlatList
          data={data.slice(0, 5)}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                style={styles.card}
                onPress={() => handleManhwaPress(item)}
              >
                <Image source={{ uri: item.imageSrc }} style={styles.image} />
                <View style={styles.textContainer}>
                  <Typography
                    style={styles.title}
                    textProps={{
                      numberOfLines: 1,
                      ellipsizeMode: "tail",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography style={styles.chapter}>{item.chapter}</Typography>
                  <Typography style={styles.rating}>
                    ⭐ {item.rating}
                  </Typography>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  card: {
    width: 140,
    marginRight: 12,
    backgroundColor: "#f8f8f8",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 160,
    borderRadius: 6,
  },
  textContainer: {
    width: "100%",
    marginTop: 8,
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.PoppinsBold,
    textAlign: "center",
    color: "#333",
    maxWidth: 120,
    lineHeight: 18,
    height: 36,
    overflow: "hidden",
  },
  chapter: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  rating: {
    fontSize: 12,
    fontFamily: fonts.PoppinsSemiBold,
    color: "#0286FF",
    marginTop: 2,
  },
});
