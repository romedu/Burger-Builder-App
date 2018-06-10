import React, {Component, Fragment} from "react";
import Class from "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
   shouldComponentUpdate(nextProps){
      return (nextProps.show !== this.props.show || (this.props.show && nextProps.children !== this.props.children));
   }

   render(){
      let styles = {
         transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
         opacity: this.props.show ? 1 : 0
      };
   
      return (
         <Fragment>
            <Backdrop hide={this.props.hideRecipe} show={this.props.show}/>
            <div className={Class.Modal} style={styles}>
               {this.props.children}
            </div>
         </Fragment>
      );
   }
};

export default Modal;