import React from "react";
import Class from "./Ingredient.css";

const Ingredient = props => {
   let theIngredient = <div className={Class[props.type]}></div>;

   if(props.type === "BreadTop"){
      theIngredient = (
         <div className={Class.BreadTop}>
            <div className={Class.Seeds1} />
            <div className={Class.Seeds2} />
         </div>   
      );
   }
   return theIngredient;
}

export default Ingredient;