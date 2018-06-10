import React from "react";
import {NavLink} from "react-router-dom";
import Class from "../PagesNav.css";

const PagesItem = props => {
   let {url, page, updatePage, symbol, current} = props;

   return (
      <NavLink to={`${url}?page=${page}`} onClick={() => updatePage(page)} className={`${Class.Item} ${current === page ? Class.Active : null}`}>
         {symbol ? symbol : page}
      </NavLink>
   );
};

export default PagesItem;