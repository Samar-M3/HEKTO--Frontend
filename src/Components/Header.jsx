import React, { useState } from "react";
import { CiMail, CiPhone, CiShoppingCart } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router";

const navitems = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/pages" },
  { name: "Blog", path: "/blog" },
  { name: "Shop", path: "/shop" },
  { name: "Contact", path: "/contact" },
];

const login = [{ name: "Login", path: "/login" }];

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className=" ">
      {/* TOP BAR */}
      <div className="flex justify-around bg-purple-700 p-2 text-white">
        <div className="flex gap-2 items-center">
          <CiMail className="h-5 w-5" />
          <p className="mr-4">mhhasanul@gmail.com</p>
          <CiPhone className="h-5 w-5" />
          <p>(12345)67890</p>
        </div>

        <ul className="flex gap-6 items-center">
          {/* LANGUAGE */}
          <li>
            <button
              onClick={() => setOpen(!open)}
              className="hover:font-bold"
            >
              English ▼
            </button>

            {open && (
              <ul className="absolute mt-2 bg-white text-black border rounded shadow">
                {["Nepali", "Hindi", "Japanese", "Chinese", "Newari"].map(lang => (
                  <li
                    key={lang}
                    className="px-4 py-2 hover:bg-gray-300 cursor-pointer"
                  >
                    {lang}
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li className="hover:font-bold cursor-pointer">USD</li>

          {/* LOGIN */}
          {login.map(el => (
            <li key={el.path} className="hover:font-bold cursor-pointer">
              <Link to={el.path}>{el.name}</Link>
            </li>
          ))}
          <Link to="/wishlist">
          <li className="hover:font-bold cursor-pointer">Wishlist</li>
          </Link>

          {/* CART */}
          <li>
            <Link to="/mycart">
              <CiShoppingCart className="h-6 w-6" />
            </Link>
          </li>

          {/* USER */}
          <Link to="/profile">
          <li>
            <FaRegUser className="h-5 w-5" />
          </li>
          </Link>
        </ul>
      </div>

      {/* MAIN NAV */}
      <div className=" flex justify-around items-center bg-white p-4 shadow ">
        <span className="text-3xl">
          <Link to="/">HEKTO</Link>
        </span>

        <ul className="flex gap-8">
          {navitems.map(item => (
            <li key={item.path} className="list-none">
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>

        <div className="flex">
          <input
            type="text"
            placeholder="Search"
            className="border p-2"
          />
          <button className="bg-pink-400 p-2">
            <IoSearchOutline className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
