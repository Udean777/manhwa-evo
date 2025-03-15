import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import axios from "axios";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typography from "@/components/Typography";
import { fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import Header from "@/components/Header";
import * as Icons from "phosphor-react-native";
import Error from "@/components/Error";
import Loading from "@/components/Loading";

interface ManhwaDetail {
  id: string;
  title: string;
  imageSrc: string;
  rating: string;
  followedBy: string;
  status: string;
  type: string;
  released: string;
  updatedOn: string;
  author: string;
  artist: string;
  alternative: string;
  synopsis: string;
  genres: { genreName: string }[];
  chapters: { chapterNum: string; chapterDate: string }[];
}

const Page = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [manhwaDetail, setManhwaDetail] = useState<ManhwaDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { manhwaId } = useLocalSearchParams<{ manhwaId: string }>();
  const router = useRouter();

  const fetchManhwaDetail = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://kurokami.vercel.app/api/manhwa-detail/${manhwaId}`
      );
      setManhwaDetail(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching manhwa detail:", err);
      setError("Failed to load manhwa details");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManhwaDetail();
  }, [manhwaId]);

  const renderGenreBadge = ({ item }: any) => (
    <TouchableOpacity style={styles.genreBadge}>
      <Typography style={styles.genreText}>{item.genreName}</Typography>
    </TouchableOpacity>
  );

  const renderChapterItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.chapterItem}
      onPress={() => {
        router.push({
          pathname: "/reading_screen",
          params: {
            chapterLink: item.chapterLink,
          },
        });
        // console.log(item.chapterLink);
      }}
    >
      <View style={styles.chapterInfoContainer}>
        <Typography style={styles.chapterTitle}>{item.chapterNum}</Typography>
        <Typography style={styles.chapterDate}>{item.chapterDate}</Typography>
      </View>
      <TouchableOpacity style={styles.downloadButton}>
        <Ionicons name="download-outline" size={20} color="#0286FF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Error
        onRefresh={() => {
          setError(null);
          setLoading(true);
          fetchManhwaDetail();
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
              <Ionicons name="star" size={16} color="#FFD700" />
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
            renderItem={renderGenreBadge}
            keyExtractor={(item) => item.genreName}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.genreContainer}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.chapterHeaderRow}>
            <Typography style={styles.sectionTitle}>Chapters</Typography>
            <View style={styles.chapterControls}>
              <TouchableOpacity style={styles.sortButton}>
                <Ionicons name="filter-outline" size={20} color="#333" />
                <Typography style={styles.sortButtonText}>Sort</Typography>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={manhwaDetail?.chapters.slice(0, 10)}
            renderItem={renderChapterItem}
            keyExtractor={(item) => item.chapterNum}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Page

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
    fontFamily: fonts.PoppinsMedium,
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
  chapterHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  chapterControls: {
    flexDirection: "row",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: "#f0f0f0",
  },
  sortButtonText: {
    fontSize: 12,
    color: "#333",
    marginLeft: 4,
    fontFamily: fonts.PoppinsMedium,
  },
  chapterItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  chapterInfoContainer: {
    flex: 1,
  },
  chapterTitle: {
    fontSize: 14,
    color: "#333",
    fontFamily: fonts.PoppinsMedium,
  },
  chapterDate: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  downloadButton: {
    padding: 8,
  },
});
