import React, { useState } from "react";
import frontdesk from "../images/frontdesk.png"

function Contact() {
   const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Message sent successfully!");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      alert("Error sending message.");
    }
  };
  return (
    <div>
      <section className=" py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              Information About us
            </h2>
            <p className="text-gray-500 leading-relaxed max-w-md text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis
              neque ultrices mattis aliquam, malesuada diam est. Malesuada sem
              tristique amet vitae eget dolor lobortis. Accumsan faucibus vitae
              lobortis quis bibendum quam.
            </p>

            <div className="flex gap-3 mt-6">
              <span className="w-3 h-3 rounded-full bg-indigo-600"></span>
              <span className="w-3 h-3 rounded-full bg-pink-500"></span>
              <span className="w-3 h-3 rounded-full bg-cyan-400"></span>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-indigo-700 mb-6">
              Contact Way
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-full bg-indigo-600"></span>
                <div>
                  <p className="text-gray-700 font-medium">Tel: 877-67-88-99</p>
                  <p className="text-gray-400 text-sm">
                    E-Mail: shop@store.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-full bg-pink-500"></span>
                <div>
                  <p className="text-gray-700 font-medium">Support Forum</p>
                  <p className="text-gray-400 text-sm">For over 24hr</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-full bg-orange-400"></span>
                <div>
                  <p className="text-gray-700 font-medium">
                    20 Margaret st, London
                  </p>
                  <p className="text-gray-400 text-sm">
                    Great britain, 3NM98-LK
                  </p>
                </div>
              </div>

              {/* Shipping */}
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-full bg-green-400"></span>
                <div>
                  <p className="text-gray-700 font-medium">
                    Free standard shipping
                  </p>
                  <p className="text-gray-400 text-sm">on all orders.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     <section className="flex gap-4 justify-center">
        <div className="w-[750px]">
          <h1 className="font-bold text-[26px]">Get in Touch</h1>
          <p className="text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque
            ultrices tristique amet erat vitae eget dolor los vitae lobortis quis
            bibendum quam.
          </p>
          <div className="mt-5 w-[420px]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex gap-3">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="border border-gray-400 py-2 px-4"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your E-mail"
                  className="border border-gray-400 py-2 px-4"
                  required
                />
              </div>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="border border-gray-400 py-2 px-4"
                required
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="resize-none border border-gray-400 py-2 px-4 h-[100px]"
                placeholder="Type Your Message"
                required
              ></textarea>
              <button
                type="submit"
                className="py-2 px-5 bg-pink-600 text-white font-semibold"
              >
                Send Mail
              </button>
            </form>
          </div>
        </div>
        <div>
          <img
            className="h-[392px] w-[523px]"
            src={frontdesk}
            alt="front desk"
          />
        </div>
      </section>
    </div>
  );
}

export default Contact;
