import React, { useEffect, useState } from "react";

import SofaImg from "../images/Sofa.png";
import Slider from "react-slick";
import lightimg from "../images/LightTop.png";
import BaseUrl from "../constant"
import { Link } from "react-router";
// console.log(BaseUrl);

function Banner() {
  const [bannerdata,setBannerData]=useState([])
  const [error,setError]=useState(null)
const fetchData=async()=>{
   try{
      const res=await fetch(`${BaseUrl}api/v1/banner`)
      if(res.ok){
            const data = await res.json();
            console.log(data)
        setBannerData(data.data)
      }
      if(!res.ok){
        throw new Error("failed to feth banner data")

      }
    }catch(err){
setError(err)
    }
}
  useEffect(()=>{
   fetchData()
  },[])

console.log("this is banner data",bannerdata)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true
  };
  return (
    <div className="slider-container  overflow-hidden relative">
          <img
              className=" absolute h-[300px]  top-0 z-30"
              src={lightimg}
              alt=""
            />
      <Slider {...settings} >
      
      { 
        bannerdata.map((el)=>{
            return (        
              <div className="h-[75vh]">
              <div className="flex items-center gap-7 justify-center relative bg-[#F2F0FF] h-full w-full">
                  <div className="flex flex-col gap-4 ml-55">
                    <p>{el.caption}</p>
                    <h2 className="text-[53px] font-bold ">{el.title}</h2>
                    <p>{el.description}</p>
                    <button className="w-[150px] pt-3 pb-3 pr-4 pl-4 cursor-pointer bg-[#FB2E86] text-white hover:translate-y-[0.9px] rounded-2xl text-[19px] font-bold">
                      <Link to={"/shop"}> Shop Now</Link>
                    </button>
                  </div>

                  <div className="mr-35 relative ">
                    <div className="w-[500px] ">

                    <img
                      className=" z-55 relative right-2"
                      src={el.image}
                      alt=""
                    />
                    </div>
                    <div className="bg-[#ECD2FA59] h-[457px] w-[457px] rounded-full absolute top-8 right-0 "></div>
                    <div className="bg-[#ECD2FA59] h-[457px] w-[457px] rounded-full absolute top-1 right-[-30px] "></div>
                    <div
                      className="absolute top-0 -right-17 
      w-[119px] h-[119px] bg-[#00C8FF] text-white flex flex-col items-center justify-center font-bold
      rounded-[17%_95%_50%_57%/55%_48%_52%_45%] z-555 text-[35px] text-center"
                    >
                      {el.discountText}
                    </div>
                  </div>
                </div>
              
              </div>
         
              );
        })
      }
      </Slider>
    </div>
  );
}

export default Banner;
