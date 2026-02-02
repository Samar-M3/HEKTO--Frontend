import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast ,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import BaseUrl from "../constant";

function CreateBanner({ onClose,onBannercreated,editingdata }) {
  const [image,setimage]=useState(null)
  const [preview, setpreview]=useState(null)
  const [form,setForm]=useState({
    title:"",
    caption:"",
    discountText:"",
    description:"",
    image:""
  })
  useEffect(()=>{
    if(editingdata){
      setForm({
        title:editingdata.title,
        caption:editingdata.caption,
        discountText:editingdata.discountText,
        description:editingdata.description,
        image:""
      })
      setpreview(editingdata?.image || "")
    }
  },[editingdata])
  const notify=()=>{
    toast("all fields are requried")
  }
  const handleImageChange=(e)=>{
    const file=e.target.files[0]
    if(!file) return
    setimage(file)
    setpreview(URL.createObjectURL(file))
  }

  const handleChange=(e)=>{
    setForm({...form, [e.target.name]:e.target.value})
  }

  const handleCreate = async () => {
  try {
    if (!form.title || !form.caption || !form.discountText || !form.description) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (image) formData.append("image", image);

    const token = localStorage.getItem("token");
    const url = editingdata
      ? `${BaseUrl}api/v1/banner/${editingdata._id}`
      : `${BaseUrl}api/v1/banner`;
    const method = editingdata ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!res.ok) {
      // handle errors from backend
      const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
      toast.error(errorData.message);
      return;
    }

    // parse JSON safely
    const data = await res.json().catch(() => null);

    if (!data) {
      toast.error("Something went wrong");
      return;
    }

    // notify parent
    const updatedBanner = data.data || data; 
if (onBannercreated) onBannercreated(updatedBanner);

    // delay closing modal slightly to avoid React unmount conflicts
    if (onClose) setTimeout(() => onClose(), 50);
  } catch (err) {
    console.error("HANDLE CREATE ERROR:", err);
    toast.error("Something went wrong during update");
  }
};

  return createPortal(
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="bg-gray-100 rounded-2xl p-5">
        <div className=" ">
          <p className="font-bold text-[26px] text-center">New Banner</p>
          <span
            className="absolute right-138 font-bold text-[20px] top-45 hover:bg-gray-300 py-1 px-2 cursor-pointer"
            onClick={onClose}
          >
            X
          </span>
        </div>
        <section className="flex gap-10">
          <div className="flex flex-col mt-2">
            <input
              type="text"
              placeholder="Title"
              name="title"
              className="mt-2 py-2 px-3 bg-white rounded-2xl placeholder:text-[20px] placeholder:font-bold " onChange={handleChange}
               value={form.title}
            />
            <input
              type="text"
              placeholder="Caption"
              name="caption"
              className="mt-2 py-2 px-3 bg-white rounded-2xl placeholder:text-[20px] placeholder:font-bold " onChange={handleChange}
              value={form.caption}
            />
            <input
              type="text"
              placeholder="Discount"
              name="discountText"
              className="mt-2 py-2 px-3 bg-white rounded-2xl placeholder:text-[20px] placeholder:font-bold " onChange={handleChange} 
              value={form.discountText}
            />
          </div>
          <div className="flex items-center">
            <input
              type="file"
              className=" w-58 bg-white rounded-2xl py-2 px-5" onChange={handleImageChange}
              name="image" accept="image/*"
            />{
              preview && (
                <img src={preview} alt=""  className="mt-4 w-10 h-10 object-cover rounded-lg border relative" />
              )
            }
          </div>
        </section>
        <div className="flex mt-3 justify-center items-center">
          <textarea
            name="description"
            id=""
            className="rounded-2xl bg-white resize-none w-50 h-20 placeholder:text-[20px] placeholder:font-bold py-2 px-3 focus:border-gray-500"
            placeholder="Description"
            onChange={handleChange} 
            value={form.description}
          ></textarea>
        </div>

        <div className="mt-4 flex justify-center">
          <button className="px-9 py-3 bg-white rounded-2xl cursor-pointer hover:scale-102 transition-all hover:duration-120 hover:shadow-md hover:shadow-gray-400 " onClick={handleCreate}>
                    {editingdata ? "Update" : "Create"}

          </button>
        </div>
      </div>

      
    </div>,
    document.getElementById("modal-root")
  );
}
     
       

export default CreateBanner;
