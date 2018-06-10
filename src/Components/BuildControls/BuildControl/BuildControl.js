import React from "react";
import Class from "./BuildControl.css";

const BuildControl = props => (
   <div className={Class.BuildControl}>
      <div className={Class.Label}> {props.label} </div>
      <button className={Class.Less} onClick={() => props.remove(props.label)} disabled={props.unavailable}> Less </button>
      <button className={Class.More} onClick={() => props.add(props.label)}> More </button>
   </div>
);

export default BuildControl;