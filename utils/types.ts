import { ViewStyle } from "react-native";

export type ImageUploadProps = {
  file?: any;
  onSelect: (file: any) => void;
  onClear: () => void;
  containerStyle?: ViewStyle;
  imageStyle?: ViewStyle;
  placeholder?: string;
};

export type accountOptionType = {
  title: string;
  icon: React.ReactNode;
  bgColor: string;
  routeName?: any;
};

export type UserType = {
  uid?: string;
  email?: string | null;
  username: string | null;
  image?: any;
} | null;

export type UserDataType = {
  name: string;
  image?: any;
};

export type ResponseType = {
  success: boolean;
  data?: any;
  msg?: string;
};

export type ManhwaProps = {
  title: string;
  chapter: string;
  rating: string;
  imageSrc: string;
  link: string;
};

export type ManhwaOngoingProps = {
  title: string;
  imageUrl: string;
  link: string;
  latestChapter: string;
  rating: string;
};

export interface ManhwaDetail {
  id: string;
  title: string;
  imageSrc: string;
  rating: string;
  followedBy: string;
  status: string;
  type: string;
  released: string;
  updatedOn: string;
  author: string;
  artist: string;
  alternative: string;
  synopsis: string;
  genres: { genreName: string }[];
  chapters: { chapterNum: string; chapterDate: string; chapterLink: string }[];
}
