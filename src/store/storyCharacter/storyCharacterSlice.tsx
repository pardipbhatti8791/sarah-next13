import { StateCreator } from "zustand";
import { ICharacterInterface } from "./storyCharacterInterface";
import StoryCharacterService from "@/services/StoryCharacterService";
import { toast } from "react-hot-toast";
import { useStore } from "../store";

export const storyCharacterSlice: StateCreator<
  ICharacterInterface,
  [],
  [],
  ICharacterInterface
> = (set) => ({
  storyCharacterLoading: false,
  storyCharacters: {
    rows: [
      {
        id: 0,
        title: "",
        description: "",
        themeType: "",
        CharacterBackgroundType: "",
        type: 0,
        attachment_id: 0,
        story_theme_id: 0,
      },
    ],
    pageCount: 1,
    count: 0,
  },
  getStoryCharacter: async ({ page, limit }) => {
    set(() => ({ storyCharacterLoading: true }));
    try {
      const resp: any = await StoryCharacterService.getStoryCharacter({
        page,
        limit,
      });
      set(() => ({ storyCharacters: resp.data, storyCharacterLoading: false }));
    } catch (error: any) {
      set(() => ({ storyCharacterLoading: false }));
      toast.error(JSON.stringify(error.response.data));
    }
  },

  createCharacterLoading: false,
  createStoryCharacter: async (fn) => {
    const tid = toast.loading("Creating new Character & Background...");
    set(() => ({ createCharacterLoading: true }));
    try {
      await StoryCharacterService.createStoryCharacter(fn);

      set(() => ({ createCharacterLoading: false }));
      useStore.getState().getStoryCharacter({ page: 1, limit: 10 });
      toast.dismiss(tid);
    } catch (error: any) {
      toast.error(JSON.stringify(error.res), {
        id: tid,
      });
      set(() => ({ createCharacterLoading: false }));
    }
  },

  uploadAttachmentLoading: false,
  createUploadAttachment: async (fn) => {
    set(() => ({ uploadAttachmentLoading: true }));
    try {
      await StoryCharacterService.uploadAttachment(fn).then((res) => {
        console.log("message ===> ", res);
      });

      set(() => ({ uploadAttachmentLoading: false }));
    } catch (error: any) {
      toast.error(JSON.stringify(error.res));
    }
    set(() => ({ uploadAttachmentLoading: false }));
  },

  character: async (fn) => {
    try {
      await StoryCharacterService.character(fn);
    } catch (error: any) {
      toast.error(JSON.stringify(error.res));
    }
  },

  background: async (fn) => {
    try {
      await StoryCharacterService.background(fn);
    } catch (error: any) {
      toast.error(JSON.stringify(error.res));
    }
  },
});
