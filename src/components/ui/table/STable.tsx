"use client";
import React, { useEffect } from "react";

import {
  PaginationState,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Button } from "../button";
import { getStoryParams } from "@/store/storyTheme/storyThemeInterface";
import { getCharacterParams } from "@/store/storyCharacter/storyCharacterInterface";

interface IDataProps<T, C> {
  data: T;
  getData: ({ page }: getCharacterParams) => void;
  loading: boolean;
  columnsData: C;
}

type STableCompnentI<T = any, C = any> = React.FC<IDataProps<T, C>>;

const STableCompnent: STableCompnentI = ({
  data: { rows, pageCount },
  getData,
  loading,
  columnsData,
}) => {
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 1,
    });

  const fetchDataOptions = {
    pageIndex,
    pageSize,
  };

  useEffect(() => {
    getData({ page: fetchDataOptions.pageIndex + 1, limit: 10 });
  }, [fetchDataOptions.pageIndex]);

  const defaultData = React.useMemo(() => [], []);

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data: rows ?? defaultData,
    columns: columnsData,
    pageCount: pageCount ?? -1,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: false,
  });

  return (
    <div className="p-2">
      <div className="flex items-center py-4">
        {/* <input */}
        {/*   placeholder="Search" */}
        {/*   value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""} */}
        {/*   onChange={(event) => */}
        {/*     table.getColumn(searchKey)?.setFilterValue(event.target.value) */}
        {/*   } */}
        {/*   className="max-w-sm" */}
        {/* /> */}
      </div>
      <div className="h-2" />
      <div className="relative ">
        {loading && (
          <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-gray-400 bg-opacity-60">
            <div>Loading ...</div>
          </div>
        )}
        <table className="w-full table-auto">
          <thead className={cn("[&_tr]:border-b")}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="text-left bg-gray-2 dark:bg-meta-4"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white"
                    >
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className={cn("[&_tr:last-child]:border-0")}>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className={cn(
                          "border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark"
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="h-2" />
      <div className="flex items-center justify-end py-4 space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage() || loading}
        >
          First
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage() || loading}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage() || loading}
        >
          Next
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage() || loading}
        >
          Last
        </Button>
      </div>
    </div>
  );
};

export default STableCompnent;
