import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors, spacingX } from "@/constants/theme";
import { useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import * as Icons from "phosphor-react-native";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import useFetchData from "@/hooks/useFetchData";
import { ManhwaDetail } from "@/utils/types";
import ListChapter from "@/components/ListChapter";
import { scale } from "@/utils/style";
import Genres from "../../components/Genres";
import ManhwaHeader from "../../components/ManhwaHeader";
import {
  AlternativeTitles,
  AuthorArtist,
  Synopsis,
} from "../../components/Common";
import SectionCard from "../../components/SectionCard";

const Details = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: manhwaDetail,
    error,
    isLoading,
  } = useFetchData<ManhwaDetail | null>(`/api/manhwa-detail/${id}`);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Error
        onRefresh={() => {
          // setError(null);
          // setLoading(true);
          // fetchManhwaDetail();
        }}
        error={error}
      />
    );
  }

  return (
    <ScreenWrapper>
      <Header
        leftIcon={<Icons.ArrowLeft size={scale(20)} />}
        title={manhwaDetail?.title || "Detail Manhwa"}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        <ManhwaHeader manhwaDetail={manhwaDetail} />
        <AuthorArtist manhwaDetail={manhwaDetail} />
        <AlternativeTitles manhwaDetail={manhwaDetail} />
        <Synopsis manhwaDetail={manhwaDetail} />
        <Genres manhwaDetail={manhwaDetail} />
        <SectionCard bgColor={colors.pastelTeal}>
          <ListChapter manhwaDetail={manhwaDetail} manhwaId={id} />
        </SectionCard>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: spacingX._12,
  },
});
