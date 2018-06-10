import React from "react";
import Class from "../NavItems.css";
import {NavLink} from "react-router-dom";

const NavItem = props => {
   let {current, url} = props,
        cleanUrl = url.split("?")[0];

   return (
      <li className={Class.NavItem}>
         <NavLink exact={props.url === "/"} to={props.url} activeClassName={Class.active} className={current === cleanUrl ? Class.active : null} onClick={props.toggleMenu}> 
            {props.children} 
         </NavLink>
      </li>
   );
}

export default NavItem;
