import { StateCreator } from "zustand";
import { IStoryModuleRoot } from "./storyModuleInterface";
import StoriesModuleService from "@/services/StoriesModuleService";
import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";

export const allStoriesModuleSlice: StateCreator<
  IStoryModuleRoot,
  [],
  [],
  IStoryModuleRoot
> = (set) => ({
  allStoriesAdmin: [],
  allStoriesAdminLoading: false,
  getAllStoryModule: async ({ user_id }) => {
    set(() => ({ allStoriesAdminLoading: true }));
    try {
      const resp = await StoriesModuleService.AllStoriesAdmin({ user_id });

      set(() => ({
        allStoriesAdmin: resp.data,
        allStoriesAdminLoading: false,
      }));
    } catch (error: any) {
      set(() => ({ allStoriesAdminLoading: false }));
      if (error.response.data === 401) {
        toast.error("Unauthorized request!, Signing you out");
        signOut();
      } else {
        toast.error(JSON.stringify(error.response.data));
      }
    }
  },
});
