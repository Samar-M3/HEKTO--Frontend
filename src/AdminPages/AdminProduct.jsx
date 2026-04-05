import React, { useEffect, useState } from "react";
import CreateProduct from "./CreateProduct";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import useFetch from "../hooks/UseFetch";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

function AdminProduct() {
  const [open, setopen] = useState(false);
  const [products, setproduct] = useState([]);
  const [editingdata, setEditingProduct] = useState(null);
  const { data, loading, error } = useFetch(
    "http://localhost:8000/api/v1/product",
    []
  );
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/api/v1/product/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("failed to delete");
      }
      setproduct((prev) => prev.filter((p) => p._id !== id));
      toast("Delete successful");
    } catch (err) {
      console.error(err);
      toast("error deleting product");
    }
  };
  useEffect(() => {
  if (data) {
    console.log("API RESPONSE:", data);
  }
}, [data]);
  const handleEdit = (product) => {
    setopen(true);
    setEditingProduct(product);
  };

  useEffect(() => {
    if (Array.isArray(data?.data)) {
      setproduct(data.data);
    }
  }, [data]);

  const tabledata = products;
  

  const columnhelper = createColumnHelper();
  const columns = [
    columnhelper.display({
      id: "serial",
      header: "ID",
      cell: ({ row }) => row.index + 1,
    }),
    columnhelper.accessor("title", {
      header: "Name",
    }),
    columnhelper.accessor("price", {
      header: "Price",
    }),
    columnhelper.accessor("code", {
      header: "Product Code",
    }),
    columnhelper.accessor("discount_price", {
      header: "Discount",
    }),
    columnhelper.accessor("updatedAt", {
      header: "Last Updated",
    }),
 
    columnhelper.display({
      id: "action",
      header: "ACTION",
      cell: ({ row }) => (
        <div className="flex gap-4 justify-center">
          <FaEdit
            className="text-blue-600 cursor-pointer hover:scale-110"
            onClick={() => handleEdit(row.original)}
          />
          <FaTrash
            className="text-red-600 cursor-pointer hover:scale-110"
            onClick={() => handleDelete(row.original._id)}
          />
        </div>
      ),
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
      <div>
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">Products</h1>

          <button
            onClick={() => {
              setopen(true);
              setEditingProduct(null);
            }}
            className="bg-green-200 py-[7px] px-[20px] rounded-2xl text-[20px] cursor-pointer hover:scale-102 border-none shadow-gray-500 hover:shadow-lg hover:shadow-black/5 hover:transition-all hover:duration-120"
          >
            Create<span className="font-bold text-2xl">+</span>
          </button>
        </div>
        {open && (
          <CreateProduct
            onClose={() => setopen(false)}
            editingdata={editingdata}
            onProductCreated={(res) => {
              const updatedProduct = res?.product; // grab the actual product
              if (!updatedProduct || !updatedProduct._id) {
                console.error("Invalid product response:", res);
                toast("Invalid product data from server");
                return;
              }
              setproduct((prev) =>
                prev.some((p) => p && p._id === updatedProduct._id)
                  ? prev.map((p) =>
                      p._id === updatedProduct._id
                        ? { ...p, ...updatedProduct }
                        : p
                    )
                  : [...prev, updatedProduct]
              );
            }}
          />
        )}
      </div>
      
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

export default AdminProduct;
