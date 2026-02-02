import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import BaseUrl from "../constant";
import { useNavigate } from "react-router";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute top-1/2 -translate-y-1/2 right-2 z-10 w-8 h-8 bg-red-500 flex items-center justify-center rounded-full cursor-pointer"
    >
      ➤
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute top-1/2 -translate-y-1/2 left-2 z-10 w-8 h-8 bg-red-500 flex items-center justify-center rounded-full cursor-pointer rotate-180"
    >
      ➤
    </div>
  );
}

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  arrows: true,
  autoplaySpeed: 3000,
  dotsClass: "slick-dots !bottom-4",
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

function New_Products() {
  const [productData, setProducData] = useState([]);
  const [error, setError] = useState(null);
  const navigate=useNavigate()
  const fetchData = async () => {
    try {
      const res = await fetch(`${BaseUrl}api/v1/product`);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setProducData(data.data);
      }
      if (!res.ok) {
        throw new Error("failed to fetch product data");
      }
    } catch (err) {
      setError(err);
    }
  };
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div className="">
      <Slider {...settings}>
        {productData?.length>0? productData.map((el) => (
          <div key={el._id} onClick={()=>navigate(`/product/${el._id}`)}>
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
                  <p className=" mt-1.5">{el.code}</p>
                  <p className=" mt-1.5">Rs. {el.price}</p>
                </div>
              </div>
            </div>
          </div>
          
        )):<div className="text-[30px] font-bold text-center mt-4">No Trending Data</div>}
      </Slider>
    </div>
  );
}

export default New_Products;
