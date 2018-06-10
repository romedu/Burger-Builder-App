import React, {Fragment} from "react";
import Logo from "../../UI/Logo/Logo";
import NavItems from "../NavItems/NavItems";
import Class from "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = props => (
   <Fragment>
      <Backdrop show={props.show} hide={props.hide} sideDrawer={true} />
      <div className={[Class.SideDrawer, Class[props.show ? "Open" : "Close"]].join(" ")}>
         <Logo styles={{height: "11%", marginBottom: "32px"}}/>
         <nav>
            <NavItems toggleMenu={props.toggleMenu}/>
         </nav>
      </div>   
   </Fragment>
);

export default SideDrawer;