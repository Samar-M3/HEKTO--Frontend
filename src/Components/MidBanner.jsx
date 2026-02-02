import React from "react";
import MidBannerImage from "../images/midbannerImg.png";


function MidBanner() {
  return (
    <div>
      <div className="bg-[#E7E4F8] h-[500px] mt-20 flex items-center relative gap-0 justify-center ">
        
        <div className="h-120 w-120 bg-[#F5E1FC] rounded-full absolute left-60"></div>
        <img src={MidBannerImage} alt="" className="z-500 " />
        <div className="">
          <h1 className="text-[40px]  font-bold ">Unique Features Of leatest <br /> & Trending Poducts</h1 >
          <ul className="flex flex-col gap-2 mt-3 mb-5">

          <li>All frames constructed with hardwood solids and laminates</li>
          <li className="">
            Reinforced with double wood dowels, <br /> glue, screw - nails corner
            blocks and machine nails
          </li>
          <li>Arms, backs and seats are structurally reinforced</li>
          </ul>
          <button className="bg-[#FB2E86] mt-10 text-white py-2 px-5 text-[18px]">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default MidBanner;
