import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typography from "@/components/Typography";
import Header from "@/components/Header";
import { colors, fonts } from "@/constants/theme";
import * as Icons from "phosphor-react-native";
import { Image } from "expo-image";
import useManhwaSearch from "@/hooks/useSearch";

interface ManhwaSearchItem {
  title: string;
  url: string;
  image: string;
  latestChapter: string;
  rating: string;
}

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  const [
    { results, isLoading, error, currentPage, totalPages, hasNextPage },
    { search, goToNextPage, goToPrevPage },
  ] = useManhwaSearch();

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    Keyboard.dismiss();
    search(searchQuery);
  };

  const handleManhwaPress = (item: ManhwaSearchItem) => {
    const linkParts = item.url.split("/");
    const mangaIndex = linkParts.indexOf("manga");
    if (mangaIndex !== -1 && mangaIndex + 1 < linkParts.length) {
      const manhwaId = linkParts[mangaIndex + 1];
      router.push({ pathname: "/manhwa_detail", params: { manhwaId } });
    }
  };

  const renderManhwaItem = ({ item }: { item: ManhwaSearchItem }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => handleManhwaPress(item)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.manhwaImage}
        contentFit="cover"
        transition={300}
      />
      <View style={styles.manhwaInfo}>
        <Typography style={styles.manhwaTitle} textProps={{ numberOfLines: 2 }}>
          {item.title}
        </Typography>
        <View style={styles.detailsRow}>
          <Typography style={styles.manhwaChapter}>
            {item.latestChapter}
          </Typography>
          <View style={styles.ratingContainer}>
            <Icons.Star size={12} color="#FFD700" weight="fill" />
            <Typography style={styles.manhwaRating}>{item.rating}</Typography>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper>
      <Header leftIcon={<Icons.ArrowLeft size={20} />} title="Search Manhwa" />

      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Icons.MagnifyingGlass size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search manhwa..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
              autoCapitalize="none"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Icons.X size={20} color="#666" />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}
            disabled={isLoading || !searchQuery.trim()}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Typography style={styles.searchButtonText}>Search</Typography>
            )}
          </TouchableOpacity>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Typography style={styles.errorText}>{error}</Typography>
          </View>
        )}

        {results.length > 0 ? (
          <>
            <FlatList
              data={results}
              renderItem={renderManhwaItem}
              keyExtractor={(item, index) => `${item.title}-${index}`}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.resultsList}
              ListFooterComponent={
                <View style={styles.paginationContainer}>
                  <TouchableOpacity
                    style={[
                      styles.paginationButton,
                      currentPage === 1 && styles.disabledButton,
                    ]}
                    onPress={goToPrevPage}
                    disabled={currentPage === 1 || isLoading}
                  >
                    <Icons.CaretLeft
                      size={16}
                      color={currentPage === 1 ? "#AAA" : "#FFF"}
                    />
                    <Typography style={styles.paginationButtonText}>
                      Previous
                    </Typography>
                  </TouchableOpacity>

                  <Typography style={styles.pageIndicator}>
                    Page {currentPage}{" "}
                    {totalPages > 1 ? `of ${totalPages}` : ""}
                  </Typography>

                  <TouchableOpacity
                    style={[
                      styles.paginationButton,
                      !hasNextPage && styles.disabledButton,
                    ]}
                    onPress={goToNextPage}
                    disabled={!hasNextPage || isLoading}
                  >
                    <Typography style={styles.paginationButtonText}>
                      Next
                    </Typography>
                    <Icons.CaretRight
                      size={16}
                      color={!hasNextPage ? "#AAA" : "#FFF"}
                    />
                  </TouchableOpacity>
                </View>
              }
            />
          </>
        ) : (
          <View style={styles.emptyContainer}>
            {!isLoading && searchQuery.trim() ? (
              <>
                <Icons.MagnifyingGlass size={48} color="#ccc" />
                <Typography style={styles.emptyText}>
                  No manhwa found for "{searchQuery}"
                </Typography>
                <Typography style={styles.emptySubtext}>
                  Try a different search term
                </Typography>
              </>
            ) : !isLoading ? (
              <>
                <Icons.MagnifyingGlass size={48} color="#ccc" />
                <Typography style={styles.emptyText}>
                  Search for your favorite manhwa
                </Typography>
                <Typography style={styles.emptySubtext}>
                  Enter a title or keywords above
                </Typography>
              </>
            ) : null}
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    marginLeft: 8,
    color: "#333",
  },
  searchButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  searchButtonText: {
    color: "#fff",
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: 14,
  },
  resultsList: {
    paddingBottom: 16,
  },
  resultItem: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  manhwaImage: {
    width: 70,
    height: 100,
    borderRadius: 4,
  },
  manhwaInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  manhwaTitle: {
    fontSize: 16,
    fontFamily: fonts.PoppinsSemiBold,
    color: "#333",
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  manhwaChapter: {
    fontSize: 14,
    color: "#666",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  manhwaRating: {
    fontSize: 14,
    fontFamily: fonts.PoppinsMedium,
    color: "#333",
    marginLeft: 4,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  paginationButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  disabledButton: {
    backgroundColor: "#e0e0e0",
  },
  paginationButtonText: {
    color: "#fff",
    fontFamily: fonts.PoppinsMedium,
    fontSize: 14,
    marginHorizontal: 4,
  },
  pageIndicator: {
    fontSize: 14,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    fontFamily: fonts.PoppinsMedium,
    color: "#666",
    marginTop: 16,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
    textAlign: "center",
  },
  errorContainer: {
    padding: 12,
    backgroundColor: "#FFEBEE",
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: "#D32F2F",
    fontSize: 14,
  },
});
