import React, { useEffect, useState } from "react";
import { BsMicrosoft } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { useNavigate } from "react-router";
import BaseUrl from "../constant";
import BreadCrumb from "../hooks/BreadCrumb";


function Pages() {
  const navigate=useNavigate()
  const [product_data,setProducData]=useState(null)
const [error,seterror]=useState(null)

const fetchData=async()=>{
  try{
    const res=await fetch(` ${BaseUrl}api/v1/product`)
    if(res.ok){
      const data=await res.json()
      setProducData(data.data)
    }
    if(!res.ok){
      throw new Error("failed to fetch product main data")
    }
  }catch(err){
    seterror(err)
  }
} 
  useEffect(()=>{
    fetchData()
},[])
  return (
    <div>
      <section className="flex justify-around mt-14">
       
        <div>
          <h1 className="text-[22px] font-bold ">
            Ecommerce Acceories & Fashion item{" "}
          </h1>
          <span className="text-gray-500">
            About 9,620 results (0.62 seconds)
          </span>
        </div>

        <div className="flex gap-5">
          <div className="flex items-center gap-2">
            <label htmlFor="">Per Page: </label>
            <input
              type="text"
              className="w-[55px] h-[25px]  px-3 py-2 border border-gray-400 "
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="">Sort By: </label>
            <input
              type="text"
              placeholder="Best Match"
              className="w-[125px] h-[25px] px-3 py-4 border border-gray-400 "
            />
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="" className="flex gap-2 items-center">
              View: <BsMicrosoft /> <FaListUl />
            </label>
            <input type="text" className="w-40 h-[25px] border border-gray-400 px-3 py-4" />
          </div>
          <div></div>
        </div>
      </section>

      <div className="grid grid-cols-4 grid-rows-3 mx-auto justify-items-center gap-y-8">
           {product_data?.length>0?product_data.map((el) => (
          <div key={el._id}
           onClick={
            ()=>navigate(`/product/${el._id}`)
             }
             >
            <div className="flex justify-center gap-16 mt-[100px] ">
              <div className="w-[270px] h-[379px] shadow-lg hover:bg-[#2F1AC4] hover:text-white hover:font-bold group">
                  <div className="h-[279px]  bg-[#F6F7FB] flex justify-center items-center">
                    <img className=" p-5" src={el.image} alt="" />
                  </div>
                  <div className="text-center mt-2 ">
                    <p className="text-[#FB2E86] group-hover:text-white">
                      {el.title}
                    </p>
                    <section className="flex gap-1 justify-center mt-1.5">
                      <div className="bg-cyan-400 h-1 w-3.5 "></div>
                    <div className="bg-pink-400 h-1 w-3.5  "></div>
                    <div className="bg-black h-1 w-3.5"></div>
                  </section>
                 
                  <p className=" mt-1.5">Rs.{el.price}</p>
                </div>
              </div>
            </div>
          </div>
          
        )):<div className="text-[30px] font-bold text-center mt-4">No Trending Data</div>}
      </div>

    </div>
  );
}

export default Pages;
