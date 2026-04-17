import React from "react";
import { FaClock, FaHeadset, FaMedal, FaTruck } from "react-icons/fa";

const offer_data = [
  {
    title: "24/7 Support",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.",
    icon: FaHeadset,
  },
  {
    title: "24/7 Support",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.",
    icon: FaTruck,
  },
  {
    title: "24/7 Support",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.",
    icon: FaClock,
  },
  {
    title: "24/7 Support",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.",
    icon: FaMedal,
  },
];

function Shopex_Offer() {
  return (
    <div>
      <section className="mt-15">
        <h1 className="text-center text-[42px] font-bold">What Shopex Offer!</h1>
        <div className="flex justify-center gap-9 ">

        {offer_data.map((el) => {
          const Icon = el.icon;
          return (
            <div className="mt-6">
              <div className="h-70 w-[270px] shadow-lg ">
                <div className="h-[px] flex justify-center">
                  <div className="h-[150px] flex items-center justify-center">
                    <Icon className="h-18 w-18 text-[#FB2E86]" aria-hidden="true" />
                  </div>
                </div>
                <div className="text-center mt-4 font-bold">
                  <p>{el.title}</p>
                </div>
                <div className="text-center">
                  <p>{el.description}</p>
                </div>
              </div>
            </div>
          );
        })}
        </div>

      </section>
    </div>
  );
}

export default Shopex_Offer;
