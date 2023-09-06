import { create } from "zustand";
import { storyThemeSlice } from "./storyTheme/storyThemeSlice";
import { IStoryThemeInterface } from "./storyTheme/storyThemeInterface";
import { authSlice, IAuthSlice } from "./auth/authSlice";
import { createJSONStorage, persist } from "zustand/middleware";
import { storyCharacterSlice } from "./storyCharacter/storyCharacterSlice";
import { ICharacterInterface } from "./storyCharacter/storyCharacterInterface";
import { IUserRoot } from "./users/usersInterface";
import { allUsersSlice } from "./users/usersSlice";
import { IStoryModuleRoot } from "./storyModule/storyModuleInterface";
import { allStoriesModuleSlice } from "./storyModule/storyModuleSlice";

export type AllStates = IStoryThemeInterface &
  ICharacterInterface &
  IAuthSlice &
  IUserRoot &
  IStoryModuleRoot;

export const useStore = create<AllStates>()(
  persist(
    (...a) => ({
      ...storyThemeSlice(...a),
      ...allStoriesModuleSlice(...a),
      ...allUsersSlice(...a),
      ...storyCharacterSlice(...a),
      //@ts-ignore
      ...authSlice(...a),
    }),
    { name: "auth", storage: createJSONStorage(() => sessionStorage) }
  )
);
