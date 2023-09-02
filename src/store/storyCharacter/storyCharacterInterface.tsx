import { ICharacterStory } from "@/services/StoryCharacterService";
export type getCharacterParams = { page: number; limit: number };
export type getUploadParams = { page: number; type: number };

export interface ICharacterInterface {
  storyCharacterLoading: boolean;
  storyCharacters: (fn: IStoryCharacters) => any;
  attachments: (fn: IStoryCharacters) => any;
  getStoryCharacter: ({ page, limit }: getCharacterParams) => any;
  //create story character
  createCharacterLoading: boolean;
  createStoryCharacter: (fn: ICreateStoryCharacter) => void;
  //Update story character
  updateStoryCharacter: (
    fn: ICharacterStory,
    data: updateCharacterTheme,
    redirect: any,
    id: number
  ) => any;
  //upload attachment
  getAllAttachment: ({ page, type }: getUploadParams) => any;
  uploadAttachmentLoading: boolean;
  createUploadAttachment: (fn: IAttachment) => void;
  character: (fn: IAttachment) => void;
  background: (fn: IAttachment) => void;
  deleteCharacter: (fn: ICharacterStory) => any;
}

export default interface IAttachment {
  id: number;
}

export interface IStoryCharacters {
  rows: IStoryCharacter[];
  pageCount: number;
  count: number;
}

export interface IStoryCharacter {
  id: number;
  type: number;
  title: string;
  description: string;
  attachment_id: number;
  story_theme_id: number;
}
export interface ICreateStoryCharacter {
  type: number;
  title: string;
  description: string;
  attachment_id: number;
  story_theme_id: number;
}
export type updateCharacterTheme = Partial<IStoryCharacter>;
