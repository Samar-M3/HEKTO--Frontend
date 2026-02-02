import React from "react";
import truck from "../images/truck.png";
import coin from "../images/coin.jpg";
import twenty from "../images/24.jpg";
import medal from "../images/medal.png";

const offer_data = [
  {
    title: "24/7 Support",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.",
    image: truck,
  },
  {
    title: "24/7 Support",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.",
    image: coin,
  },
  {
    title: "24/7 Support",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.",
    image: twenty,
  },
  {
    title: "24/7 Support",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.",
    image: medal,
  },
];

function Shopex_Offer() {
  return (
    <div>
      <section className="mt-15">
        <h1 className="text-center text-[42px] font-bold">What Shopex Offer!</h1>
        <div className="flex justify-center gap-9 ">

        {offer_data.map((el) => {
          return (
            <div className="mt-6">
              <div className="h-70 w-[270px] shadow-lg ">
                <div className="h-[px] flex justify-center">
                  <img className="h-[150px]" src={el.image} alt="" />
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
