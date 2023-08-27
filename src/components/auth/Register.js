import React, { useState } from "react";
import { register } from "../../services/authService";
import { StaticLogo } from "./StaticLogo";
import arrow from "../../assets/arrow.svg";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [check, setcheck] = useState(true);
  const [message, setmessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      setmessage("Please provide a valid email");
      setcheck(false);
      return;
    }
    try {
      if (!username || !password || !email || !confirmPassword) {
        setmessage("Please provide username, password and email");
        setcheck(false);
        return;
      }
      if (password !== confirmPassword) {
        setmessage("Both passwords should be same");
        setcheck(false);
        return;
      }
      setcheck(true);
      await register(firstName, lastName, username, email, password);
      // Handle success, maybe redirect or show a success message
    } catch (error) {
      // Handle error, show an error message
    }
  };

  return (
    <div className=" h-full flex ">
      <div className=" w-[50%] ">
        <StaticLogo text="Register yourself with Us!" />
      </div>
      <div className=" min-h-full w-[50%] flex flex-col justify-center items-center ">
        <div className="flex flex-col text-[#474747] text-sm ">
          <label className=" mb-6 text-base font-semibold ">
            Create New Account
          </label>
          <div className=" flex flex-col gap-6 ">
            <div className=" flex flex-row gap-6 ">
              <div className=" flex flex-col ">
                <label className=" font-[Inter] text-sm font-medium ">
                  First Name
                </label>
                <input
                  className="  mt-2 border-none bg-[#f5f5f5] h-12 rounded-md pl-[10px] font-[Inter] text-base font-normal "
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                ></input>
              </div>
              <div className=" flex flex-col ">
                <label className=" font-[Inter] text-sm font-medium ">
                  First Name
                </label>
                <input
                  className="  mt-2 border-none bg-[#f5f5f5] h-12 rounded-md pl-[10px] font-[Inter] text-base font-normal "
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                ></input>
              </div>
            </div>
            <div className=" flex flex-col ">
              <label className=" font-[Inter] text-sm font-medium ">
                Username
              </label>
              <input
                className="  mt-2 border-none bg-[#f5f5f5] h-12 rounded-md pl-[10px] font-[Inter] text-base font-normal "
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              ></input>
            </div>
            <div className=" flex flex-col ">
              <label className=" font-[Inter] text-sm font-medium ">
                Email Address
              </label>
              <input
                className="  mt-2 border-none bg-[#f5f5f5] h-12 rounded-md pl-[10px] font-[Inter] text-base font-normal "
                type="text"
                placeholder="Email address"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              ></input>
            </div>
            <div className=" flex flex-row gap-6 ">
              <div className=" flex flex-col ">
                <label className=" font-[Inter] text-sm font-medium ">
                  Set Password
                </label>
                <input
                  className="  mt-2 border-none bg-[#f5f5f5] h-12 rounded-md pl-[10px] font-[Inter] text-base font-normal "
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                ></input>
              </div>
              <div className=" flex flex-col ">
                <label className=" font-[Inter] text-sm font-medium ">
                  Confirm Password
                </label>
                <input
                  className="  mt-2 border-none bg-[#f5f5f5] h-12 rounded-md pl-[10px] font-[Inter] text-base font-normal "
                  type="password"
                  placeholder="Password"
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                ></input>
              </div>
            </div>
            {!check && (
              <label className=" text-[red] mb-1 text-xs font-light ">
                {message}
              </label>
            )}
            <button
              className=" h-12 w-fit px-8 py-4 flex items-center rounded-md bg-[#1a5de0] text-[#ffffff] font-[Inter] text-base font-medium mb-6 "
              onClick={handleRegister}
            >
              <div className=" flex justify-center items-center ">
                <label className=" font-[Inter] text-base font-medium ">
                  Sign Up
                </label>{" "}
                <img src={arrow} />
              </div>
            </button>
            <div className=" flex flex-row items-center gap-4 ">
              <label className=" text-sm font-medium ">Existing User?,</label>
              <button
                className=" underline text-[#1a5de0] flex items-start justify-start text-left "
                onClick={() => navigate("/login")}
              >
                <label className=" font-[Inter] text-base font-medium ">
                  Login
                </label>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
