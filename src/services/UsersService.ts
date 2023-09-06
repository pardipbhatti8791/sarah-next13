import axiosInstance, { URI } from "@/lib/service";
import { updateUserAdmin } from "@/store/users/usersInterface";

export interface IUsersAdmin {
  id?: number;
  data?: any;
}

class UserService {
  UsersAll() {
    return axiosInstance.get(URI.Users.getAllUsers);
  }
  InActiveUsers() {
    return axiosInstance.get(URI.Users.inActiveUsers);
  }
  ActiveUsers() {
    return axiosInstance.get(URI.Users.activeUsers);
  }
  UpdateUsersbyAdmin({ id }: IUsersAdmin, data: updateUserAdmin) {
    return axiosInstance.patch(URI.Users.updateUsersByAdmin(id!), data);
  }
  deleteUser({ id }: IUsersAdmin) {
    return axiosInstance.delete(URI.Users.deleteUser(id!));
  }

  deleteUserMany(ids: string[]) {
    const nids = ids.length > 0 ? ids.join(",") : "";
    return axiosInstance.delete(URI.Users.deleteUsersMany(nids));
  }
}

export default new UserService();
