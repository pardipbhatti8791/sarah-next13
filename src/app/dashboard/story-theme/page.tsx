"use client";
import { CreateStoryTheme } from "@/components/c-story-themes/CreateStoryTheme";
import React, { useEffect } from "react";
import { useStoryThemesColumns } from "./story-theme-columns";
import CTableCompnent from "@/components/ui/table/CTable";
import { useStore } from "@/store/store";

const StoryThemes = () => {
  const storyColumns = useStoryThemesColumns();
  const store = useStore((state) => state);

  useEffect(() => {
    store.getStoryThemes({ page: 1, limit: 10 });
  }, []);

  return (
    <main>
      <div className="p-4 mx-auto max-w-screen-2xl md:p-6 2xl:p-10">
        <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-semibold text-black text-title-md2 dark:text-white">
            Story Themes
          </h2>
          <nav>
            <ol className="flex items-center gap-2">
              <li>Total Stories</li>
              <li className="text-primary">
                <div className="flex items-center justify-center rounded-full h-14 w-14 bg-primary">
                  <span className="text-sm font-medium text-white">
                    {store.storyThemes.count}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <div className="col-span-12 py-6 bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
            <h4 className="mb-6 px-7.5 text-xl font-bold text-black dark:text-white">
              Create Story Theme
            </h4>
            <CreateStoryTheme />
          </div>

          <div className="col-span-12 xl:col-span-8">
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
              <div className="max-w-full overflow-x-auto">
                <CTableCompnent
                  data={store.storyThemes}
                  getData={store.getStoryThemes}
                  loading={store.storyThemeLoading}
                  columnsData={storyColumns}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StoryThemes;
