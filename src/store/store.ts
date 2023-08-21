import { create } from "zustand";
import { storyThemeSlice } from "./storyTheme/storyThemeSlice";
import { IStoryThemeInterface } from "./storyTheme/storyThemeInterface";
import { authSlice, IAuthSlice } from "./auth/authSlice";
import { createJSONStorage, persist } from "zustand/middleware";
import { storyCharacterSlice } from "./storyCharacter/storyCharacterSlice";
import { ICharacterInterface } from "./storyCharacter/storyCharacterInterface";

export type AllStates = IStoryThemeInterface & ICharacterInterface & IAuthSlice;

export const useStore = create<AllStates>()(
  persist(
    (...a) => ({
      ...storyThemeSlice(...a),

      ...storyCharacterSlice(...a),
      //@ts-ignore
      ...authSlice(...a),
    }),
    { name: "auth", storage: createJSONStorage(() => sessionStorage) }
  )
);
