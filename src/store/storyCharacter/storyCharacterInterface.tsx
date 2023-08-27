import { ICharacterStory } from "@/services/StoryCharacterService";

export type getCharacterParams = { page: number; limit: number };
export type getUploadParams = { page: number; type: number };
export interface ICharacterInterface {
  storyCharacterLoading: boolean;
  storyCharacters: (fn: IStoryCharacters) => any;
  getStoryCharacter: ({ page, limit }: getCharacterParams) => any;
  //create story character
  createCharacterLoading: boolean;
  createStoryCharacter: (fn: ICreateStoryCharacter) => void;
  updateStoryCharacter: (
    fn: ICharacterStory,
    data: updateCharacterTheme,
    redirect: any,
    id: number
  ) => any;
  //upload attachment
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
  type: any;
  title: string;
  description: string;
  attachment_id: number;
  story_theme_id: any;
  themeType: string;
  CharacterBackgroundType: string;
}
export interface ICreateStoryCharacter {
  type: any;
  title: string;
  description: string;
  attachment_id: number;
  story_theme_id: any;
  themeType: string;
  CharacterBackgroundType: string;
}
export type updateCharacterTheme = Partial<IStoryCharacter>;
