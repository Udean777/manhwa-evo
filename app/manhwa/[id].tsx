import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors, fonts, spacingX } from "@/constants/theme";
import { Link, useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import * as Icons from "phosphor-react-native";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import useFetchData from "@/hooks/useFetchData";
import { ManhwaDetail, ManhwaOngoingProps } from "@/utils/types";
import { scale } from "@/utils/style";
import Genres from "../../components/Genres";
import ManhwaHeader from "../../components/ManhwaHeader";
import {
  AlternativeTitles,
  AuthorArtist,
  Synopsis,
} from "../../components/Common";
import Typography from "@/components/Typography";
import { auth } from "@/config/firebase";
import {
  addBookmark,
  checkBookMark,
  removeBookmark,
} from "@/services/bookmarkService";
import { useAuth } from "@/context/authContext";

const Details = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { user } = useAuth();

  const {
    data: manhwaDetail,
    error,
    isLoading,
  } = useFetchData<ManhwaDetail | null>(`/api/manhwa-detail/${id}`);

  // console.log("Manhwa id:", JSON.stringify(id, null, 2));

  // Convert data manhwa detail menjadi manhwa ongoing karna struktur datanya berbeda
  const convertManhwaData = (manhwa: ManhwaDetail): ManhwaOngoingProps => {
    return {
      title: manhwa.title,
      imageUrl: manhwa.imageSrc,
      link: `https://komikstation.co/manga/${id}`,
      latestChapter:
        manhwa.chapters.length > 0 ? manhwa.chapters[0].chapterNum : "N/A",
      rating: manhwa.rating,
    };
  };

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      if (!user || !id) return;

      await checkBookMark(user, id, setIsBookmarked);
    };

    fetchBookmarkStatus();
  }, [id]);

  const handleBookmark = async () => {
    if (!manhwaDetail) {
      console.error("Invalid manhwa ID");
      return;
    }

    const ongoingManhwa = convertManhwaData(manhwaDetail);

    if (isBookmarked) {
      await removeBookmark(id);
    } else {
      await addBookmark(ongoingManhwa);
    }

    setIsBookmarked((prev) => !prev);
  };

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
          paddingBottom: 85,
        }}
      >
        <ManhwaHeader manhwaDetail={manhwaDetail} />
        <AuthorArtist manhwaDetail={manhwaDetail} />
        <AlternativeTitles manhwaDetail={manhwaDetail} />
        <Synopsis manhwaDetail={manhwaDetail} />
        <Genres manhwaDetail={manhwaDetail} />
        {/* <SectionCard bgColor={colors.pastelTeal}>
          <ListChapter manhwaDetail={manhwaDetail} manhwaId={id} />
        </SectionCard> */}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.bookmarkContainer} onPress={handleBookmark}>
          <Icons.BookmarkSimple
            size={scale(24)}
            color={colors.neutral900}
            weight={isBookmarked ? "fill" : "regular"}
          />
        </Pressable>
        <Link href={`/manhwa/${id}/all_chapters`} asChild>
          <Pressable style={styles.readButton}>
            <Typography
              size={18}
              color={colors.neutral900}
              fontFamily={fonts.PoppinsBold}
            >
              Baca Sekarang
            </Typography>
          </Pressable>
        </Link>
      </View>
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
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.neutral100,
    flexDirection: "row",
    alignItems: "center",
    padding: scale(12),
  },
  bookmarkContainer: {
    backgroundColor: "rgba(55, 55, 55, 0.1)",
    padding: scale(10),
    borderRadius: scale(8),
    marginRight: scale(10),
  },
  readButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: scale(10),
    borderRadius: scale(8),
    alignItems: "center",
  },
});
