import * as actionTypes from "../actions/actionTypes";

const initialState = {
   message: null,
   messageType: "Message"
};

const reducer = (prevState = initialState, action) => {
   switch(action.type){
      case actionTypes.NEW_MESSAGE: return {message: action.message, messageType: action.messageType};
      case actionTypes.CLEAR_MESSAGE: return initialState;
      default: return prevState;
   }
}

export default reducer;