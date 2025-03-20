import Error from "@/components/Error";
import HomeHeader from "@/components/HomeHeader";
import Loading from "@/components/Loading";
import ManhwaCard from "@/components/ManhwaCard";
import PopularCard from "@/components/PopularCard";
import ScreenWrapper from "@/components/ScreenWrapper";
import useFetchData from "@/hooks/useFetchData";
import { ManhwaProps } from "@/utils/types";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, ScrollView, View } from "react-native";

export default function HomeScreen() {
  const { data, isLoading, error } = useFetchData<ManhwaProps[]>(
    "/api/manhwa-popular"
  );
  const router = useRouter();

  const handleManhwaPress = (item: any) => {
    const linkParts = item.link.split("/");
    const mangaIndex = linkParts.indexOf("manga");
    if (mangaIndex !== -1 && mangaIndex + 1 < linkParts.length) {
      const manhwaId = linkParts[mangaIndex + 1];
      router.push({ pathname: "/manhwa_detail", params: { manhwaId } });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error onRefresh={() => {}} error={error} />;
  }

  return (
    <ScreenWrapper>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
        style={styles.container}
      >
        <HomeHeader />

        <FlatList
          data={data?.slice(0, 5)}
          keyExtractor={(item, index) => item.title}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <PopularCard item={item} index={index} />
          )}
          ItemSeparatorComponent={() => (
            <View
              style={{
                width: 16,
              }}
            />
          )}
          contentContainerStyle={{ gap: 26 }}
          style={{
            marginTop: 12,
            marginBottom: 16,
          }}
        />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
});
