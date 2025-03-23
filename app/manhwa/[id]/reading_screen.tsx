import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Pressable,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { colors, fonts } from "@/constants/theme";
import { Image } from "expo-image";
import Typography from "@/components/Typography";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import * as Icons from "phosphor-react-native";
import useFetchData from "@/hooks/useFetchData";
import { getChapterId } from "@/utils/common";

interface ChapterData {
  title: string;
  images: string[];
  prevChapter: string | null;
  nextChapter: string | null;
}

const { width } = Dimensions.get("window");

const Page = () => {
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [imageDimensions, setImageDimensions] = useState<
    Record<number, { width: number; height: number }>
  >({});
  const { id } = useLocalSearchParams<{ id: string }>();
  const flatListRef = useRef<FlatList>(null);
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);

  const {
    data: chapterData,
    isLoading,
    error,
  } = useFetchData<ChapterData | null>(`/api/chapter/${getChapterId(id)}`);

  const prefetchImage = (index: number[]) => {
    if (!chapterData?.images) return;

    for (let i = 0; i < 5; i++) {
      const nextIndex = Math.max(...index) + i + 1;

      if (nextIndex < chapterData.images.length) {
        Image.prefetch(chapterData.images[nextIndex]);
      }
    }
  };

  useEffect(() => {
    // fetchChapterData();

    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: false });
    }
  }, [id]);

  useEffect(() => {
    if (visibleIndexes.length > 0) {
      prefetchImage(visibleIndexes);
    }
  }, [visibleIndexes]);

  const handleImageLoad = (index: number, event: any) => {
    const { width: naturalWidth, height: naturalHeight } = event.source;

    setImageDimensions((prev) => ({
      ...prev,
      [index]: { width: naturalWidth, height: naturalHeight },
    }));

    setLoadedImages((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  const handleViewableItemsChanged = ({ viewableItems }: any) => {
    const indexes = viewableItems.map((item: any) => item.index);

    setVisibleIndexes(indexes.filter((index: number) => index !== null));
  };

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    const dimensions = imageDimensions[index];
    const calculatedHeight = dimensions
      ? (width * dimensions.height) / dimensions.width
      : width * 1.5;

    return (
      <View style={styles.imageContainer}>
        {!loadedImages[index] && (
          <View style={[styles.loadingOverlay, { height: calculatedHeight }]}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Typography style={styles.loadingText}>Memuat gambar...</Typography>
          </View>
        )}

        <Image
          source={{ uri: item }}
          style={[styles.chapterImage, { height: calculatedHeight }]}
          transition={300}
          contentFit="cover"
          cachePolicy="memory-disk"
          onLoad={(e) => handleImageLoad(index, e)}
          placeholderContentFit="cover"
          placeholder={{ uri: item }}
        />
      </View>
    );
  };

  const keyExtractor = (_: string, index: number) => `image-${index}`;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 10,
    minimumViewTime: 100,
  };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged: handleViewableItemsChanged },
  ]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Error
        onRefresh={() => {
          // setError(null);
          // setIsLoading(true);
          // fetchChapterData();
        }}
        error={error}
      />
    );
  }

  return (
    <ScreenWrapper>
      <Header
        leftIcon={<Icons.ArrowLeft size={20} />}
        title={chapterData?.title}
      />

      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={chapterData?.images}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={true}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          updateCellsBatchingPeriod={50}
          windowSize={7}
          removeClippedSubviews={false}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          onEndReachedThreshold={0.5}
          onEndReached={() => prefetchImage(visibleIndexes)}
          maintainVisibleContentPosition={{
            minIndexForVisible: 0,
            autoscrollToTopThreshold: 10,
          }}
          ListFooterComponent={
            <View style={styles.navigationContainer}>
              {chapterData?.prevChapter && (
                <Link
                  href={`/manhwa/${getChapterId(
                    chapterData?.prevChapter
                  )}/reading_screen`}
                  asChild
                  style={[
                    styles.navButton,
                    !chapterData?.prevChapter && styles.disabledButton,
                  ]}
                >
                  <Pressable disabled={!chapterData?.prevChapter}>
                    <Icons.ArrowLeft
                      size={20}
                      color={
                        chapterData?.prevChapter ? colors.neutral900 : "#AAA"
                      }
                    />
                    <Typography style={styles.navButtonText}>
                      Sebelumnya
                    </Typography>
                  </Pressable>
                </Link>
              )}

              {chapterData?.nextChapter && (
                <Link
                  href={`/manhwa/${getChapterId(
                    chapterData.nextChapter
                  )}/reading_screen`}
                  asChild
                  style={[
                    styles.navButton,
                    !chapterData?.nextChapter && styles.disabledButton,
                  ]}
                >
                  <Pressable disabled={!chapterData?.nextChapter}>
                    <Typography style={styles.navButtonText}>
                      Selanjutnya
                    </Typography>
                    <Icons.ArrowRight
                      size={20}
                      color={
                        chapterData?.nextChapter ? colors.neutral900 : "#AAA"
                      }
                    />
                  </Pressable>
                </Link>
              )}
            </View>
          }
        />
      </View>
    </ScreenWrapper>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  imageContainer: {
    width: width,
    alignItems: "center",
    justifyContent: "center",
  },
  chapterImage: {
    width: width,
    backgroundColor: "#111",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  loadingText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 8,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    marginBottom: 20,
    backgroundColor: "#000",
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 120,
  },
  disabledButton: {
    backgroundColor: "#333",
  },
  navButtonText: {
    color: colors.neutral900,
    marginHorizontal: 8,
    fontSize: 16,
    fontFamily: fonts.PoppinsSemiBold,
  },
});
