import React from "react";

import { useFetcher } from "react-router";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import useFetch from "../hooks/usefetch";
import BaseUrl from "../constant";

function User() {
  const { data, loading, error } = useFetch(
    `${BaseUrl}api/v1/users`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
    []
  );
   const tabledata = Array.isArray(data) ? data : [];

  const columnhelper = createColumnHelper();
  const columns = [
      columnhelper.display({
      id: "serial",
      header: "ID",
      cell: (cell) => cell.row.index + 1, 
    }),
    columnhelper.accessor("username", {
      header: "Name",
    }),
    columnhelper.accessor("email", {
      header: "Email",
    }),
    columnhelper.accessor("role",{
      header:"Role"
    }),
    
  ];

  const table = useReactTable({
    data: tabledata,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

 if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }  if (error) return <p>{error}</p>;
  return (
    <div>
      <div className="">
        <h1 className="font-bold text-2xl ">Users </h1>
      </div>
      <div className="w-full overflow-x-auto mt-6">
        <table className="w-full h-full divide-y divide-gray-200 border-1 border-gray-400 ">
          <thead className="bg-gray-100 ">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th key={header.id} className="p-1.5">
                    {header.isPlaceholder
                      ? null
                      : header.column.columnDef.header}
                      
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-1.5 text-center border-1 border-gray-400">{cell.getValue()}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default User;
