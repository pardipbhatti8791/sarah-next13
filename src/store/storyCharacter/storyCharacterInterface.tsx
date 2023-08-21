export type getCharacterParams = { page: number; limit: number };
export type getUploadParams = { page: number; type: number };
export interface ICharacterInterface {
  storyCharacterLoading: boolean;
  storyCharacters: (fn: IStoryCharacters) => any;
  getStoryCharacter: ({ page, limit }: getCharacterParams) => any;
  //create story character
  createCharacterLoading: boolean;
  createStoryCharacter: (fn: ICreateStoryCharacter) => void;
  //upload attachment
  uploadAttachmentLoading: boolean;
  createUploadAttachment: (fn: Attachment) => void;
}

export default interface Attachment {
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
  themeType: string;
  CharacterBackgroundType: string;
}
export interface ICreateStoryCharacter {
  type: number;
  title: string;
  description: string;
  attachment_id: number;
  story_theme_id: number;
  themeType: string;
  CharacterBackgroundType: string;
}
