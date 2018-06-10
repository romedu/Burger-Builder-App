import React from "react";
import Ingredient from "./Ingredient/Ingredient";
import Class from "./Burger.css";

const Burger = props => {
   const types = ["Bacon", "Salad", "Cheese", "Meat"];
   let ingredients = types.reduce((acc, nextVal) => {
      for(let i = 0; i < props.ingredients[nextVal.toLowerCase()]; i++){
         acc.push(<Ingredient type={nextVal} key={nextVal + i.toString()} />);
      }
      return acc;
   }, []);

   if(ingredients.length === 0) ingredients = <p> Please add some ingredients </p>;
   return (
      <div className={props.mini ? Class.miniBurger : Class.Burger}>
         <Ingredient type="BreadTop" />
            {ingredients}
         <Ingredient type="BreadBottom" />
      </div>
   );
}

export default Burger;