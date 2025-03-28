import { colors } from "@/constants/theme";
import { useMemo } from "react";

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Selamat Pagi!";
  if (hour < 15) return "Selamat Siang!";
  if (hour < 18) return "Selamat Sore!";
  return "Selamat Malam!";
};

export const getChapterId = (url: string) => {
  if (!url) return "";

  const path = url.replace("https://komikstation.co/", "");

  return path.endsWith("/") ? path.slice(0, -1) : path;
};

export const getManhwaId = (link: string) => {
  const linkParts = link?.split("/");
  const mangaIndex = linkParts?.indexOf("manga");

  return mangaIndex !== -1 && mangaIndex + 1 < linkParts?.length
    ? linkParts[mangaIndex + 1]
    : null;
};
