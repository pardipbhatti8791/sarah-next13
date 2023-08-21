import axiosInstance, { URI } from "@/lib/service";
import {
  ICreateStoryCharacter,
  getCharacterParams,
  getUploadParams,
} from "@/store/storyCharacter/storyCharacterInterface";

export interface ICharacterStory {
  id?: number;
  data?: string;
}

class StoryCharacterService {
  async getStoryCharacter({ page, limit }: getCharacterParams) {
    return axiosInstance.get(
      URI.StoryCharacter.getStoryCharacter({ page, limit })
    );
  }
  createStoryCharacter(data: ICreateStoryCharacter) {
    return axiosInstance.post(URI.StoryCharacter.createBackground, data);
  }

  uploadAttachment(data: ICharacterStory) {
    return axiosInstance.post(URI.StoryCharacter.uploadAttachment, data);
  }
}

export default new StoryCharacterService();
