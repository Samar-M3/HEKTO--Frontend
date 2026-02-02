import React from "react";
import { usecart } from "../hooks/CartContext";
import BreadCrumb from "../hooks/BreadCrumb";
import { toast } from "react-toastify";
  import { loadStripe } from "@stripe/stripe-js";

function Cartt() {
  const { cart, removecart, updateQuantity } = usecart();

  if (cart.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-2xl font-semibold">
        Your cart is empty 🛒
      </div>
    );
  }



const stripePromise = loadStripe("pk_test_51SvBGALxl7yKMmldvUawcaVJU0UWUZd9e89Fh38GhaaB9UFlompBu25LX5rydAYkWE7n6OZZWxXhJ0l3u64wcp2y00hn4KJUjJ");

const handleCheckout = async () => {
  const stripe = await stripePromise;

  const response = await fetch("http://localhost:8000/api/v1/payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cartItems: cart, 
    }),
  });

  const data = await response.json();

  window.location.href = data.url;


};



  const subtotal = cart.reduce((acc, item) => {
    const price = Number(item.price); 
    return acc + price * item.quantity;
  }, 0);

  return (
    <div className="max-w-6xl mx-auto p-6">
     
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-6 font-semibold border-b pb-3">
        <p className="col-span-2">Product</p>
        <p className="text-center">Price</p>
        <p className="text-center">Quantity</p>
        <p className="text-center">Total</p>
        <p className="text-center">Action</p>
      </div>

      {cart.map((el) => {
        const price = Number(el.price);
        const total = price * el.quantity;

        return (
          <div key={el._id} className="grid grid-cols-6 items-center py-4 border-b">
            <div className="col-span-2 flex gap-4 items-center">
              <img
                src={el.image}
                alt={el.title}
                className="w-20 h-20 object-cover rounded"
              />
              <h2 className="font-semibold">{el.title}</h2>
            </div>

            <p className="text-center">Rs. {price}</p>

            <div className="flex justify-center gap-2">
              <button
                onClick={() =>
                  updateQuantity(el._id, Math.max(1, el.quantity - 1))
                }
                className="px-2 bg-gray-200 rounded"
              >
                -
              </button>

              <span>{el.quantity}</span>

              <button
                onClick={() => updateQuantity(el._id, el.quantity + 1)}
                className="px-2 bg-gray-200 rounded"
              >
                +
              </button>
            </div>
            <p className="text-center font-semibold">Rs. {Number(total).toFixed(2)}  </p>
            <button
              onClick={() => removecart(el._id)}
              className="text-red-500 font-semibold"
            >
              Remove
            </button>
          </div>
        );
      })}

      <div className="flex justify-end mt-6">
        <div className="w-96 bg-gray-100 p-6 rounded-xl">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>Rs. {Number(subtotal).toFixed(2)}</span>
          </div>
          <div className="ml-69 mt-3">
            <button onClick={handleCheckout} className="font-bold text-lg py-2 px-4 rounded-2xl hover:bg-gray-300 cursor-pointer">Buy</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cartt;
