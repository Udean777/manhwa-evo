import { auth, firestore } from "@/config/firebase";
import { ManhwaOngoingProps, UserType } from "@/utils/types";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { Dispatch } from "react";
import { getManhwaId } from "@/utils/common";

const db = getFirestore();

export const checkBookMark = async (
  user: UserType | null,
  manhwaId: string | null,
  setIsBookmarked: Dispatch<React.SetStateAction<boolean>>
) => {
  if (!user?.uid || !manhwaId) return;

  try {
    const bookmarkRef = doc(db, "users", user.uid, "bookmarks", manhwaId);
    const bookmarkSnap = await getDoc(bookmarkRef);

    setIsBookmarked(bookmarkSnap.exists());
  } catch (error) {
    console.error("Error checking bookmark:", error);
  }
};

export const addBookmark = async (manhwa: ManhwaOngoingProps) => {
  try {
    const user = auth.currentUser;
    if (!user) return;

    const manhwaId = getManhwaId(manhwa.link);
    if (!manhwaId) {
      console.error("Invalid manhwa ID");
      return;
    }

    const bookmarkRef = doc(db, "users", user.uid, "bookmarks", manhwaId);

    await setDoc(bookmarkRef, {
      title: manhwa.title,
      imageUrl: manhwa.imageUrl,
      link: manhwa.link,
      latestChapter: manhwa.latestChapter,
      rating: manhwa.rating,
      addedAt: serverTimestamp(),
    });

    // console.log("Bookmark berhasil ditambahkan!");
    return true;
  } catch (error) {
    console.error("Gagal menambahkan bookmark:", error);
    return false;
  }
};

export const removeBookmark = async (manhwaId: string) => {
  try {
    const user = auth.currentUser;
    if (!user) return false;

    const bookmarkRef = doc(db, "users", user.uid, "bookmarks", manhwaId);
    await deleteDoc(bookmarkRef);

    // console.log("Bookmark berhasil dihapus!");
    return true;
  } catch (error) {
    console.error("Gagal menghapus bookmark:", error);
    return false;
  }
};

export const getBookmarks = async (
  user: UserType | null,
  setBookmarkedManhwa: Dispatch<React.SetStateAction<ManhwaOngoingProps[]>>,
  setIsLoading: Dispatch<React.SetStateAction<boolean>>
) => {
  if (!user) return;

  try {
    setIsLoading(true);
    const bookmarksCollection = collection(db, "users", user.uid!, "bookmarks");
    const bookmarkSnapshot = await getDocs(bookmarksCollection);

    const bookmarks = bookmarkSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as unknown as ManhwaOngoingProps[];

    setBookmarkedManhwa(bookmarks);
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
  } finally {
    setIsLoading(false);
  }
};
