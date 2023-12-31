import { StateCreator } from "zustand";
import { IStoryThemeInterface } from "./storyThemeInterface";
import { toast } from "react-hot-toast";
import StoryThemesService from "@/services/StoryThemesService";
import { useStore } from "../store";
import { signOut } from "next-auth/react";

export const storyThemeSlice: StateCreator<
  IStoryThemeInterface,
  [],
  [],
  IStoryThemeInterface
> = (set) => ({
  storyThemeLoading: false,
  storyThemes: {
    rows: [
      {
        id: 0,
        title: "",
        description: "",
        themeType: { value: "", label: "" },
      },
    ],
    pageCount: 1,
    count: 0,
  },
  getStoryThemes: async ({ page, limit }) => {
    set(() => ({ storyThemeLoading: true }));
    try {
      const resp: any = await StoryThemesService.getStoryThemes({
        page,
        limit,
      });
      set(() => ({ storyThemes: resp.data, storyThemeLoading: false }));
    } catch (error: any) {
      set(() => ({ storyThemeLoading: false }));
      toast.error(JSON.stringify(error.response.data));
    }
  },

  createStoryThemeLoading: false,
  createStoryTheme: async (fn) => {
    const tid = toast.loading("Creating new Story...");
    set(() => ({ createStoryThemeLoading: true }));
    try {
      await StoryThemesService.createStoryTheme(fn);
      set(() => ({ createStoryThemeLoading: false }));
      useStore.getState().getStoryThemes({ page: 1, limit: 10 });
      toast.dismiss(tid);
    } catch (error: any) {
      toast.error(JSON.stringify(error.res), {
        id: tid,
      });
      set(() => ({ createStoryThemeLoading: false }));
    }
  },
  updateStoryTheme: async ({ id }, data, redirect) => {
    const tid = toast.loading("Updating....");
    try {
      await StoryThemesService.updateStoryTheme({ id }, data);

      toast.success("Updated Successfully!", {
        id: tid,
      });
      redirect.push("/dashboard/story-theme");
    } catch (error: any) {
      if (error.response.status === 401) {
        toast.error("Unauthorized request !, Signing you out!");
        signOut();
      } else {
        toast.error(JSON.stringify(error.response.data), {
          id: tid,
        });
      }
    }
  },
  deleteStoryTheme: async ({ id }) => {
    set(() => ({ createStoryThemeLoading: true }));
    try {
      await StoryThemesService.deleteStoryTheme({ id: id! });
      set((store) => store.getStoryThemes({ page: 1, limit: 10 }));
    } catch (error: any) {
      set(() => ({ createStoryThemeLoading: false }));
      if (error.response.status === 401) {
        toast.error("Unauthorized request");
        signOut();
      } else {
        toast.error(JSON.stringify(error.response.data), {
          id: tid,
        });
      }
    }
  },
});
