import React, {Fragment} from "react";
import Class from "./NavItems.css";
import NavItem from "./NavItem/NavItem";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as actions from "../../../store/actions";

const NavItems = props => {
   let token = localStorage.getItem("token");
   let {location, user, isAdmin, toggleMenu, onLogoutUser} = props;
   let allOrders = isAdmin 
                   ? <NavItem url={!token ? "/orders?page=1" : "/all-orders?page=1"} toggleMenu={toggleMenu} current={location.pathname}> 
                        All Orders 
                     </NavItem> 
                  : null;
   let varItem = user ? (<Fragment> 
                           {allOrders}
                           <NavItem url={"/orders?page=1"} toggleMenu={toggleMenu} current={location.pathname}> My Orders </NavItem>
                           <li onClick={onLogoutUser} className={Class.NavItem} style={{cursor: "pointer"}}> 
                              <a onClick={toggleMenu}>
                                 Logout
                              </a> 
                           </li>
                        </Fragment>)
                        : <NavItem url={"/authentication"} toggleMenu={toggleMenu} current={location.pathname}> Authenticate </NavItem>;

   return (
      <ul className={Class.NavItems}>
         <NavItem url={"/"} toggleMenu={toggleMenu} current={location.pathname}> Burger Builder </NavItem>
         {varItem}
      </ul>
   );
};

const mapStateToProps = state => ({
   user: state.user.username,
   isAdmin: state.user.isAdmin
});

const mapDispatchToProps = dispatch => ({
   onLogoutUser: () => dispatch(actions.logoutUser())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavItems));