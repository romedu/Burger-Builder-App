import * as actionsTypes from "../actions/actionTypes";

const INGREDIENTS_PRICE = {
   bacon: 0.75,
   salad: 0.50,
   cheese: 1,
   meat: 1.75
}

const initialState = {
   ingredients: {
      bacon: 0,
      salad: 0,
      cheese: 0,
      meat: 0
   },
   price: 3
}

const reducer = (prevState = initialState, action) => {
   switch(action.type){
      case actionsTypes.ADD_INGREDIENT: return ({
         price: prevState.price + INGREDIENTS_PRICE[action.value], 
         ingredients: {...prevState.ingredients, [action.value]: prevState.ingredients[action.value] + 1}
      });
      case actionsTypes.REMOVE_INGREDIENT: 
         if(!prevState.ingredients[action.value]) return prevState;
         return ({
            price: prevState.price - INGREDIENTS_PRICE[action.value], 
            ingredients: {...prevState.ingredients, [action.value]: prevState.ingredients[action.value] - 1}
         });
      case actionsTypes.RESET_BURGER: return initialState;
      default: break;
   }
   return prevState;
}

export default reducer;