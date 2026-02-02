import React, { useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import { Navigate, Outlet } from "react-router";

function ProtectedLayout() {
 const token=localStorage.getItem("token")
 const user=JSON.parse(localStorage.getItem("user") || "{}")
 
    // console.log(user.role)
    if(!token || user?.role !== "superadmin"){
        return <Navigate to="/login" replace/>
    }
  return (
    <div className="flex h-screen   ">
      <div className="w-70 h-full bg-black/70 text-white">
        <Sidebar />
      </div>
    <div className=" w-full m-5 ">
      <Outlet />
    </div>
    </div>
  );
}

export default ProtectedLayout;
