import React from "react";
import burgerLogo from "../../../assets/images/burger-logo.png";
import Class from "./Logo.css";

const Logo = props => (
   <div className={Class.Logo} style={props.styles}>
      <img src={burgerLogo} alt="Hello World"/>
   </div>
)

export default Logo;