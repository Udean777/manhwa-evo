import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
  TextInput,
  Keyboard,
  Text,
} from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typography from "@/components/Typography";
import Header from "@/components/Header";
import { colors, fonts, radius, spacingX, spacingY } from "@/constants/theme";
import * as Icons from "phosphor-react-native";
import useManhwaSearch from "@/hooks/useSearch";
import ManhwaCard from "@/components/ManhwaCard";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { scale } from "@/utils/style";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import BottomSheet from "@/components/BottomSheet";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [
    { results, isLoading, error, currentPage, totalPages, hasNextPage },
    { search, goToNextPage, goToPrevPage },
  ] = useManhwaSearch();

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  const handleFilterPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    Keyboard.dismiss();
    search(searchQuery);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error onRefresh={() => {}} error={error} />;
  }

  return (
    <ScreenWrapper>
      <Header leftIcon={<Icons.ArrowLeft size={20} />} title="Cari Manhwa" />

      <View style={styles.container}>
        <View style={styles.searchShadowContainer}>
          <View style={styles.innerShadow} />
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Icons.MagnifyingGlass size={20} color="#666" />
              <TextInput
                style={styles.searchInput}
                placeholder="Cari manhwa..."
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
            <Pressable
              style={styles.searchButton}
              onPress={handleFilterPress}
              // disabled={isLoading || !searchQuery.trim()}
            >
              <Icons.SlidersHorizontal
                size={20}
                color={colors.neutral900}
                weight="fill"
              />
            </Pressable>
            <Pressable
              style={styles.searchButton}
              onPress={handleSearch}
              disabled={isLoading || !searchQuery.trim()}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Typography
                  size={14}
                  color={colors.neutral800}
                  fontFamily={fonts.PoppinsSemiBold}
                >
                  Cari
                </Typography>
              )}
            </Pressable>
          </View>
        </View>

        <FlatList
          data={results}
          renderItem={({ item }) => (
            <ManhwaCard
              title={item.title}
              imageUrl={item.image}
              latestChapter={item.latestChapter}
              link={item.url}
              rating={item.rating}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              {!isLoading && searchQuery.trim() ? (
                <>
                  <Icons.MagnifyingGlass size={48} color="#ccc" />
                  <Typography style={styles.emptyText}>
                    Gaada manhwa yang di temukan untuk judul "{searchQuery}"
                  </Typography>
                  <Typography style={styles.emptySubtext}>
                    Coba cari judul lain ya.
                  </Typography>
                </>
              ) : !isLoading ? (
                <>
                  <Icons.MagnifyingGlass size={48} color="#ccc" />
                  <Typography style={styles.emptyText}>
                    Cari manhwa favorite kamu
                  </Typography>
                  <Typography style={styles.emptySubtext}>
                    Masukkan judul manhwa yang ingin kamu cari
                  </Typography>
                </>
              ) : null}
            </View>
          }
          keyExtractor={(item, index) => `${item.title}-${index}`}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "center",
            gap: 20,
            paddingRight: 5,
            paddingLeft: 5,
            marginBottom: 10,
          }}
          style={{
            marginTop: 8,
            paddingBottom: 80,
          }}
          ListFooterComponent={
            results.length > 0 ? (
              <View style={styles.paginationShadowContainer}>
                <View style={styles.paginationInnerShadow} />
                <View style={styles.paginationContainer}>
                  <Pressable
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
                      Sebelumnya
                    </Typography>
                  </Pressable>

                  <Typography style={styles.pageIndicator}>
                    {currentPage} {totalPages > 1 ? `- ${totalPages}` : ""}
                  </Typography>

                  <Pressable
                    style={[
                      styles.paginationButton,
                      !hasNextPage && styles.disabledButton,
                    ]}
                    onPress={goToNextPage}
                    disabled={!hasNextPage || isLoading}
                  >
                    <Typography style={styles.paginationButtonText}>
                      Selanjutnya
                    </Typography>
                    <Icons.CaretRight
                      size={16}
                      color={!hasNextPage ? "#AAA" : "#FFF"}
                    />
                  </Pressable>
                </View>
              </View>
            ) : null
          }
        />
      </View>

      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
        <BottomSheetView>
          <Text>Hello</Text>
        </BottomSheetView>
      </BottomSheet>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  searchShadowContainer: {
    position: "relative",
    marginBottom: 16,
  },
  innerShadow: {
    position: "absolute",
    top: scale(8),
    left: scale(8),
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
  searchButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: colors.neutral900,
    marginRight: 5,
  },
  searchButtonText: {
    color: "#fff",
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: 14,
  },
  columnWrapper: {
    justifyContent: "flex-start",
    gap: 20,
    paddingRight: 5,
    marginBottom: 10,
  },
  paginationShadowContainer: {
    position: "relative",
    marginTop: 16,
  },
  paginationInnerShadow: {
    position: "absolute",
    top: scale(4),
    left: scale(4),
    right: scale(-2),
    bottom: scale(-2),
    backgroundColor: colors.black,
    borderRadius: radius._10 || 12,
    zIndex: 1,
    opacity: 0.1, // Memberikan efek shadow lebih halus
  },
  paginationContainer: {
    position: "relative",
    zIndex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: radius._12 || 14,
    borderWidth: scale(2),
    borderColor: "#1a1a1a",
    paddingVertical: 10,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  paginationButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    minWidth: 120,
    justifyContent: "center",
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
  disabledButtonText: {
    color: "#999", // Warna teks lebih kontras untuk tombol disabled
  },
  pageIndicator: {
    fontSize: 14,
    color: "#444",
    fontFamily: fonts.PoppinsMedium,
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
});
