import React from "react";
import logo from "../assets/logo.png";

function Logo({ width = "100px" }) {
  return (
    <div className="">
      <img src={logo} width={width} alt="Logo" className=" rounded-full" />
    </div>
  );
}

export default Logo;
