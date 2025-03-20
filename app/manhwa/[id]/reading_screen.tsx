import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fonts } from "@/constants/theme";
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
  const router = useRouter();
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

  const handlePrevChapter = () => {
    if (chapterData?.prevChapter) {
      router.push({
        pathname: "/reading_screen",
        params: { id: chapterData.prevChapter },
      });
    }
  };

  const handleNextChapter = () => {
    if (chapterData?.nextChapter) {
      router.push({
        pathname: "/reading_screen",
        params: { id: chapterData.nextChapter },
      });
    }
  };

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
            <ActivityIndicator size="large" color="#0286FF" />
            <Typography style={styles.loadingText}>Loading image...</Typography>
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
              <TouchableOpacity
                style={[
                  styles.navButton,
                  !chapterData?.prevChapter && styles.disabledButton,
                ]}
                onPress={handlePrevChapter}
                disabled={!chapterData?.prevChapter}
              >
                <Icons.ArrowLeft
                  size={24}
                  color={chapterData?.prevChapter ? "#FFF" : "#AAA"}
                />
                <Typography style={styles.navButtonText}>Sebelumnya</Typography>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.navButton,
                  !chapterData?.nextChapter && styles.disabledButton,
                ]}
                onPress={handleNextChapter}
                disabled={!chapterData?.nextChapter}
              >
                <Typography style={styles.navButtonText}>
                  Selanjutnya
                </Typography>
                <Icons.ArrowRight
                  size={24}
                  color={chapterData?.nextChapter ? "#FFF" : "#AAA"}
                />
              </TouchableOpacity>
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
    backgroundColor: "#0286FF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 120,
  },
  disabledButton: {
    backgroundColor: "#333",
  },
  navButtonText: {
    color: "#FFFFFF",
    marginHorizontal: 8,
    fontSize: 16,
    fontFamily: fonts.PoppinsSemiBold,
  },
});
