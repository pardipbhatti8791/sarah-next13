"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Dashboard } from "@/icons/dashboard";
import { StoryThemeIcon } from "@/icons/StoryThemeIcon";
import { PeopleIcon } from "@/icons/peopleIcon";
import { CBIcons } from "@/icons/CBIcons";

export default function Sidebar() {
  const router = useRouter();
  return (
    <aside
      // :className="sidebarToggle ? 'translate-x-0' : '-translate-x-full'"
      className="absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0"
    // @click.outside="sidebarToggle = false"
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <div className="text-3xl text-white text-center">MyTalez</div>

        <button className="block lg:hidden">
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav
          className="px-4 py-4 mt-5 lg:mt-9 lg:px-6"
          x-data="{selected: $persist('Dashboard')}"
        >
          <div>
            <h3 className="mb-4 ml-4 text-sm font-medium text-bodydark2">
              MENU
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <Link
                  className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
                  href={"/dashboard"}
                >
                  <Dashboard />
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
                  href="/dashboard/story-theme"
                >
                  <StoryThemeIcon />
                  Story Themes
                </Link>
              </li>

              <li>
                <Link
                  className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
                  href="/dashboard/character-backgrounds"
                >
                  <CBIcons />
                  Character & Backgrounds
                </Link>
              </li>
              <li>
                <Link
                  className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
                  href="/dashboard/user"
                >
                  <PeopleIcon />
                  Users
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
}
