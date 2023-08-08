export type getStoryParams = { page: number; limit: number };
export interface IStoryThemeInterface {
  storyThemeLoading: boolean;
  getStoryThemes: ({ page, limit }: getStoryParams) => void;
  storyThemes: IStoryThemes;
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
  themeType: string;
}
