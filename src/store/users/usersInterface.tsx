import { IUsersAdmin } from "@/services/UsersService";

export interface IUserRoot {
  allUsers: IUSERS[];
  getAllUsers: (token: string) => any;
  usersLoading: boolean;
  inactiveUser: IUSERS[];
  inactiveUsers: () => any;
  activeUser: IUSERS[];
  activeUsers: () => any;
  // Update users
  upadateUserLoading: boolean;
  updateUserbyAdmin: (
    fn: IUsersAdmin,
    data: updateUserAdmin,
    id: number
  ) => any;
  deleteUser: (fn: IUsersAdmin) => any;
  deleteManyUserLoading: boolean;
  deleteUserMany: (ids: string[]) => any;
}

export interface IUserAdmin {
  status: number;
}

export interface IUSERS {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  device_id: null;
  device_type: null;
  otp: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  roleId: number;
  apple_id: null;
  email_verified_at: null;
  facebook_id: null;
  google_id: null;
  status: number;
  twitter_id: null;
  avatar: string;
  role: {
    id: number;
    type: string;
  };
}

export type updateUserAdmin = Partial<IUserAdmin>;
