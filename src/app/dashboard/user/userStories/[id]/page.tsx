"use client";
import StoriesModuleService from "@/services/StoriesModuleService";
import { useStore } from "@/store/store";

import React, { useEffect, useState } from "react";

const StoryModuleUsers = (props: any) => {
  const [users, setUsers] = useState([]);
  const store = useStore((state) => state);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  useEffect(() => {
    const UsersData = async () => {
      try {
        const resp = await StoriesModuleService.AllStoriesAdmin({
          user_id: +props.params.id,
        });
        setUsers(resp.data);
      } catch (error: any) {
        console.log(error);
      }
    };
    UsersData();
  }, []);

  const handleUserSelect = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  return (
    <main>
      <div className="p-4 mx-auto max-w-screen-2xl md:p-6 2xl:p-10">
        <div className="flex flex-col w-10/12 gap-3 mb-6 sm:flex-row sm:items-center sm:justify-between ">
          <h2 className="font-semibold text-black text-title-md2 dark:text-white">
            Users Data
          </h2>
          <nav>
            <ol className="flex items-center gap-2">
              {selectedUsers.length > 0 && (
                <li className="flex ">
                  <h2 className="pr-5">Mass Delete</h2>
                  <div
                    onClick={
                      "#"
                      // deleteSelectedUsers
                    }
                    className="cursor-pointer "
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
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      <line x1="10" x2="10" y1="11" y2="17" />
                      <line x1="14" x2="14" y1="11" y2="17" />
                    </svg>
                  </div>
                </li>
              )}
            </ol>
          </nav>
        </div>
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="border-b">
                <tr className="text-left bg-gray-2 dark:bg-meta-4">
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black dark:text-white xl:pl-11">
                    Select
                  </th>
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Title
                  </th>

                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Mode
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
                              <input
                                type="checkbox"
                                onChange={() => handleUserSelect(items.id)}
                                checked={selectedUsers.includes(items.id)}
                              />
                            </li>
                          </ul>
                        );
                      })}
                    </h5>
                  </td>
                  <td className="px-4 py-5 dark:border-strokedark xl:pl-0 xl:pr-0 xl:pt-0">
                    <h5 className="font-medium text-black dark:text-white">
                      {users.map((items: any) => {
                        return (
                          <ul className="border-b">
                            <li className="py-4 pl-8">{items.title}</li>
                          </ul>
                        );
                      })}
                    </h5>
                  </td>
                  <td className="px-4 py-5 dark:border-strokedark xl:pl-0 xl:pr-0 xl:pt-0">
                    {users.map((items: any) => {
                      return (
                        <ul className="border-b">
                          <li className="py-4 pl-8">{items.mode}</li>
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
                              <div></div>
                              <div>
                                <div
                                  onClick={async () => {
                                    try {
                                      await store.deleteStory({
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

export default StoryModuleUsers;
