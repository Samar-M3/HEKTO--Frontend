import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import cartlogo from "../images/cartLogo.png";
import BaseUrl from "../constant";
import SmartImage from "../Components/SmartImage";

const Latest_products_nav = [
  { name: "New Arrival", code: "newArrival" },
  { name: "Best Seller", code:"bestSeller"},
  { name: "Featured", code:"featured" },
  { name: "Special Offer",code:"specialOffer" },
];

function Latest_products() {
  const [product_data,setProducData]=useState([])
  const [error,setError]=useState(null) 
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeLatest, setActiveLatest]=useState("newArrival")
  const fetchData=async()=>{
    try{
      const res=await fetch(`${BaseUrl}api/v1/product/latest`)
      if(res.ok){
        const data=await res.json()
        setProducData(data.data)
      }
      if(!res.ok){
        throw new Error("faled to ferch product data")
      }
    }catch(err){
      setError(err)
    }
  }
  useEffect(()=>{
    fetchData()
  },[])
useEffect(() => {
  console.log("FULL API RESPONSE:", product_data);
}, [product_data]);

  return (
    <div>
      <div className="mt-20">
        <h1 className="text-[40px] text-center ">Latest Products</h1>
        <div className="flex gap-30 mt-13 justify-center">
          {Latest_products_nav.map((link, index) => {
            return (
              <li key={index} className="list-none">
               <button className={`${activeLatest==link.code?"bg-gray-100 p-4":""}`}
         onClick={()=> setActiveLatest(link.code)
          } >
                {link.name}
                </button>
              </li>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-20 justify-center">
          {product_data.filter((el)=>el.sections?.[activeLatest]).map((el, index) => {
            return (
              <div
                key={index}
                className="h-[301px] w-[360px] mt-15 "
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="bg-[#F7F7F7] h-[269.96px] flex justify-center hover:bg-white hover:">
                  <SmartImage
                    className="h-[267.9px] "
                    src={el.image}
                    alt=""
                    width={360}
                    height={268}
                    crop="fit"
                    loading="lazy"
                  />
                </div> 
                <div className="flex gap-23 mt-2">
                  <p>{el.title}</p>
                  <p>
                    Rs. {el.discount_price}{" "}
                    <span className="ml-3 line-through">Rs.{el.price}</span>
                  </p>
                </div>
                {hoveredIndex === index && (
                  <img
                    className="h-[19px] w-[19px] relative left-3 bottom-40"
                    src={cartlogo}
                    alt=""
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Latest_products;
