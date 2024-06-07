import { Models } from "react-native-appwrite/src";

type UserType = Models.Document & {
  accountId: string;
  username: string;
  email: string;
  avatar: string;
};

type VideoType = Models.Document & {
  title: string;
  thumbnail: string;
  prompt: string;
  video: string;
  users: UserType;
};
