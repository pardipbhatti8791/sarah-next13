import axiosInstance, { URI } from "@/lib/service";
import {
  ICreateStoryCharacter,
  getCharacterParams,
  getUploadParams,
  updateCharacterTheme,
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
  getAttachments({ page, type }: getUploadParams) {
    return axiosInstance.get(
      URI.StoryCharacter.getAllAttachment({ page, type })
    );
  }

  character(data: ICharacterStory) {
    return axiosInstance.get(URI.StoryCharacter.character, data);
  }

  background(data: ICharacterStory) {
    return axiosInstance.get(URI.StoryCharacter.background, data);
  }

  updateCharacter({ id }: ICharacterStory, data: updateCharacterTheme) {
    return axiosInstance.patch(URI.StoryCharacter.updateCharacter(id!), data);
  }

  deleteCharacter({ id }: ICharacterStory) {
    return axiosInstance.delete(URI.StoryCharacter.deleteCharacter(id!));
  }
}

export default new StoryCharacterService();
