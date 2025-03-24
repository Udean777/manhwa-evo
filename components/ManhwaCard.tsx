import { StyleSheet, View, Pressable } from "react-native";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Image } from "expo-image";
import Typography from "./Typography";
import { colors, fonts } from "@/constants/theme";
import { Link } from "expo-router";
import { scale } from "@/utils/style";
import { getManhwaId } from "@/utils/common";
import { useAuth } from "@/context/authContext";
import * as Icons from "phosphor-react-native";
import {
  addBookmark,
  checkBookMark,
  removeBookmark,
} from "@/services/bookmarkService";

const ManhwaCard = ({
  imageUrl,
  title,
  latestChapter,
  rating,
  link,
  onBookmarkChange,
}: {
  imageUrl: string;
  latestChapter: string;
  title: string;
  rating: string;
  link: string;
  onBookmarkChange?: () => void;
}) => {
  const { user } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const manhwa = { imageUrl, title, latestChapter, rating, link };

  const backgroundColors = [
    colors.green,
    colors.pastelLavender,
    colors.rose,
    colors.pastelTeal,
  ];

  const randomColor = useMemo(
    () => backgroundColors[Math.floor(Math.random() * backgroundColors.length)],
    []
  );

  const manhwaId = getManhwaId(link);

  const fetchBookmarkStatus = useCallback(async () => {
    if (user && manhwaId) {
      await checkBookMark(user, manhwaId, setIsBookmarked);
    }
  }, [user, manhwaId]);

  useEffect(() => {
    fetchBookmarkStatus();
  }, [fetchBookmarkStatus]);

  const handleBookmarkPress = async () => {
    if (!user || !manhwaId || isProcessing) return;

    try {
      setIsProcessing(true);

      if (isBookmarked) {
        const success = await removeBookmark(manhwaId);
        if (success) {
          setIsBookmarked(false);
          if (onBookmarkChange) onBookmarkChange();
        }
      } else {
        const success = await addBookmark(manhwa);
        if (success) {
          setIsBookmarked(true);
          if (onBookmarkChange) onBookmarkChange();
        }
      }
    } catch (error) {
      console.error("Error handling bookmark: ", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.innerShadow} />
      <View style={[styles.card, { backgroundColor: randomColor }]}>
        <Image
          source={{
            uri: imageUrl || "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
          }}
          style={styles.image}
          contentFit={"cover"}
        />

        <Pressable
          style={[
            styles.bookmarkButton,
            isProcessing && styles.bookmarkButtonDisabled,
          ]}
          onPress={handleBookmarkPress}
          disabled={isProcessing}
        >
          <Icons.BookmarkSimple
            size={20}
            color={colors.black}
            weight={isBookmarked ? "fill" : "regular"}
          />
        </Pressable>

        <View style={styles.contentContainer}>
          <Typography
            size={14}
            fontFamily={fonts.PoppinsBold}
            textProps={{ numberOfLines: 1, ellipsizeMode: "tail" }}
          >
            {title}
          </Typography>

          <View style={styles.infoContainer}>
            <View style={styles.chapterContainer}>
              <Typography size={12} fontFamily={fonts.PoppinsSemiBold}>
                {latestChapter}
              </Typography>
            </View>

            <View style={styles.ratingContainer}>
              <Typography
                size={12}
                color={colors.primary}
                fontFamily={fonts.PoppinsSemiBold}
              >
                ⭐ {rating}
              </Typography>
            </View>
          </View>
        </View>

        <Link href={`/manhwa/${manhwaId}`} asChild>
          <Pressable style={styles.actionButton}>
            <View style={styles.buttonShadow} />
            <View style={styles.buttonContent}>
              <Typography
                size={12}
                color={colors.neutral900}
                fontFamily={fonts.PoppinsSemiBold}
              >
                Baca Sekarang
              </Typography>
            </View>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

export default ManhwaCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: "45%",
    marginBottom: 20,
    position: "relative",
  },
  innerShadow: {
    position: "absolute",
    top: scale(8),
    left: scale(8),
    right: scale(-4),
    bottom: scale(-4),
    backgroundColor: colors.neutral900,
    borderRadius: scale(10),
    zIndex: 1,
  },
  card: {
    zIndex: 2,
    position: "relative",
    width: "100%",
    borderRadius: scale(10),
    padding: scale(5),
    borderWidth: scale(2),
    borderColor: "#1a1a1a",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: scale(8),
    borderWidth: scale(2),
    borderColor: "#1a1a1a",
  },
  contentContainer: {
    gap: scale(5),
    marginTop: 10,
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
  },
  chapterContainer: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: scale(6),
    paddingVertical: 2,
    borderRadius: scale(4),
    borderWidth: scale(1),
    borderColor: "#1a1a1a",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.neutral500,
    paddingHorizontal: scale(6),
    paddingVertical: 2,
    borderRadius: scale(4),
    borderWidth: scale(1),
    borderColor: "#1a1a1a",
  },
  actionButton: {
    position: "relative",
    width: "100%",
    borderRadius: scale(8),
  },
  buttonShadow: {
    position: "absolute",
    top: scale(4),
    left: scale(4),
    right: scale(-2),
    bottom: scale(-2),
    backgroundColor: colors.neutral900,
    borderRadius: scale(8),
    zIndex: 1,
  },
  buttonContent: {
    position: "relative",
    zIndex: 2,
    backgroundColor: colors.primary,
    paddingVertical: 8,
    borderRadius: scale(8),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: scale(2),
    borderColor: "#1a1a1a",
  },
  bookmarkButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 20,
    padding: 5,
    zIndex: 3,
  },
  bookmarkButtonDisabled: {
    opacity: 0.5,
  },
});
