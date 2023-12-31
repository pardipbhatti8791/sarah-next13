import { useStore } from "@/store/store";
import {
  getCharacterParams,
  getUploadParams,
} from "@/store/storyCharacter/storyCharacterInterface";
import { getStoryParams } from "@/store/storyTheme/storyThemeInterface";
import axios, { AxiosInstance } from "axios";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";

const unauthorizedCode = [401];
export const BASE_URL = "https://talez.gpcoders.dev/api/v1";

// "http://localhost:3015/api/v1";

// @ts-ignore
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // baseURL: "https://talez.gpcoders.dev/api/v1/",
});

axiosInstance.interceptors?.request.use(
  (config: any) => {
    const accessToken = useStore.getState().token;
    console.log("accessToken", accessToken);

    if (accessToken) {
      config.headers["Authorization"] = `${"Bearer "}${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors?.response.use(
  (response: any) => response,
  (error: any) => {
    const { response } = error;

    if (response && unauthorizedCode.includes(response.status)) {
      // signout logic here;
      toast.error("Valid authorization required to perform this action");
      signOut();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

export const URI = {
  auth: "/signin",
  storyThemes: {
    updateStoryTheme: (id: number) => `/story-theme/edit/${id}`,
    getStoryThemes: ({ page, limit }: getStoryParams) =>
      `/story-themes/?page=${page}&limit=${limit}`,
  },
  createStoryTheme: "/story-theme/create",
  deleteStoryTheme: (id: number) => `/delete-story-themes/${id}`,

  StoryCharacter: {
    getStoryCharacter: ({ page, limit }: getCharacterParams) =>
      `/story-characters?page=${page}&limit=${limit}`,
    createBackground: "/characters-background/create",
    uploadAttachment: "/media/upload",
    getAllAttachment: ({ type, page }: getUploadParams) =>
      `/media/${type}/${page}`,
    character: "/story-characters-mobile?id=0",
    background: "/story-backgrounds-mobile?id=1",
    updateCharacter: (id: number) => `/story-characters/edit/${id}`,
    deleteCharacter: (id: number) => `/delete-story-character/${id}`,
  },
  Users: {
    getAllUsers: "/users/all",
    inActiveUsers: "/user-inactive-count",
    activeUsers: "/user-active-count",
    updateUsersByAdmin: (id: number) => `/users/edit-user-by-admin/${id}`,
    deleteUser: (id: number) => `/delete-user/${id}`,
    deleteUsersMany: (ids: string) => `/users/delete-user-many/${ids}`,
  },
  storyModuleAdmin: {
    getAllStoryModuleAdmin: (user_id: number) =>
      `/all-stories-admin/${user_id}`,
    deleteStory: (id: number) => `/story/story-delete?id=${id}`,
  },
};
