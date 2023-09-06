import { IEditStory } from "@/services/StoryThemesService";

export type getStoryParams = { page: number; limit: number };
export interface IStoryThemeInterface {
  storyThemeLoading: boolean;
  storyThemes: (fn: IStoryThemes) => any;
  getStoryThemes: ({ page, limit }: getStoryParams) => any;
  createStoryThemeLoading: boolean;
  createStoryTheme: (fn: ICreateStoryTheme) => void;
  updateStoryTheme: (
    fn: IEditStory,
    data: updateStoryTheme,
    redirect: any,
    id: number
  ) => any;
  deleteStoryTheme: (fn: IEditStory) => any;
}

export interface IStoryThemes {
  rows: IStoryTheme[];
  pageCount: number;
  count: number;
}

export interface IStoryTheme {
  id: number;
  title: string;
  description: string;
  status: number;
  themeType: { value: ""; label: "" };
}

export interface ICreateStoryTheme {
  title: string;
  description: string;
  themeType: { value: ""; label: "" };
}

export type updateStoryTheme = Partial<IStoryTheme>;
