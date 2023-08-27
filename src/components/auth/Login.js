import React, { useState, useEffect } from "react";
import { login } from "../../services/authService";
import userImage from "../../assets/user.svg";
import arrow from "../../assets/arrow.svg";
import { useNavigate } from "react-router-dom";
import { StaticLogo } from "./StaticLogo";
import jwtDecode from "jwt-decode";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginCheck, setloginCheck] = useState(true);
  const [keepSignedIn, setkeepSignedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie("jwt");
    const decodedToken = jwtDecode(token);
    console.log(token);
  });
  const getCookie = (name) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");

    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  };
  const handleLogin = async () => {
    try {
      if (!username || !password) {
        setloginCheck(false);
        return;
      }
      setloginCheck(true);
      const token = await login(username, password);
      // Handle success, maybe store the token and redirect
      navigate("/dashboard");
      console.log(`Received login token ${token}`);
    } catch (error) {
      // Handle error, show an error message
      console.log(`Error while login ${error}`);
    }
  };

  return (
    <div className=" h-full flex ">
      <StaticLogo text="Welcome Back!" />
      <div className=" min-h-full min-w-[50%] flex flex-col justify-center items-center ">
        <div className="flex flex-col w-[35%] text-[#474747] text-sm ">
          <label className=" mb-6 text-base font-semibold ">
            Login to your Account
          </label>
          <div className="input-container">
            <label className=" flex flex-col font-medium text-sm font-[Inter] ">
              Username
            </label>
            <input
              className=" mt-2 border-none bg-[#f5f5f5] h-12 rounded-md pl-[35px] font-[Inter] text-base font-normal "
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <img
              src={userImage}
              alt="username"
              className=" relative top-[-38px] left-1 h-7 w-7 "
            />
          </div>
          <div className="input-container">
            <label className=" flex flex-col font-medium text-sm font-[Inter] ">
              Password
            </label>
            <input
              className=" mt-2 border-none bg-[#f5f5f5] h-12 rounded-md pl-[10px] font-[Inter] text-base font-normal "
              type="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className=" flex text-xs font-normal items-center mb-4 mt-2 ">
            <input
              className=" accent-[#1a5de0] mr-2 "
              type="checkbox"
              value={keepSignedIn}
              onChange={(e) => setkeepSignedIn(e.target.value)}
            ></input>
            <label className=" font-[Inter] text-base font-normal ">
              Keep me Signed in
            </label>
          </div>
          {!loginCheck && (
            <label className=" text-[red] mb-1 text-xs font-light ">
              Please provide credentials
            </label>
          )}
          <button
            className=" h-12 w-fit px-2 rounded-md bg-[#1a5de0] text-[#ffffff] font-[Inter] text-base font-medium mb-6 "
            onClick={handleLogin}
          >
            <div className=" flex justify-center items-center ">
              <label className=" font-[Inter] text-base font-medium ">
                Proceed
              </label>{" "}
              <img src={arrow} />
            </div>
          </button>
          <div className=" flex flex-col gap-6 ">
            <button
              className=" underline text-[#1a5de0] flex items-start justify-start "
              onClick={() => navigate("/register")}
            >
              <label className=" font-[Inter] text-base font-medium ">
                Sign Up
              </label>
            </button>
            <button
              className=" underline text-[#1a5de0] flex items-start justify-start text-left "
              onClick={() => navigate("/forgot-password")}
            >
              <label className=" font-[Inter] text-base font-medium ">
                Forgot Password
              </label>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
