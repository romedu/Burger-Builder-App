import React from "react";
import Burger from "../../../Components/Burger/Burger";
import Class from "./Order.css";
import Button from "../../../Components/UI/Button/Button";

const Order = props => {
   let {ingredients, buyer, totalPrice, user} = props;
   let ingredientsList = [];
   let removeButton = (buyer.isAdmin && buyer.username !== user)
                      ? null
                      : <Button type="Danger" proceedRequest={props.removeOrderHandler}> Remove Order </Button>;
                      

   for(let theKey in ingredients){
      ingredientsList.push(
         <div key={theKey + "2"}>
            {`${theKey}: ${ingredients[theKey]}`}
         </div>
      )
   }

   return (
      <div className={Class.Order}>
         <Burger ingredients={ingredients} mini/>
         Ingredients:
         <ul> {ingredientsList} </ul>
         <div> Price: $ {totalPrice} </div>
         <div> Buyer: {buyer.username} </div>
         {removeButton}
      </div>
   );
};

export default Order;