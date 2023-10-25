import { ICharacterStory } from "@/services/StoryCharacterService";
export type getCharacterParams = { page: number; limit: number };
export type getUploadParams = { page: number; type: number };

export interface ICharacterInterface {
  storyCharacterLoading: boolean;
  storyCharacters: (fn: IStoryCharacters) => any;
  attachments: (fn: IStoryCharacters) => any;
  getStoryCharacter: ({ page, limit }: getCharacterParams) => any;

  createCharacterLoading: boolean;
  createStoryCharacter: (fn: ICreateStoryCharacter) => void;

  updateStoryCharacter: (
    fn: ICharacterStory,
    data: updateCharacterTheme,
    redirect: any,
    id: string
  ) => any;

  getAllAttachment: ({ page, type }: getUploadParams) => any;
  uploadAttachmentLoading: boolean;
  createUploadAttachment: (fn: IAttachment) => any;
  character: (fn: IAttachment) => void;
  background: (fn: IAttachment) => void;
  deleteCharacter: (fn: ICharacterStory) => any;
}

export default interface IAttachment {
  id: string;
}

export interface IStoryCharacters {
  rows: IStoryCharacter[];
  pageCount: number;
  count: number;
}

export interface IStoryCharacter {
  type: string;
  title: string;
  description: string;
  attachment: string;
  story_theme_id: string;
}
export interface ICreateStoryCharacter {
  type: string;
  title: string;
  description: string;
  attachment: string;
  story_theme_id: string;
}
export type updateCharacterTheme = Partial<IStoryCharacter>;
