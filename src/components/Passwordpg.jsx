import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgimg from '../assets/bgpic.png'
export default function Passwordpg() {
  const [password, setPassword] = useState("");
  const correctPassword = "sketch1234";
  const [status, setStatus] = useState();
  const navigate = useNavigate();
  const validate = () => {
    if (password === correctPassword) {
      localStorage.setItem("password", password);
      navigate("/home");
    } else {
      setStatus("Incorrect Password");
      setTimeout(() => setStatus(""), 5000);
    }
  };
  return (
    <div className="w-full comic-neue-regular bg-hero-pattern bg-cover  h-screen flex flex-col gap-4 justify-center items-center ">
      <h1 className="text-xl text-center w-10/12 sm:w-auto">
        Please enter the password to access the website
      </h1>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="form-control text-xl sm:w-4/12 h-14 rounded-xl border-gray-950 border-4 outline-none shadow-[3px_5px_0px_0px_rgba(0,0,0)] px-4  py-2 "
      />
      <button
        onClick={validate}
        className="bg-[#fff200]  hover:bg-[#fff200]/80  border-gray-950 border-4 text-black shadow-[3px_5px_0px_0px_rgba(0,0,0)] text-xl font-semibold py-2 px-8 rounded-md"
      >
        Submit
      </button>
      <p>{status}</p>
    </div>
  );
}
