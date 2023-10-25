import axiosInstance, { URI } from "@/lib/service";
import {
  ICreateStoryTheme,
  getStoryParams,
  updateStoryTheme,
} from "@/store/storyTheme/storyThemeInterface";

export interface IEditStory {
  id?: string;
  data?: string;
}

class StoryThemesService {
  async getStoryThemes({ page, limit }: getStoryParams) {
    return axiosInstance.get(URI.storyThemes.getStoryThemes({ page, limit }));
  }
  createStoryTheme(data: ICreateStoryTheme) {
    return axiosInstance.post(URI.createStoryTheme, data);
  }

  updateStoryTheme({ id }: IEditStory, data: updateStoryTheme) {
    return axiosInstance.patch(URI.storyThemes.updateStoryTheme(id!), data);
  }
  deleteStoryTheme({ id }: IEditStory) {
    return axiosInstance.delete(URI.deleteStoryTheme(id!));
  }
}
export default new StoryThemesService();
