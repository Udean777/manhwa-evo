import Error from "@/components/Error";
import HomeHeader from "@/components/HomeHeader";
import Loading from "@/components/Loading";
import ManhwaCard from "@/components/ManhwaCard";
import PopularCard from "@/components/PopularCard";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typography from "@/components/Typography";
import { fonts } from "@/constants/theme";
import useFetchData from "@/hooks/useFetchData";
import { verticalScale } from "@/utils/style";
import { ManhwaOngoingProps, ManhwaProps } from "@/utils/types";
import { FlatList, StyleSheet, ScrollView, View } from "react-native";

export default function HomeScreen() {
  const { data, isLoading, error } = useFetchData<any[]>("/api/manhwa-top");
  const {
    data: ongoingManhwa,
    isLoading: ongoingLoading,
    error: ongoingError,
  } = useFetchData<ManhwaOngoingProps[]>("/api/manhwa-ongoing");

  // console.log(data);

  if (isLoading || ongoingLoading) {
    return <Loading />;
  }

  if (error || ongoingError) {
    return <Error onRefresh={() => {}} error={error} />;
  }

  return (
    <ScreenWrapper>
      <View
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 80,
          }}
          style={styles.container}
        >
          <HomeHeader />

          <View
            style={{
              marginTop: 10,
            }}
          >
            <Typography
              size={verticalScale(15)}
              fontFamily={fonts.PoppinsBold}
              style={{
                marginBottom: 5,
              }}
            >
              Manhwa Yang Lagi Populer
            </Typography>

            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <PopularCard item={item} />}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    width: 16,
                  }}
                />
              )}
              contentContainerStyle={{ gap: 26, paddingRight: 30 }}
              style={{
                marginTop: 12,
                marginBottom: 16,
              }}
            />
          </View>

          <View
            style={{
              marginTop: 10,
            }}
          >
            <Typography
              size={verticalScale(15)}
              fontFamily={fonts.PoppinsBold}
              style={{
                marginBottom: 5,
              }}
            >
              Manhwa Yang Lagi Ongoing
            </Typography>

            <FlatList
              data={ongoingManhwa}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <ManhwaCard item={item} />}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              style={{
                marginTop: 8,
                paddingBottom: 80,
              }}
              scrollEnabled={false}
            />
          </View>
        </ScrollView>
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
});
