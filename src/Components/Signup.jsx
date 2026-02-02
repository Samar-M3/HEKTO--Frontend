import React, { useState } from "react";
import BaseUrl from "../constant";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    try {
      const res = await fetch(`${BaseUrl}api/v1/users/signup`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        console.log("Signup successful:", data);
        alert("Account created successfully! You can now login.");

        window.location.href = "/login";
      } else {
        console.error("Signup failed:", data);
        alert(`Error: ${data.message || "Signup failed"}`);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[500px] bg-white p-10 rounded-lg shadow border">
        <h1 className="text-4xl font-bold text-center">CREATE ACCOUNT</h1>
        <p className="text-center mt-2 text-gray-500">
          Please register using your details below.
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          {/* Full Name */}
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-4 rounded mb-4"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="E-mail address"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-4 rounded mb-4"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-4 rounded mb-4"
            required
          />

          {/* Signup button */}
          <button
            type="submit"
            className="w-full bg-pink-600 text-white p-4 rounded mt-2 hover:bg-pink-700 transition"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-pink-600 font-semibold">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
