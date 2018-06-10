import React from "react";
import Class from "./Toolbar.css";
import Logo from "../../UI/Logo/Logo";
import NavItems from "../NavItems/NavItems";
import DrawerToggle from "../DrawerToggle/DrawerToggle";

const Toolbar = props => (
   <header className={Class.Toolbar}>
      <DrawerToggle toggleMenu={props.toggleMenu}/>
      <Logo styles={{height: "80%"}}/>
      <nav className={Class.DesktopOnly}>
         <NavItems />
      </nav>
   </header>
);

export default Toolbar;