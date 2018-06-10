import * as actionTypes from "../actions/actionTypes";
import qwest from "qwest";
qwest.limit(1);

export const verifyToken = message => {
   let currentToken   = localStorage.getItem("token"),
       currentTime    = new Date().valueOf(),
       expirationTime = localStorage.getItem("tokenExpiration"),
       timeLeft       = expirationTime - currentTime;
   
   return dispatch => {
      if(timeLeft <= 0) return dispatch(logoutUser("Your Token Expired!"));
      qwest.get(`/token/${currentToken}`)
         .then(data => JSON.parse(data.response))
         .then(data => {
            let {status} = data,
                tokenMinsLeft;

            if((message && message.message) || (status && status !== 200 && status !== 201)){
               if(message.message) dispatch(tokenPayload(data));
               throw (message || data);
            }

            tokenMinsLeft = Math.floor(timeLeft/60000);
            dispatch(tokenPayload(data));
            dispatch(messageSetter("Reminder", `Your token will expire in ${tokenMinsLeft} minutes`));
         })
         .catch(error => dispatch(messageSetter("Error", error.message)));
   }
}

export const authenticateUser = (authType, payload) => {
   return dispatch => {
      qwest.post(`/${authType}`, payload)
         .then(data => JSON.parse(data.response))
         .then(data => {
            let {status, token, tokenExpiration} = data,
                tokenExpirationTime;

            if(status && status !== 200 && status !== 201) throw data;

            tokenExpirationTime = new Date().valueOf() + tokenExpiration * 1000;
            localStorage.setItem("token", token);
            localStorage.setItem("tokenExpiration", tokenExpirationTime);
            dispatch(tokenPayload(data));
         })
         .catch(error => dispatch(messageSetter("Error", error.message)));
   }
}

export const logoutUser = (message, messageType) => {
   return dispatch => {
      if(localStorage.getItem("token")){
         localStorage.removeItem("token");
         localStorage.removeItem("tokenExpiration");
      }  
      else message = "You are already logged out!";

         dispatch({type: actionTypes.LOGOUT_USER});
         dispatch(messageSetter(messageType || "Message", message || "Successfully logged out!"));
   }
}

const tokenPayload = (data) => ({
   ...data,
   type: actionTypes.SET_USER
});

const messageSetter = (messageType, message) => ({
   type: actionTypes.NEW_MESSAGE, 
   message,
   messageType
})