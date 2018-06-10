import React, {Fragment} from "react";
import Button from "../UI/Button/Button";

const OrderSummary = props => {
   let ingsSummary = [];
   for(let ingName in props.ingredients){
      ingsSummary.push(<li key={ingName + "1"} style={{textTransform: "capitalize"}}> {`${ingName}: ${props.ingredients[ingName]}`} </li>);
   }

   return (
      <Fragment>
         <h3> Your Order </h3>
         <p> Your Burger has the following ingredients: </p>
         <ul>
            {ingsSummary}
         </ul>
         <p><strong> Total Price: ${props.price.toFixed(2)} </strong></p>
         <p> Proceed with your order? </p> 
         <Button type={"Danger"} proceedRequest={props.hideRecipe}> CANCEL </Button>
         <Button type={"Success"} proceedRequest={props.sendRecipe}> CONFIRM </Button>
      </Fragment>
   );
};

export default OrderSummary;