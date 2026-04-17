import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import BaseUrl from "../constant";

function CreateProduct({ onClose, onProductCreated, editingdata }) {
  const [image, setimage] = useState(null);
  const [preview, setpreview] = useState(null);
  const [category, setcategory] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${BaseUrl}api/v1/category`);
        const data = await res.json();

        if (!res.ok) throw new Error("Failed to load categories");

        setcategory(data.data);
      } catch (err) {
        toast("Failed to load categories");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const [form, setForm] = useState({
    title: "",
    price: "",
    discount_price: "",
    code: "",
    category: "",
    description: "",
    image: "",
    sections: {
      newArrival: false,
      featured: false,
      bestSeller: false,
      specialOffer: false,
    },
  });
  const handleSectionchange = (e) => {
    const { name, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [name]: checked,
      },
    }));
  };

  useEffect(() => {
    if (editingdata) {
      setForm({
        title: editingdata.title || "",
        price: editingdata.price || "",
        discount_price: editingdata.discount_price || "",
        code: editingdata.code || "",
        category: editingdata.category?._id || "", 
        description: editingdata.description || "",
        image: "",
        sections: {
          newArrival: editingdata.sections?.newArrival || false,
          featured: editingdata.sections?.featured || false,
          bestSeller: editingdata.sections?.bestSeller || false,
          specialOffer: editingdata.sections?.specialOffer || false,
        },
      });
      setpreview(editingdata.imageUrl || null);
      setimage(null);
    } else {
      setForm({
        title: "",
        price: "",
        discount_price: "",
        code: "",
        category: "",
        description: "",
        image: "",
        sections: {
          newArrival: false,
          featured: false,
          bestSeller: false,
          specialOffer: false,
        },
      });
      setpreview(null);
      setimage(null);
    }
    console.log(editingdata);
  }, [editingdata]);
  const notify = () => {
    toast("Enter all fields");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setimage(file);
    setpreview(URL.createObjectURL(file));
  };

  const hanclechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.title || !form.price || !form.description || !form.code) {
      notify();
      return;
    }
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "sections") {
        formData.append("sections", JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });
    if (image) formData.append("image", image);

    const token = localStorage.getItem("token");

    const url = editingdata
      ? `${BaseUrl}api/v1/product/${editingdata._id}`
      : `${BaseUrl}api/v1/product`;

    const method = editingdata ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      toast(data.message || "Something went wrong");
      return;
    }

    onProductCreated(data);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0  flex justify-center items-center transition-all">
      <div className="bg-white rounded-2xl text-center h-[500px] w-[800px] flex flex-col items-center p-7 shadow-lg shadow-gray-400 transition-all relative">
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold">New Product</h1>
          <div
            onClick={onClose}
            className="text-xl font-bold cursor-pointer hover:bg-gray-200 p-2 rounded-full transition-colors"
          >
            X
          </div>
        </div>

        {/* Title Input */}
        <input
          className="bg-gray-100 border border-gray-300 rounded-lg text-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Title"
          name="title"
          value={form.title}
          onChange={hanclechange}
        />

        {/* Price and Discount */}
        <div className="mt-4 flex gap-4 justify-center w-full">
          <input
            className="bg-gray-100 border border-gray-300 rounded-lg text-lg py-2 px-4 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Price"
            name="price"
            value={form.price}
            onChange={hanclechange}
          />
          <input
            className="bg-gray-100 border border-gray-300 rounded-lg text-lg py-2 px-4 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Discount"
            name="discount_price"
            value={form.discount_price}
            onChange={hanclechange}
          />
        </div>

        {/* Product Code & Image */}
        <div className="mt-4 flex gap-4 justify-center w-full items-center">
          <input
            className="bg-gray-100 border border-gray-300 rounded-lg text-lg py-2 px-4 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Product Code"
            name="code"
            value={form.code}
            onChange={hanclechange}
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="bg-gray-100 border border-gray-300 rounded-lg text-lg py-2 px-4 w-1/3 cursor-pointer"
          />
          {preview && (
            <img
              src={preview}
              alt=""
              className="mt-2 w-16 h-16 object-cover rounded-lg border"
            />
          )}
        </div>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={hanclechange}
          className="resize-none w-full mt-4 bg-gray-100 border border-gray-300 rounded-lg text-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>

        {/* Category */}
        <select
          className="bg-gray-100 border border-gray-300 rounded-lg text-lg py-2 px-4 mt-4 w-full"
          name="category"
          value={form.category}
          onChange={hanclechange}
          disabled={loadingCategories}
        >
          <option value="">Select category</option>

          {category.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.title}
            </option>
          ))}
        </select>
        <div className="flex gap-6 mt-2 text-lg">
          <label htmlFor="" className="flex gap-1 ">
            <input
              type="checkbox"
              name="newArrival"
              checked={form.sections.newArrival}
              onChange={handleSectionchange}
              className="w-5 cursor-pointer"
            />
            New Arival
          </label>

          <label htmlFor="" className="flex gap-1 ">
            <input
              type="checkbox"
              name="featured"
              checked={form.sections.featured}
              onChange={handleSectionchange}
              className="w-5 cursor-pointer"
            />
            Featured
          </label>

          <label htmlFor="" className="flex gap-1 ">
            <input
              type="checkbox"
              name="bestSeller"
              checked={form.sections.bestSeller}
              onChange={handleSectionchange}
              className="w-5 cursor-pointer"
            />
            Best Seller
          </label>

          <label htmlFor="" className="flex gap-1 ">
            <input
              type="checkbox"
              name="specialOffer"
              checked={form.sections.specialOffer}
              onChange={handleSectionchange}
              className="w-5 cursor-pointer"
            />
            Special Offer
          </label>
        </div>

        {/* Create Button */}
        <div className="w-full flex justify-center mt-2.5">
          <button
            className="bg-blue-500 text-white py-2 px-6 rounded-2xl text-lg font-semibold hover:bg-blue-600 cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={handleSubmit}
          >
            {editingdata ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default CreateProduct;
