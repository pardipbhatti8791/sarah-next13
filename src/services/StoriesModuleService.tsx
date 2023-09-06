import axiosInstance, { URI } from "@/lib/service";

export interface IStoryModule {
  user_id?: number;
  data?: any;
  id?: number;
}

class StoryModuleService {
  AllStoriesAdmin({ user_id }: IStoryModule) {
    return axiosInstance.get(
      URI.storyModuleAdmin.getAllStoryModuleAdmin(user_id!)
    );
  }
  deleteStory({ id }: IStoryModule) {
    return axiosInstance.delete(URI.storyModuleAdmin.deleteStory(id!));
  }
}
export default new StoryModuleService();
