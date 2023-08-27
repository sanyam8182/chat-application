import React from "react";
import logo from "../../assets/G1614.svg";

export const StaticLogo = ({ text }) => {
  return (
    <div className=" min-h-full min-w-[50%] bg-[#1a5de0] flex flex-col justify-center items-center ">
      <img src={logo} className=" mb-9 h-[28px] w-[28px] " />
      <label className="text-[#ffffff] text-base font-semibold ">{text}</label>
    </div>
  );
};
