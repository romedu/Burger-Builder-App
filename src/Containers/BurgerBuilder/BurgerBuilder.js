import React, {Component} from "react";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/OrderSummary/OrderSummary";
import Loader from "../../Components/UI/Loader/Loader";
import Message from "../../Components/UI/Notifications/Message";
import {connect} from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import * as apiCalls from "../../apiCalls";

class BurgerBuilder extends Component {
   state = {
      receipt: false,
      sendingData: false
   }

   componentDidUpdate(){
      let token = localStorage.getItem("token");
      let {ingredients, totalPrice, username, onBurgerReset, newMessageHandler} = this.props;
      if(this.state.sendingData && username){
         try {
            if(!token || token === "null" || token === "undefined") throw new Error("Invalid/Expired Token. You should consider relogging");
            apiCalls.saveOrder({ingredients, totalPrice}, this.toggleReceiptHandler.bind(this, true), onBurgerReset.bind(this), newMessageHandler.bind(this));
         }
         catch(error){
            newMessageHandler("Error", error.message);
            this.setState(prevState => ({receipt: false, sendingData: false}))
         }
      }
   }

   toggleReceiptHandler = hide => {
      this.setState(prevState => ({receipt: (hide ? false : !prevState.receipt), sendingData: false}));
   }

   makeOrder = () => {
      this.setState(prevState => {
         if(prevState.sendingData) return null;
         return {sendingData: true};
      })
   }

   render(){
      let {receipt, sendingData} = this.state;
      let {ingredients, totalPrice, username, message, clearMessageHandler} = this.props;
      let infoMessage = message.message ? <Message clear={clearMessageHandler} label={message.messageType}> {message.message} </Message> : null;
      let purchasable = false;
      let orderContent = sendingData ? <Loader /> 
                        : <OrderSummary ingredients={ingredients} hideRecipe={() => this.toggleReceiptHandler(true)} 
                           sendRecipe={this.makeOrder} price={totalPrice} />;
      for(let key in ingredients){
          if(ingredients[key] && username) purchasable = true;
      }
      
      return (
         <main style={{marginTop: "72px"}}>
            {infoMessage}
            <Burger ingredients={ingredients}/>
            <BuildControls user={username} ingredients={ingredients} price={totalPrice} purchasable={purchasable} 
                           toggleRecipe={() => this.toggleReceiptHandler(false)} addIng={this.props.onIngredientAdd} 
                           removeIng={this.props.onIngredientRemove}/>
            <Modal show={receipt} hideRecipe={sendingData ? null : () => this.toggleReceiptHandler(true)}>
               {orderContent}
            </Modal>
         </main>
      );
   }
}

const mapStateToProps = state => ({
   ingredients: state.burger.ingredients,
   totalPrice: state.burger.price,
   username: state.user.username
});

const mapDispatchToProps = dispatch => ({
   onIngredientAdd: (ingredient) => dispatch({type: actionTypes.ADD_INGREDIENT, value: ingredient}),
   onIngredientRemove: (ingredient) => dispatch({type: actionTypes.REMOVE_INGREDIENT, value: ingredient}),
   onBurgerReset: () => dispatch({type: actionTypes.RESET_BURGER})
});

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);