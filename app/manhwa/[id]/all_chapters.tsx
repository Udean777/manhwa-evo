import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import Typography from "@/components/Typography";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import useFetchData from "@/hooks/useFetchData";
import Error from "@/components/Error";
import { colors, fonts, radius, spacingX } from "@/constants/theme";
import { ManhwaDetail } from "@/utils/types";
import { getChapterId } from "@/utils/common";
import { scale, verticalScale } from "@/utils/style";
import * as Icons from "phosphor-react-native";

const AllChaptersScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredChapters, setFilteredChapters] = useState<any[]>([]);

  const backgroundColors = [
    colors.green,
    colors.pastelLavender,
    colors.rose,
    colors.pastelTeal,
  ];

  const getRandomColor = useMemo(() => {
    return (index: number) => backgroundColors[index % backgroundColors.length];
  }, []);

  const {
    data: manhwaDetail,
    error,
    isLoading,
  } = useFetchData<ManhwaDetail | null>(`/api/manhwa-detail/${id}`);

  const chaptersData = Array.isArray(manhwaDetail)
    ? manhwaDetail
    : manhwaDetail?.chapters;

  useEffect(() => {
    if (chaptersData) {
      setFilteredChapters(chaptersData);
    }
  }, [chaptersData]);

  const handleSearch = () => {
    try {
      if (!searchQuery.trim()) {
        setFilteredChapters(chaptersData || []);
      } else {
        const query = searchQuery.trim().toLowerCase();
        const filtered =
          chaptersData?.filter((chapter) => {
            return String(chapter.chapterNum).toLowerCase().includes(query);
          }) || [];

        setFilteredChapters(filtered);
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, chaptersData]);

  if (isLoading) return <Loading />;
  if (error) return <Error onRefresh={() => {}} error={error} />;

  return (
    <ScreenWrapper>
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <Header
          title="Semua Chapter"
          leftIcon={<Icons.ArrowLeft size={20} />}
        />

        <View style={styles.searchShadowContainer}>
          <View style={styles.innerShadow} />
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Icons.MagnifyingGlass size={20} color="#666" />
              <TextInput
                style={styles.searchInput}
                placeholder="Cari chapter..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
                autoCapitalize="none"
              />
              {searchQuery.length > 0 && (
                <Pressable onPress={() => setSearchQuery("")}>
                  <Icons.X size={20} color="#666" />
                </Pressable>
              )}
            </View>
            {/* <Pressable
              style={[styles.filterButton]}
              onPress={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
            >
              <Icons.SlidersHorizontal
                size={24}
                color={colors.neutral900}
                weight="fill"
              />
            </Pressable> */}
          </View>
        </View>

        <FlatList
          data={filteredChapters}
          keyExtractor={(item) => item.chapterNum.toString()}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Link
              href={`/manhwa/${getChapterId(item.chapterLink)}/reading_screen`}
              asChild
            >
              <Pressable style={styles.chapterCard}>
                <View
                  style={[
                    styles.innerShadow,
                    {
                      top: scale(4),
                      left: scale(4),
                      right: scale(-4),
                      bottom: scale(-4),
                      zIndex: 1,
                    },
                  ]}
                />
                <View
                  style={[
                    styles.chapterTitle,
                    { backgroundColor: getRandomColor(index) },
                  ]}
                >
                  <Typography
                    size={verticalScale(12)}
                    fontFamily={fonts.PoppinsSemiBold}
                    color={colors.neutral900}
                  >
                    {item.chapterNum.toString()}
                  </Typography>
                </View>
              </Pressable>
            </Link>
          )}
          ListEmptyComponent={
            <View style={styles.emptyResultContainer}>
              <Icons.MagnifyingGlass size={50} color={colors.neutral400} />
              <Typography
                size={16}
                color={colors.neutral600}
                fontFamily={fonts.PoppinsMedium}
                style={styles.emptyResultText}
              >
                Tidak ada chapter yang sesuai dengan "{searchQuery}"
              </Typography>
            </View>
          }
        />
      </View>
    </ScreenWrapper>
  );
};

export default AllChaptersScreen;

const styles = StyleSheet.create({
  chapterCard: {
    flex: 1,
    margin: 5,
    position: "relative",
    height: verticalScale(50),
  },
  chapterTitle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius._10 || 12,
    borderWidth: scale(2),
    borderColor: "#1a1a1a",
    zIndex: 2,
  },
  searchShadowContainer: {
    position: "relative",
    marginBottom: 16,
  },
  innerShadow: {
    position: "absolute",
    top: scale(4),
    left: scale(4),
    right: scale(-4),
    bottom: scale(-4),
    backgroundColor: colors.black,
    borderRadius: radius._10 || 12,
    zIndex: 1,
  },
  searchContainer: {
    position: "relative",
    zIndex: 2,
    flexDirection: "row",
    borderRadius: radius._10 || 12,
    borderWidth: scale(2),
    borderColor: "#1a1a1a",
    backgroundColor: "#fff",
    padding: (spacingX && spacingX._10) || 10,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginRight: 8,
    borderWidth: 2,
    borderColor: colors.neutral900,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    marginLeft: 8,
    color: "#333",
  },
  filterButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: colors.neutral900,
  },
  emptyResultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyResultText: {
    textAlign: "center",
    marginTop: 16,
  },
});
