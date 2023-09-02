import { IStoryModule } from "@/services/StoriesModuleService";

export interface IStoryModuleRoot {
  allStoriesAdmin: IStoryModuleAdmin[];
  allStoriesAdminLoading: boolean;
  getAllStoryModule: (fn: IStoryModule, user_id: number) => any;
}

export interface IStoryModuleAdmin {
  id: number;
  title: string;
  description: any;
  status: number;
  mode: string;
  story_theme_id: null;
  story_place_id: null;
  story_weather_id: null;
  story_time_id: null;
  story_mood_id: null;
  video_status: number;
  video_tag: number;
  video_file: null;
  user_id: number;
}
