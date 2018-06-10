import React from "react";
import PagesItem from "./PagesItem/PagesItem";
import Class from "./PagesNav.css";

const PagesNav = props => {
   let pagesLink = [],
       {page, max, url, updatePage} = props;
   let fistDisplay = page > 1 ? page === max ? page -2 : page - 1 : 1,
       lastDisplay = page + 1 > max ? max : page > 1 ? page + 1 : page + 2;

   for(let i = fistDisplay; i <= lastDisplay; i++){
      if(i === fistDisplay && page > 1) pagesLink.push(
         <PagesItem key={`oneLessPage${i}`} page={page - 1} url={url} updatePage={updatePage} symbol="<"/>
      );
      
      pagesLink.push(
         <PagesItem key={`${i}World`} page={i} url={url} updatePage={updatePage} current={page} />
      );

      if(i === lastDisplay && page < max) pagesLink.push(
         <PagesItem key={`oneMorePage${i}`} page={page + 1} url={url} updatePage={updatePage} symbol=">"/>
      );
   }

   return (
      <nav className={Class.Nav}>
         {pagesLink}
      </nav>
   )
};

export default PagesNav;