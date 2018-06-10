import * as actionTypes from "../actions/actionTypes";

const initialState = {
   orders: null,
   size: null
};

const reducer = (prevState = initialState, action) => {
   switch(action.type){
      case actionTypes.SET_ORDERS: return {orders: action.orders, size: action.size};
      case actionTypes.REMOVE_ORDER: return {orders: prevState.orders.filter(order => order._id !== action.id), size: prevState.size - 1};
      default: return prevState;
   }
}

export default reducer;