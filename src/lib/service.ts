import { useStore } from "@/store/store";
import { getStoryParams } from "@/store/storyTheme/storyThemeInterface";
import axios, { AxiosInstance } from "axios";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";

const unauthorizedCode = [401];
export const BASE_URL = "http://localhost:3015/api/v1";

// @ts-ignore
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // baseURL: "https://rvacbc.gpcoders.dev",
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
    getStoryThemes: ({ page, limit }: getStoryParams) =>
      `/story-themes/?page=${page}&limit=${limit}`,
  },
};
