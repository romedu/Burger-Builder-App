import React from "react";
import Class from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const labelIng = ["bacon", "salad", "cheese", "meat"];

const BuildControls = props => (
   <div className={Class.BuildControls}>
      <p> Total Price: <strong> ${props.price.toFixed(2)} </strong> </p>
      {labelIng.map((ing, index) => <BuildControl label={ing} remove={props.removeIng} add={props.addIng} unavailable={props.ingredients[ing] === 0} key={index.toString() + ing} />)}
      <button className={Class.OrderButton} disabled={!props.purchasable} onClick={props.toggleRecipe}> {props.user ? "ORDER NOW" : "LOGIN TO ORDER"} </button>
   </div>
);

export default BuildControls;