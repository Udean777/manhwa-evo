import Error from "@/components/Error";
import HomeHeader from "@/components/HomeHeader";
import Loading from "@/components/Loading";
import ManhwaCard from "@/components/ManhwaCard";
import PopularCard from "@/components/PopularCard";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typography from "@/components/Typography";
import { colors, fonts, radius } from "@/constants/theme";
import useFetchData from "@/hooks/useFetchData";
import { scale, verticalScale } from "@/utils/style";
import { ManhwaOngoingProps, ManhwaProps } from "@/utils/types";
import { FlatList, StyleSheet, ScrollView, View } from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useState } from "react";

export default function HomeScreen() {
  const [activeIndex, setActiveIndex] = useState(0);

  const { data, isLoading, error } = useFetchData<any[]>("/api/manhwa-top");
  const {
    data: ongoingManhwa,
    isLoading: ongoingLoading,
    error: ongoingError,
  } = useFetchData<ManhwaOngoingProps[]>("/api/manhwa-ongoing");

  console.log(JSON.stringify(ongoingManhwa, null, 2));

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
          showsVerticalScrollIndicator={false}
        >
          <HomeHeader />

          {/* Segmented Control with Shadow */}
          <View style={styles.segmentContainer}>
            <View style={styles.segmentShadow} />
            <SegmentedControl
              values={["Manhwa", "Manga", "Manhua"]}
              selectedIndex={activeIndex}
              onChange={(event) => {
                setActiveIndex(event.nativeEvent.selectedSegmentIndex);
              }}
              tintColor={colors.primary}
              backgroundColor={colors.neutral100}
              appearance="light"
              activeFontStyle={styles.segmentFontStyle}
              style={styles.segmentStyle}
              fontStyle={{
                ...styles.segmentFontStyle,
                color: colors.neutral900,
              }}
            />
          </View>

          <View
            style={{
              marginTop: 10,
            }}
          >
            <Typography
              size={15}
              fontFamily={fonts.PoppinsBold}
              style={{
                marginBottom: 5,
              }}
            >
              Manhwa yang Lagi Ngetop Nih
            </Typography>

            <FlatList
              data={data}
              keyExtractor={(item, index) => `${item.title}-${index}`}
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
              contentContainerStyle={{
                gap: 10,
                paddingRight: 30,
                paddingLeft: 10,
              }}
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
              size={15}
              fontFamily={fonts.PoppinsBold}
              style={{
                marginBottom: 5,
              }}
            >
              Manhwa yang Lagi Ongoing
            </Typography>

            <FlatList
              data={ongoingManhwa}
              keyExtractor={(item, index) => `${item.title}-${index}`}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ManhwaCard
                  imageUrl={item.imageUrl}
                  latestChapter={item.latestChapter}
                  link={item.link}
                  rating={item.rating}
                  title={item.title}
                />
              )}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: "center",
                gap: 20,
                paddingLeft: 5,
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
  segmentContainer: {
    position: "relative",
    marginVertical: 10,
  },
  segmentShadow: {
    position: "absolute",
    top: scale(8),
    left: scale(8),
    right: scale(-4),
    bottom: scale(-4),
    backgroundColor: colors.black,
    borderRadius: radius._10,
    zIndex: 1,
  },
  segmentStyle: {
    height: scale(37),
    position: "relative",
    zIndex: 2,
    borderWidth: scale(2),
    borderColor: "#1a1a1a",
    borderRadius: radius._10,
  },
  segmentFontStyle: {
    fontSize: verticalScale(11),
    fontWeight: "bold",
    color: colors.neutral900,
  },
});
