import axiosInstance, { URI } from "@/lib/service";
import { getStoryParams } from "@/store/storyTheme/storyThemeInterface";

class StoryThemesService {
  async getStoryThemes({ page, limit }: getStoryParams) {
    return axiosInstance.get(URI.storyThemes.getStoryThemes({ page, limit }));
  }
}
export default new StoryThemesService();
