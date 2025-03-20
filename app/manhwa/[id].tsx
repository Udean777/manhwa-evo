import React from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typography from "@/components/Typography";
import { fonts } from "@/constants/theme";
import { useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import * as Icons from "phosphor-react-native";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import ChapterItem from "@/components/ChapterItem";
import useFetchData from "@/hooks/useFetchData";
import { ManhwaDetail } from "@/utils/types";
import ListChapter from "@/components/ListChapter";

const Details = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: manhwaDetail,
    error,
    isLoading,
  } = useFetchData<ManhwaDetail | null>(`/api/manhwa-detail/${id}`);

  //   console.log(id);

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
        leftIcon={<Icons.ArrowLeft size={20} />}
        title={manhwaDetail?.title || "Detail Manhwa"}
      />

      <ScrollView style={styles.container}>
        <View style={styles.headerSection}>
          <Image
            source={{ uri: manhwaDetail?.imageSrc }}
            style={styles.coverImage}
            resizeMode="cover"
          />
          <View style={styles.headerInfo}>
            <Typography style={styles.title}>{manhwaDetail?.title}</Typography>
            <View style={styles.ratingContainer}>
              <Icons.Star weight="fill" size={16} color="#FFD700" />
              <Typography style={styles.rating}>
                {manhwaDetail?.rating}
              </Typography>
              <Typography style={styles.followedBy}>
                {manhwaDetail?.followedBy}
              </Typography>
            </View>
            <View style={styles.detailRow}>
              <Typography style={styles.detailLabel}>Status:</Typography>
              <Typography style={styles.detailValue}>
                {manhwaDetail?.status}
              </Typography>
            </View>
            <View style={styles.detailRow}>
              <Typography style={styles.detailLabel}>Type:</Typography>
              <Typography style={styles.detailValue}>
                {manhwaDetail?.type}
              </Typography>
            </View>
            <View style={styles.detailRow}>
              <Typography style={styles.detailLabel}>Released:</Typography>
              <Typography style={styles.detailValue}>
                {manhwaDetail?.released}
              </Typography>
            </View>
            <View style={styles.detailRow}>
              <Typography style={styles.detailLabel}>Updated:</Typography>
              <Typography style={styles.detailValue}>
                {manhwaDetail?.updatedOn}
              </Typography>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Typography style={styles.sectionTitle}>Author & Artist</Typography>
          <Typography style={styles.author}>
            Author: {manhwaDetail?.author}
          </Typography>
          <Typography style={styles.artist}>
            Artist: {manhwaDetail?.artist}
          </Typography>
        </View>

        <View style={styles.section}>
          <Typography style={styles.sectionTitle}>
            Alternative Titles
          </Typography>
          <Typography style={styles.alternativeText}>
            {manhwaDetail?.alternative}
          </Typography>
        </View>

        <View style={styles.section}>
          <Typography style={styles.sectionTitle}>Synopsis</Typography>
          <Typography style={styles.synopsis}>
            {manhwaDetail?.synopsis}
          </Typography>
        </View>

        <View style={styles.section}>
          <Typography style={styles.sectionTitle}>Genres</Typography>
          <FlatList
            data={manhwaDetail?.genres}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.genreBadge}>
                <Typography style={styles.genreText}>
                  {item.genreName}
                </Typography>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.genreName}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.genreContainer}
          />
        </View>

        <ListChapter manhwaDetail={manhwaDetail} manhwaId={id} />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  headerSection: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  coverImage: {
    width: 130,
    height: 180,
    borderRadius: 8,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.PoppinsBold,
    color: "#333",
    flexShrink: 1,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: "#333",
    fontFamily: fonts.PoppinsMedium,
  },
  followedBy: {
    marginLeft: 8,
    fontSize: 12,
    color: "#666",
  },
  detailRow: {
    flexDirection: "row",
    marginTop: 6,
  },
  detailLabel: {
    width: 70,
    fontSize: 13,
    color: "#666",
    fontFamily: fonts.PoppinsBold,
  },
  detailValue: {
    flex: 1,
    fontSize: 13,
    color: "#333",
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fonts.PoppinsBold,
    color: "#333",
    marginBottom: 8,
  },
  author: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  artist: {
    fontSize: 14,
    color: "#333",
  },
  alternativeText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  synopsis: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  genreContainer: {
    paddingVertical: 4,
  },
  genreBadge: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  genreText: {
    fontSize: 12,
    color: "#333",
    fontFamily: fonts.PoppinsMedium,
  },
});
