import React from "react";
import Class from "./Backdrop.css";

const Backdrop = props => props.show ? <div className={`${Class.Backdrop} ${props.sideDrawer ? Class.SideDrawerDrop : null}`} 
                                       onClick={props.hide}></div> 
                                     : null;

export default Backdrop;