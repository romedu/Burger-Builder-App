import * as actionTypes from "../actions/actionTypes";

const initialState = {
   username: null,
   isAdmin: null
};

const reducer = (prevState = initialState, action) => {
   switch(action.type){
      case actionTypes.SET_USER: return {username: action.username, isAdmin: action.isAdmin};
      case actionTypes.LOGOUT_USER: return {username: null, isAdmin: null};
      default: return prevState;
   }
}

export default reducer;