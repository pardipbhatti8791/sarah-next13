"use client";
import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IStoryTheme } from "@/store/storyTheme/storyThemeInterface";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CreateCharacterBackground } from "@/components/c-character-backgrounds/CreateCharacterBackground";

export const useStoryThemesColumns = () => {
  const store = useStore((state) => state);
  const router = useRouter();
  const { status, data } = useSession();
  const [titleOptions, setTitleOptions] = useState([]);

  useEffect(() => {
    if (status === "authenticated") {
      store.getStoryThemes({ page: 1, limit: 10 });
    }
  }, [status]);

  return React.useMemo<ColumnDef<IStoryTheme>[]>(
    () => [
      {
        id: "title",
        accessorFn: (row) => row.title,
        header: () => <span>Title</span>,
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },

      {
        accessorFn: (row) => row.description,
        id: "description",
        cell: (info) => info.getValue(),
        header: () => <span>Description</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.status,
        id: "status",
        cell: (info) => info.getValue(),
        header: () => <span>Status</span>,
        footer: (props) => props.column.id,
      },
      {
        header: () => <span>Actions</span>,
        id: "actions",
        cell: (row) => (
          <div className="flex gap-2">
            <div
              onClick={() => {
                router.push(
                  `/dashboard/story-theme/edit-story/${row.row.original.id}`
                );
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
                className="cursor-pointer lucide lucide-pencil"
              >
                <line x1="18" x2="22" y1="2" y2="6" />
                <path d="M7.5 20.5 19 9l-4-4L3.5 16.5 2 22z" />
              </svg>
            </div>
            <div
              onClick={() =>
                store.deleteStoryTheme({ id: row.cell.row.original.id })
              }
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
        ),
      },
    ],

    []
  );
};
