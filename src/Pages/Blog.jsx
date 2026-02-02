import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsPencil, BsPenFill, BsTwitterX } from "react-icons/bs";
import { PiEngineBold } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import recent1 from "../images/recent1.jpg";
import recent2 from "../images/recent2.jpg";
import recent3 from "../images/recent3.jpg";
import recent4 from "../images/recent4.jpg";
import sale1 from "../images/sale1.jpg";
import sale2 from "../images/sale2.jpg";
import sale3 from "../images/sale3.jpg";
import { FaFacebook, FaFacebookF } from "react-icons/fa6";
import { CiInstagram } from "react-icons/ci";
// import sale4 from "../images/sale4.jpg"
const recenetpost = [
  {
    title: "It is a long established fact",
    date: "Aug 29 2020",
    image: recent1,
  },
  {
    title: "It is a long established fact",
    date: "Aug 29 2020",
    image: recent2,
  },
  {
    title: "It is a long established fact",
    date: "Aug 29 2020",
    image: recent3,
  },
  {
    title: "It is a long established fact",
    date: "Aug 29 2020",
    image: recent4,
  },
];
const sale = [
  {
    image: sale1,
    title: "Elit ornare in enim mauris.",
    date: "Aug 09 2020",
  },
  {
    image: sale2,
    title: "Elit ornare in enim mauris.",
    date: "Aug 09 2020",
  },
  {
    image: sale3,
    title: "Elit ornare in enim mauris.",
    date: "Aug 09 2020",
  },
];
function Blog() {
  const [blog, setblog] = useState([]);
  const [error, seterror] = useState();
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/blog");
      if (res.ok) {
        const data = await res.json();
        setblog(data.data);
      }
      if (!res.ok) {
        throw new Error("failed to fetch data.");
      }
    } catch (err) {
      seterror(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex justify-center gap-10 ">
      <div>
        {blog?.length > 0 ? (
          blog.map((el) => (
            <div className=" ">
              <div className="">
                <div className=" p-3 mt-10 w-[800px] ">
                  <img
                    className="h-[453px] w-[870px]"
                    src={el.image}
                    alt="blogimage"
                  />
                  <div className="flex gap-8 mt-5">
                    <div className="flex gap-3 items-center ">
                      <BsPenFill className="size-[20px] text-[#FB2E86]" />
                      <p className="bg-[#FFE7F9] py-1 w-[170px] text-center text-[20px]">
                        {el.brand}
                      </p>
                    </div>
                    <div className="flex gap-3 items-center">
                      <SlCalender className="text-[#FFA454] size-[20px]" />
                      <p className="bg-[#FFECE2] py-1 w-[210px] text-center text-[20px]">
                        {el.date}
                      </p>
                    </div>
                  </div>
                  <h1 className="text-[30px] font-bold mt-4">{el.title}</h1>
                  <p className="font-light">{el.description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>no data</p>
        )}
      </div>
      <div className="mt-12">
        <div>
          <h1 className="font-bold text-[20px]">Search</h1>
          <div className="flex items-center mt-3">
            <input
              type="text"
              placeholder="Search for Posts"
              className="border border-gray-400 h-[30px] w-[220px] placeholder:text-[15px] placeholder:text-gray-400 py-5 px-3"
            />
            <BiSearch className="text-[20px] text-gray-400 relative right-6" />
          </div>
          <div>
            <h1 className="font-bold text-[20px] mt-4">Categories</h1>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <p className="text-gray-600 py-3 px-7 hover:bg-pink-400 hover:text-white cursor-pointer  rounded-2xl font-semibold">
                Hobbies(14)
              </p>
              <p className="text-gray-600 py-3 px-7 hover:bg-pink-400 hover:text-white cursor-pointer  rounded-2xl font-semibold">
                Women(21)
              </p>
              <p className="text-gray-600 py-3 px-7 hover:bg-pink-400 hover:text-white cursor-pointer rounded-2xl font-semibold ">
                Men(21)
              </p>
              <p className="text-gray-600 py-3 px-7 hover:bg-[#F939BF] hover:text-white cursor-pointer  rounded-2xl font-semibold">
                Articles(25)
              </p>
              <p className="text-gray-600 py-3 px-7 hover:bg-pink-400 hover:text-white cursor-pointer  rounded-2xl font-semibold">
                Furniture(25)
              </p>
              <p className="text-gray-600 py-3 px-7 hover:bg-pink-400 hover:text-white cursor-pointer rounded-2xl font-semibold ">
                Office(25)
              </p>
            </div>
          </div>

          <h1 className="font-bold text-[20px] mt-4">Recent Post</h1>
          <div className="mt-3">
            {recenetpost?.map((el) => (
              <div className="">
                <div className="flex gap-3">
                  <div className="mb-6 ">
                    <img
                      className="w-[70px] h-[51px] rounded-[6px]"
                      src={el.image}
                      alt=""
                    />
                  </div>
                  <div>
                    <p>{el.title}</p>
                    <span className="text-[14px] font-semibold text-gray-400">
                      {el.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h1 className="font-bold text-[20px] mt-4">Sale product</h1>
            <div className="mt-3">
              {sale?.map((el) => (
                <div className="flex  gap-3 mt-4">
                  <div>
                    <img
                      className="h-[57px] w-[78px] rounded-[6px]"
                      src={el.image}
                      alt=""
                    />
                  </div>
                  <div>
                    <p>{el.title}</p>
                    <span className="font-semibold text-[15px] text-gray-400">
                      {el.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h1 className="font-bold text-[20px] mt-4">Follow</h1>
            <div className="flex gap-3 mt-4">
              <a href="https://www.facebook.com/">
                <FaFacebookF className="text-white w-[35px] h-[35px]  text-[30px] bg-blue-500 rounded-4xl cursor-pointer hover:scale-107 transition-all" />
              </a>
              <a href="https://www.instagram.com/">
                <CiInstagram className="bg-pink-500 text-white h-[35px] w-[35px] rounded-2xl cursor-pointer hover:scale-107 transition-all" />
              </a>
              <a href="https://x.com/">
                {" "}
                <BsTwitterX className="bg-black text-white h-[30px] w-[35px] rounded-2xl cursor-pointer hover:scale-107 transition-all" />
              </a>
            </div>
          </div>
          <div>
            <h1 className="font-bold text-[20px] mt-4">Tags</h1>
            <div className="grid grid-cols-3  mt-2 gap-2">
              <p className="hover:text-[#FB2E86] underline decoration-black hover:decoration-[#FB2E86] cursor-pointer">General</p>
              <p className="hover:text-[#FB2E86] underline decoration-black hover:decoration-[#FB2E86] cursor-pointer">Atsanil</p>
              <p className="hover:text-[#FB2E86] underline decoration-black hover:decoration-[#FB2E86] cursor-pointer">Insas.</p>
              <p className="hover:text-[#FB2E86] underline decoration-black hover:decoration-[#FB2E86] cursor-pointer">Bibsaas</p>
              <p className="hover:text-[#FB2E86] underline decoration-black hover:decoration-[#FB2E86] cursor-pointer">Nulla.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
