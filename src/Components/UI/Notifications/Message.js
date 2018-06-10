import React from "react";
import Modal from "../Modal/Modal";

const Message = (props) => {
   return (
      <Modal show={true} hideRecipe={props.clear}>
         <h2> {props.label} </h2>
         {props.children}
      </Modal>
   );
};

export default Message;