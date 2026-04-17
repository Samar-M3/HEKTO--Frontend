import React, { useEffect, useState } from "react";
import CreateBanner from "./CreateBanner";
import useFetch from "../hooks/usefetch";
import { toast } from "react-toastify";
import BaseUrl from "../constant";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaEdit, FaTrash } from "react-icons/fa";

function AdminBanner() {
  const [open, setopen] = useState(false);
  const [banners, setbanner] = useState([]);
  const [editingdata, setEditingBanner] = useState(null);
  const {data, loading, error} = useFetch(
    `${BaseUrl}api/v1/banner`,
    []
  );
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BaseUrl}api/v1/banner/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("failed to delete");
      }
      setbanner((prev) => prev.filter((p) => p._id !== id));
      toast("delete successfull!!");
    } catch (err) {
      toast("error deleting product");
    }
  };
  const handleEdit = (banner) => {
    setopen(true);
    setEditingBanner(banner);
  };

  useEffect(() => {
    if (Array.isArray(data?.data)) {
      setbanner(data.data);
    }
  }, [data]);

  const tabledata = banners;
  const columnhelper = createColumnHelper();
  const columns = [
    columnhelper.display({
      id: "serial",
      header: "ID",
      cell: ({ row }) => row.index + 1,
    }),
    columnhelper.accessor("title", {
      header: "Title",
    }),
    columnhelper.accessor("discountText", {
      header: "Discount",
    }),
    columnhelper.accessor("caption", {
      header: "Caption",
    }),
   
    columnhelper.display({
      id: "Action",
      header: "ACTION",
      cell: ({ row }) => [
        <div className="flex gap-4 justify-center">
          <FaEdit
            className="text-blue-600 cursor-pointer hover:scale-110"
            onClick={() => handleEdit(row.original)}
          />
          <FaTrash
            className="text-red-600 cursor-pointer hover:scale-110"
            onClick={() => handleDelete(row.original._id)}
          />
        </div>,
      ],
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
  }
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl">Banner</h1>
        <button
          className="bg-green-200 py-[7px] px-[20px] rounded-2xl text-[20px] cursor-pointer hover:scale-102 border-none shadow-gray-500 hover:shadow-lg hover:shadow-black/5 hover:transition-all hover:duration-120"
          onClick={() => setopen(true)}
        >
          Create<span>+</span>
        </button>
      </div>
      {open && (
        <CreateBanner
          onClose={() => setopen(false)}
           editingdata={editingdata}
         onBannercreated={(banner) =>
  setbanner((prev) =>
    prev.some((p) => p?._id === banner?._id)
      ? prev.map((p) => (p._id === banner._id ? { ...banner } : p)) // Fixed spreading
      : [...prev, banner]
  )
}
        />
      )}
      <div>
              <div className="w-full overflow-x-auto mt-6">
                <table className="w-full h-full ">
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
                          <td key={cell.id} className="p-1.5 text-center">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
    </div>
    
  );
}

export default AdminBanner;
