import React from "react";
import { AiFillProduct } from "react-icons/ai";
import { CgProductHunt, CgProfile } from "react-icons/cg";
import { GrDashboard } from "react-icons/gr";
import { MdPayment } from "react-icons/md";
import { PiFlagBannerBold, PiRowsDuotone } from "react-icons/pi";
import { RiOrderPlayLine } from "react-icons/ri";
import { Link } from "react-router";

const menuItem = [
  {
    title: "User",
    icon: CgProfile,
    path: "/dashboard/user",
  },
  {
    title: "Product",
    icon: CgProductHunt,
    path: "/dashboard/product",
  },
  {
    title: "Banner",
    icon: PiFlagBannerBold,
    path: "/dashboard/banner",
  },

];

function Sidebar() {
  return (
    <div>
      <div className="flex justify-center py-2 text-[23px] cursor-pointer mt-6 ">
        <h2>
          <Link to={"/dashboard"}>Dashboard</Link>
        </h2>
      </div>

      <div className="flex px-2  text-2xl flex-col mt-14 gap-4">
        {menuItem.map((item) => {
          return (
            <div className="hover:bg-gray-600">
            <div key={item.title} className="flex items-center gap-2 p-2">
              <item.icon />
              <Link to={`${item.path}`}>{item.title}</Link>
            </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
