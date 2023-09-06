import { StateCreator } from "zustand";
import { IUserRoot } from "./usersInterface";
import UsersService from "@/services/UsersService";
import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";
import { number } from "yup";

export const allUsersSlice: StateCreator<IUserRoot, [], [], IUserRoot> = (
  set
) => ({
  allUsers: [],
  inactiveUser: [],
  activeUser: [],

  usersLoading: false,
  getAllUsers: async (token: string) => {
    set(() => ({ usersLoading: true }));
    try {
      const resp = await UsersService.UsersAll();
      set(() => ({ allUsers: resp.data, usersLoading: false }));
    } catch (error: any) {
      set(() => ({ usersLoading: false }));
      if (error.response.status === 401) {
        toast.error("Unathorized request ! , Signing you out");
        signOut();
      } else {
        toast.error(JSON.stringify(error.response.data));
      }
    }
  },
  inactiveUsers: async () => {
    set(() => ({ usersLoading: true }));
    try {
      const resp = await UsersService.InActiveUsers();
      set(() => ({ InactiveUSers: resp.data, usersLoading: false }));
    } catch (error: any) {
      set(() => ({ usersLoading: false }));
      if (error.response.status === 401) {
        toast.error("Unathorized request ! , Singing you out");
        signOut();
      } else {
        toast.error(JSON.stringify(error.response.data));
      }
    }
  },
  activeUsers: async () => {
    set(() => ({ usersLoading: true }));
    try {
      const resp = await UsersService.ActiveUsers();
      set(() => ({ activeUsers: resp.data, usersLoading: false }));
    } catch (error: any) {
      set(() => ({ usersLoading: false }));
      if (error.response.status === 401) {
        toast.error("Unathorized request ! , Singing you out");
        signOut();
      } else {
        toast.error(JSON.stringify(error.response.data));
      }
    }
  },
  upadateUserLoading: false,
  updateUserbyAdmin: async ({ id }, data) => {
    const tid = toast.loading("Updating...");

    try {
      const resp = await UsersService.UpdateUsersbyAdmin({ id }, data);
      toast.success("Updated", { id: tid });
    } catch (error: any) {
      if (error.response.status === 401) {
        toast.error("Unauthorized request !, Signing you out!");
        signOut();
      } else {
        toast.error(JSON.stringify(error.response.data), {
          id: tid,
        });
      }
    }
  },
  deleteUser: async ({ id }) => {
    set(() => ({ usersLoading: true }));
    const tid = toast.loading("deleting.....");
    try {
      await UsersService.deleteUser({ id: id! });
      toast.success("Deleted Successfully", { id: tid });
      set((store) => store.getAllUsers(""));
    } catch (error: any) {
      set(() => ({ usersLoading: false }));
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
  deleteManyUserLoading: false,
  deleteUserMany: async (ids) => {
    const tid = toast.loading("Deleting...");
    try {
      await UsersService.deleteUserMany(ids);
      toast.success("Deleted Successfully", { id: tid });
      set((store) => store.getAllUsers(""));
    } catch (error: any) {
      set(() => ({ deleteManyUserLoading: false }));
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
