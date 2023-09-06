import { StateCreator } from "zustand";
import { ICharacterInterface } from "./storyCharacterInterface";
import StoryCharacterService from "@/services/StoryCharacterService";
import { toast } from "react-hot-toast";
import { useStore } from "../store";
import { redirect } from "next/dist/server/api-utils";
import { signOut } from "next-auth/react";

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
        storyTheme: { value: "", label: "" },
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

  getAllAttachment: async ({ page, type }) => {
    set(() => ({ uploadAttachmentLoading: true }));
    try {
      const resp = await StoryCharacterService.getAttachments({
        page,
        type,
      });
      set(() => ({ attachments: resp.data, uploadAttachmentLoading: false }));
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

  updateStoryCharacter: async ({ id }, data, redirect) => {
    const tid = toast.loading("Updating Character....");
    try {
      await StoryCharacterService.updateCharacter({ id }, data);
      toast.success("Updated Successfully!", {
        id: tid,
      });
      redirect.push("/dashboard/Character-backgrounds");
    } catch (error: any) {
      if (error.response.status === 401) {
        toast.error("Unauthorized request!,Signing you out");
        signOut();
      } else {
        toast.error(JSON.stringify(error.response.data), {
          id: tid,
        });
      }
    }
  },

  uploadAttachmentLoading: false,
  createUploadAttachment: async (fn) => {
    set(() => ({ uploadAttachmentLoading: true }));
    try {
      await StoryCharacterService.uploadAttachment(fn);

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

  deleteCharacter: async ({ id }) => {
    try {
      await StoryCharacterService.deleteCharacter({ id: id! });
      set((store) => store.getStoryCharacter({ page: 1, limit: 10 }));
    } catch (error: any) {
      set(() => ({ createCharacterLoading: false }));
      if (error.response.status === 401) {
        toast.error("Unauthorized request");
        signOut();
      } else {
        toast.error(JSON.stringify(error.response.data), {
          id: tid,
        });
      }
    }
  },
});
