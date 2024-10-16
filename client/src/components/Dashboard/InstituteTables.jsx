import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InstituteData } from "@/constants/data";
import { useToast } from "@/hooks/use-toast";
import { LiaSortDownSolid, LiaSortUpSolid } from "react-icons/lia";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";

const InstituteTables = () => {
  const columns = [
    {
      accessorKey: "id",
      header: "Id",
      id: "id",
    },
    {
      accessorKey: "Institute_Id",
      header: "Institute Id",
      id: "Institute_Id",
    },
    {
      accessorKey: "University",
      header: "University",
      id: "University",
    },
    {
      accessorKey: "Institute_Img",
      header: "Institute Img",
      cell: ({ row }) => (
        <img
          src={row.getValue("Institute_Img")}
          alt="Pet"
          className="h-[3rem] w-[5rem] object-cover rounded-sm"
        />
      ),
    },
    {
      accessorKey: "Institute_Name",
      header: "Institute Name",
      id: "Institute_Name", // Explicit id added
    },
    {
      accessorKey: "Registered_On",
      header: "Registered On",
      id: "Registered_On", // Explicit id added
    },

    {
      id: "actions", // Explicit id added
      header: "Actions",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-gray-500">
              <IoEllipsisVertical size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <span
                className="text-center h-[2rem] text-[1.3rem]"
                onClick={() =>
                  toast({ description: "Pet removed from whishlist" })
                }
              >
                Remove
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        //     <MdDelete color="red" size={20} />
        // // <Button>
        // // </Button>
      ),
    },
  ];

  const { toast } = useToast();
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const table = useReactTable({
    data: InstituteData,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();
  const visiblePages = 5;

  // Calculate start and end pages
  let startPage = Math.max(0, pageIndex - Math.floor(visiblePages / 2));
  let endPage = Math.min(pageCount - 1, startPage + visiblePages - 1);

  if (endPage - startPage < visiblePages - 1) {
    startPage = Math.max(0, endPage - visiblePages + 1);
  }

  return (
    <div className="  p-4 flex flex-col justify-between">
      <div className="flex flex-col">
        {/* Filter Bar */}
        <div className="flex justify-between mb-4 gap-4">
          <Input
            type="text"
            placeholder="Search institute..."
            className="h-[2.5rem] py-4 text-[0.9rem]"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>

        {/* ShadCN Table */}
        <Table className="w-full rounded-t-[0.4rem] overflow-hidden">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="p-2 border-b h-[3rem] font-[600] text-[1rem] border-gray-700 cursor-pointer  text-white bg-[#4f46e5]"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-3">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === "asc" ? (
                          <LiaSortUpSolid />
                        ) : (
                          <LiaSortDownSolid />
                        )
                      ) : null}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-gray-100 cursor-pointer h-[4rem] text-[1rem] text-black"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="p-2 border-b border-gray-700"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ShadCN Pagination Controls */}
      <div>
        <Pagination className="flex justify-end mt-4 pr-8 w-full h-[3rem] text-[1.3rem] text-white">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  table.setPageIndex(pageIndex - 1);
                }}
                className={"text-[1.3rem]  h-full"}
                disabled={!table.getCanPreviousPage()}
              />
            </PaginationItem>

            {/* Show ellipsis at the beginning */}
            {startPage > 0 && (
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    table.setPageIndex(0);
                  }}
                >
                  1
                </PaginationLink>
                <span>...</span>
              </PaginationItem>
            )}

            {/* Render page numbers */}
            {Array.from({ length: endPage - startPage + 1 }).map((_, i) => {
              const page = startPage + i;
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === pageIndex}
                    onClick={(e) => {
                      e.preventDefault();
                      table.setPageIndex(page);
                    }}
                    className={"text-[1.3rem]  h-full border-2"}
                  >
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {/* Show ellipsis at the end */}
            {endPage < pageCount - 1 && (
              <PaginationItem>
                <span>...</span>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    table.setPageIndex(pageCount - 1);
                  }}
                >
                  {pageCount}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (pageIndex + 1 < pageCount) {
                    table.setPageIndex(pageIndex + 1);
                  }
                }}
                className={"text-[1.3rem]  h-full"}
                disabled={pageIndex + 1 >= pageCount}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default InstituteTables;
