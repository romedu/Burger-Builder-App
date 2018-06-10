import React from "react";
import Class from "./DrawerToggle.css";

const DrawerToggle = props => (
   <div className={Class.DrawerToggle} onClick={props.toggleMenu}>
      <div></div>
      <div></div>
      <div></div>
   </div>
);

export default DrawerToggle;