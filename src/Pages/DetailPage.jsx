import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import BaseUrl from "../constant";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { BiHeart } from "react-icons/bi";
import { usecart } from "../hooks/CartContext";
import axios from "axios";
import { toast } from "react-toastify";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState(null);
  const [error, setError] = useState(null);
  const { addtoCart } = usecart();

  const toggleWishlist = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const res = await fetch(`${BaseUrl}api/v1/users/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) throw new Error("Update failed");
      const data = await res.json();
      if ((data.status = "added")) {
        toast(`${data.product.title} added to wishlist ❤️`);
      }
      if (data.status === "removed") {
        toast(`${data.product.title} removed from wishlist 💔`);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch(`${BaseUrl}api/v1/product/${id}`);
      if (res.ok) {
        const data = await res.json();
        setProductDetails(data);
      }
      if (!res.ok) {
        throw new Error("faled to ferch product data");
      }
    } catch (err) {
      setError(err);
    }
  };

  console.log("this is product", productDetails);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/* {JSON.stringify(productDetails)} */}
      {productDetails && (
        <div className="h-[600px] flex items-center justify-center  ">
          <section className="flex mt-15 p-10 shadow-lg">
            <div className="bg-[#fffcfc] p-3">
              <img
                className="h-[447px] w-[500px] p-3 "
                src={productDetails.image}
                alt=""
              />
            </div>

            <div className="flex flex-col justify-center text-left  w-90 p-3 ">
              <div className="flex gap-4 ">
                <span>Rs. {`${productDetails.price}`}</span>
                <span className="line-through text-red-500">
                  Rs. {`${productDetails.discount_price}`}
                </span>
              </div>
              <p className="text-[26px] font-bold">{productDetails.title}</p>
              <p className="text-">{productDetails.description}</p>
              <button
                className="flex font-medium text-[20px] cursor-pointer"
                onClick={() => addtoCart(productDetails)}
              >
                <span className="hover:font-bold">Add to cart</span>
              </button>
              <span
                onClick={() => toggleWishlist(productDetails._id)}
                className="absolute top-68 right-87 text-[28px] cursor-pointer"
              >
                <BiHeart />
              </span>
              <div className="mt-3">
                <p className="font-bold text-[20px]">Category:</p>
                <p className="font-bold text-[20px]">Tags:</p>
                <p className="flex gap-3 items-center font-bold text-[20px]">
                  Share: <FaFacebook /> <BsInstagram /> <BsTwitter />
                </p>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
export default DetailPage;
