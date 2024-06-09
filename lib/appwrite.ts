import { UserType, VideoType } from "@/appwrite";
import { SignInSchemaType } from "@/schemas/SignIn";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite/src";

type UserAuthType = {
  username: string;
  email: string;
  password: string;
};

export const appWriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.mayushi_23333.aora",
  projectId: "664390c7000aeed69059",
  databaseId: "6643921900026f146384",
  userCollectionId: "6643924700332bea6907",
  videoCollectionId: "664392620032fb7205e8",
  storageId: "664393ce002c7eeeff7d",
};

// Init your React Native SDK
const client = new Client();
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

client
  .setEndpoint(appWriteConfig.endpoint)
  .setProject(appWriteConfig.projectId)
  .setPlatform(appWriteConfig.platform);

// Register User
export const createUser = async ({
  username,
  email,
  password,
}: UserAuthType) => {
  try {
    const userAcc = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!userAcc) throw Error("Error in creating the new user");

    const avatarUrl = avatars.getInitials(username);

    await signIn({ email, password });

    const newUser = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: userAcc.$id,
        username,
        email,
        avatar: avatarUrl,
      }
    );

    return newUser as UserType;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }
};

export async function signIn({ email, password }: SignInSchemaType) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function signOut() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) {
      throw new Error("Account not found");
    }

    const currentUser = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw new Error("User not found");
    return currentUser.documents[0] as UserType;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllVideos() {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videoCollectionId
    );

    return posts.documents as VideoType[];
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getLatestVideos() {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents as VideoType[];
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export async function searchVideos(query: string) {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.search("title", query)]
    );

    return posts.documents as VideoType[];
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getUserVideos(userId: string) {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videoCollectionId,
      [Query.equal("users", userId)]
    );

    return posts.documents as VideoType[];
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
