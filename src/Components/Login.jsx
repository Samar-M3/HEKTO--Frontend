import React, { useState } from "react";
import BaseUrl from "../constant";
import { Link, useNavigate } from "react-router";
import Signup from "./Signup";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    const payload = { email, password };

    try {
      const res = await fetch(`${BaseUrl}api/v1/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      
      if (res.ok) {
        setSuccess("Login successful!");
        setError("");
        // Optionally save token to localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user",JSON.stringify(data.user))
        if(data.user.role=="superadmin")
        {
            navigate("/dashboard")

        }else{

          navigate("/"); 
        }
      } else {
        setError(data.message || "Login failed");
        setSuccess("");
      }
    } catch (err) {
      setError("Something went wrong");
      setSuccess("");
      console.error(err);
    }
   
  };

  return (
    <div>
      <form
        className="border h-[450px] w-[500px] m-auto mt-10 rounded flex flex-col items-center gap-6"
        onSubmit={handleSubmit}
      >
        <div>
          <h1 className="text-[36px] text-center mt-9 font-bold">LOGIN</h1>
          <p className="text-[18px] text-gray-500">
            Please login using account detail below.
          </p>
        </div>

        <input
          type="email"
          placeholder="E-mail address"
          className="mt-5 py-3 rounded px-5 w-89 border border-gray-400 text-[19px]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border-gray-400 border py-3 rounded px-5 w-89 text-[19px]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div>
          <p className="text-left w-[320px] text-gray-500">
            Forgot your password?
          </p>
          <button
            type="submit"
            className="text-center w-89 bg-pin  k-600 text-white bg-pink-600 px-8 py-3 rounded mt-4"
          >
            Sign In
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}

          <p className="text-center mt-2 text-gray-500">
            <Link to="/signup">            Don't have an account? Create account
</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
