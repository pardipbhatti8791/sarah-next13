"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import UsersService from "@/services/UsersService";
import { useStore } from "@/store/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Select from "react-select";
interface IDataProps<T, C> {
  loading: boolean;
}

type UserCompnentI<T = any, C = any> = React.FC<IDataProps<T, C>>;

const Users: UserCompnentI = ({ loading }, props: any) => {
  const [users, setUsers] = useState([]);
  const store = useStore((state) => state);
  const router = useRouter();

  useEffect(() => {
    const UsersData = async () => {
      try {
        const resp = await UsersService.UsersAll();

        setUsers(resp.data);
      } catch (error: any) {
        console.log(error);
      }
    };
    UsersData();
  }, []);

  const Status = [
    {
      label: "Active",
      value: 1,
    },
    {
      label: "In-Active",
      value: 0,
    },
  ];

  return (
    <main>
      <div className="p-4 mx-auto max-w-screen-2xl md:p-6 2xl:p-10">
        <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-semibold text-black text-title-md2 dark:text-white">
            Users
          </h2>
          <nav>
            <ol className="flex items-center gap-2">
              <li>Total Stories</li>
              <li className="text-primary">
                <div className="flex items-center justify-center rounded-full h-14 w-14 bg-primary">
                  <span className="text-sm font-medium text-white">
                    {users.length}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            {loading && (
              <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-gray-400 bg-opacity-60">
                <div>Loading ...</div>
              </div>
            )}

            <table className="w-full table-auto">
              <thead className="border-b">
                <tr className="text-left bg-gray-2 dark:bg-meta-4">
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Name
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Users Email
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Status
                  </th>
                  <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-5 dark:border-strokedark xl:pl-0 xl:pr-0 xl:pt-0">
                    <h5 className="font-medium text-black dark:text-white">
                      {users.map((items: any) => {
                        return (
                          <ul className="border-b">
                            <li className="py-4 pl-8">
                              {items.first_name} {items.last_name}
                            </li>
                          </ul>
                        );
                      })}
                    </h5>
                  </td>
                  <td className="px-4 py-5 dark:border-strokedark xl:pl-0 xl:pr-0 xl:pt-0">
                    {users.map((items: any) => {
                      return (
                        <ul className="border-b">
                          <li className="py-4 pl-8">{items.email}</li>
                        </ul>
                      );
                    })}{" "}
                  </td>
                  <td className="px-4 py-5 dark:border-strokedark xl:pl-0 xl:pr-0 xl:pt-0">
                    {users.map((items: any) => {
                      return (
                        <ul className="border-b">
                          <li className="pb-2.5 pt-2 pl-8">
                            <div className="w-40">
                              <Select
                                options={Status}
                                value={Status.find(
                                  (option) => option.value === items.status
                                )}
                                onChange={(option: any) => {
                                  //@ts-ignore
                                  store.updateUserbyAdmin(
                                    { id: items.id },
                                    { status: option.value }
                                  );
                                  setUsers((item: any) =>
                                    item.map((user: any) =>
                                      user.id === items.id
                                        ? {
                                            ...user,
                                            status: option.value,
                                          }
                                        : user
                                    )
                                  );
                                }}
                              />
                            </div>
                          </li>
                        </ul>
                      );
                    })}
                  </td>
                  <td className="px-4 py-5 dark:border-strokedark xl:pl-0 xl:pr-0 xl:pt-0">
                    {users.map((items: any) => {
                      return (
                        <ul className="border-b">
                          <li className="pt-4 pb-4 pl-8">
                            <div className="flex gap-2">
                              <div>
                                <div
                                  onClick={() => {
                                    router.push(
                                      `/dashboard/user/userStories/${items.id}`
                                    );
                                  }}
                                >
                                  <svg
                                    className="cursor-pointer fill-current "
                                    width={18}
                                    height={18}
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                      fill=""
                                    />
                                    <path
                                      d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                      fill=""
                                    />
                                  </svg>
                                </div>
                              </div>
                              <div>
                                <div
                                  onClick={async () => {
                                    try {
                                      await store.deleteUser({
                                        id: items.id,
                                      });
                                      setUsers((prevUsers) =>
                                        prevUsers.filter(
                                          (user: any) => user.id !== items.id
                                        )
                                      );
                                    } catch (error) {
                                      console.log(error);
                                    }
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="cursor-pointer lucide lucide-trash-2"
                                  >
                                    <path d="M3 6h18" />
                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                    <line x1="10" x2="10" y1="11" y2="17" />
                                    <line x1="14" x2="14" y1="11" y2="17" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      );
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Users;
