import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Login() {
  const [password, setPassword] = useState("");
  const correctPassword = "123456789";
  const [status, setStatus] = useState();
  const navigate = useNavigate();
  const validate = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      localStorage.setItem("password", password);
      navigate("/home");
    } else {
      setStatus("Incorrect Password");
      setTimeout(() => setStatus(""), 3000);
    }
  };
  return (
    <div className="w-full comic-neue-regular bg-hero2-pattern bg-cover  min-h-screen flex flex-col gap-4 justify-center items-center ">
      <div className="flex  flex-col gap-4">
        <h1 className="text-xl font-medium text-center  sm:w-auto">
          Please enter the password to access the website
        </h1>
        <form
          onSubmit={validate}
          className="flex justify-center w-screen px-2 sm:w-auto items-center gap-4"
        >
          {" "}
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="form-control text-xl w-11/12 sm:w-8/12 h-12 rounded-xl border-gray-950 border-4 outline-none shadow-[3px_5px_0px_0px_rgba(0,0,0)] px-4  py-2 "
          />
          <button
            type="submit"
            className="bg-[#fff200]  hover:bg-[#fff200]/80  border-gray-950 border-4 text-black shadow-[3px_5px_0px_0px_rgba(0,0,0)] text-xl font-semibold py-2 px-4 sm:px-8 rounded-md"
          >
            Submit
          </button>
        </form>
        <p className="text-red-600 font-semibold underline  text-center">
          {status}
        </p>
      </div>
    </div>
  );
}
