import React from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import Typography from "@/components/Typography";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import useFetchData from "@/hooks/useFetchData";
import Error from "@/components/Error";
import { colors, fonts } from "@/constants/theme";
import { ManhwaDetail } from "@/utils/types";
import { getChapterId } from "@/utils/common";
import { verticalScale } from "@/utils/style";
import * as Icons from "phosphor-react-native";

const AllChaptersScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: manhwaDetail,
    error,
    isLoading,
  } = useFetchData<ManhwaDetail | null>(`/api/manhwa-detail/${id}`);

  if (isLoading) return <Loading />;
  if (error) return <Error onRefresh={() => {}} error={error} />;

  return (
    <ScreenWrapper>
      <Header title="Semua Chapter" leftIcon={<Icons.ArrowLeft size={20} />} />

      <FlatList
        data={manhwaDetail?.chapters || []}
        keyExtractor={(item) => item.chapterNum.toString()}
        numColumns={3}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Link
            href={`/manhwa/${getChapterId(item.chapterLink)}/reading_screen`}
            asChild
          >
            <TouchableOpacity style={styles.chapterCard}>
              <Typography
                size={verticalScale(12)}
                fontFamily={fonts.PoppinsSemiBold}
                color={colors.neutral900}
              >
                {item.chapterNum.toString()}
              </Typography>
            </TouchableOpacity>
          </Link>
        )}
      />
    </ScreenWrapper>
  );
};

export default AllChaptersScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  chapterCard: {
    flex: 1,
    margin: 5,
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
});
