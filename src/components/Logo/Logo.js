import React from "react";
import Logo from "../../assests/Images/burger-logo.png";
import "./Logo.css";
const logo = props => (
  <div className="Logo" style={{ height: props.height }}>
    <img src={Logo} alt="logo" />
  </div>
);

export default logo;
