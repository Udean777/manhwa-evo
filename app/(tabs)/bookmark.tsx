import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { getBookmarks } from "@/services/bookmarkService";
import Loading from "@/components/Loading";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import { colors, fonts } from "@/constants/theme";
import ManhwaCard from "@/components/ManhwaCard";
import { ManhwaOngoingProps } from "@/utils/types";
import Typography from "@/components/Typography";
import { useFocusEffect } from "expo-router";

const Page = () => {
  const { user } = useAuth();
  const [bookmarkedManhwa, setBookmarkedManhwa] = useState<
    ManhwaOngoingProps[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookmarks = useCallback(() => {
    if (user) {
      getBookmarks(user, setBookmarkedManhwa, setIsLoading);
    } else {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  useFocusEffect(
    useCallback(() => {
      fetchBookmarks();
    }, [fetchBookmarks])
  );

  const handleBookmarkChange = useCallback(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  if (isLoading) return <Loading />;

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title="Bookmarks" />

        {bookmarkedManhwa.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Typography
              size={16}
              fontFamily={fonts.PoppinsMedium}
              color={colors.neutral700}
              style={styles.emptyText}
            >
              Belum ada bookmark.
            </Typography>
          </View>
        ) : (
          <FlatList
            data={bookmarkedManhwa}
            keyExtractor={(item, index) => `${item.title}-${index}`}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ManhwaCard
                imageUrl={item.imageUrl}
                latestChapter={item.latestChapter}
                link={item.link}
                rating={item.rating}
                title={item.title}
                onBookmarkChange={handleBookmarkChange}
              />
            )}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
  },
  columnWrapper: {
    justifyContent: "center",
    gap: 20,
    paddingLeft: 5,
    marginBottom: 10,
  },
});
