import { StateCreator } from "zustand";
import { IStoryThemeInterface } from "./storyThemeInterface";
import { toast } from "react-hot-toast";
import StoryThemesService from "@/services/StoryThemesService";

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
        themeType: "",
        status: 0,
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
});
