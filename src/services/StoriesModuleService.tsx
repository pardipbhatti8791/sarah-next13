import axiosInstance, { URI } from "@/lib/service";

export interface IStoryModule {
  user_id?: number;
  data?: any;
}

class StoryModuleService {
  AllStoriesAdmin({ user_id }: IStoryModule) {
    return axiosInstance.get(
      URI.storyModuleAdmin.getAllStoryModuleAdmin(user_id!)
    );
  }
}
export default new StoryModuleService();
