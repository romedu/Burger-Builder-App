import React from "react";
import Class from "./Button.css";

const Button = props => <button type={props.button} className={`${Class.Button} ${Class[props.type]}`} onClick={props.proceedRequest}> {props.children} </button>;

export default Button;