import React, { useEffect, useState } from "react";
import BaseUrl from "../constant";
import { BsPenFill } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";

function Latest_Blog() {
  const [blogdata, setblogdata] = useState([]);
  const [error, seterror] = useState(null);
  const fetchData = async () => {
    try {
      const res = await fetch(`${BaseUrl}api/v1/blog`);
      if (res.ok) {
        const data = await res.json();
        setblogdata(data.data);
      }
      if (!res.ok) {
        throw new Error("failed to fetch blog");
      }
    } catch (err) {
      seterror(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
          <div className="mt-19 ">
            <h1 className="text-[38px] font-bold text-center mb-12">
              Latest Blog
            </h1>
            <section className="flex gap-7 justify-around flex-wrap ">
      {blogdata.map((el) => {
        return (
              <div className="h-[453px] w-[370px] group hover:transform hover:scale-101 transition-all shadow-lg rounded-2xl">
                <div className="overflow-hidden">
                  <img className="group-hover:scale-110 object-cover transition-all" src={el.image}alt="image" />
                </div>
                <div className="flex gap-7 my-3 mx-3 ">
                  <div className="flex items-center gap-1.5">
                  <BsPenFill className=" text-[#FB2E86] size-3"/>
                  <span>{el.brand}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                  <SlCalender className="text-[#FFA454] size-3"/>
                  <span>{el.date}</span>
                  </div>
                </div>

                <div className="mx-3">
                  <h2 className="text-[20px] font-semibold mb-2 group-hover:text-[#FB2E86] transition-all">
                    {el.title}
                  </h2>
                  <p className="text-gray-500">{el.description}</p>
                  <button className="underline mt-3 cursor-pointer group-hover:text-[#FB2E86] hover:transform hover:scale-101 transition-all">
                    Read More
                  </button>
              </div>
                </div>
            );
          })}
            </section>
          </div>
    </div>
  );
}

export default Latest_Blog;
