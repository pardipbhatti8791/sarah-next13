import { create } from "zustand";
import { storyThemeSlice } from "./storyTheme/storyThemeSlice";
import { IStoryThemeInterface } from "./storyTheme/storyThemeInterface";
import { authSlice, IAuthSlice } from "./auth/authSlice";
import { createJSONStorage, persist } from "zustand/middleware";

export type AllStates = IStoryThemeInterface & IAuthSlice;

export const useStore = create<AllStates>()(
  persist(
    (...a) => ({
      ...storyThemeSlice(...a),
      //@ts-ignore
      ...authSlice(...a),
    }),
    { name: "auth", storage: createJSONStorage(() => sessionStorage) }
  )
);
