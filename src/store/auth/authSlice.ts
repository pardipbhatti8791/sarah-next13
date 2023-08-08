import { StateCreator } from "zustand";
import { AllStates } from "../store";

export interface IAuthSlice {
  token: string | null;
  setToken: (token: string) => void;
}

export const authSlice: StateCreator<
  IAuthSlice,
  [["zustand/persist", never]],
  []
> = (set) => ({
  token: null,
  setToken: async (token) => {
    set(() => ({ token: token }));
  },
});
