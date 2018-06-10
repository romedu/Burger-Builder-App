import * as actionTypes from "../actions/actionTypes";
import qwest from "qwest";
qwest.limit(1);

export const getOrders = (all, page) => {
   return dispatch => {
      return qwest.get(`/api/order${all ? "/all" : ""}?token=${localStorage.getItem("token")}&page=${page}`)
               .then(data => JSON.parse(data.response))
               .then(data => {
                  let {status, orders, size} = data;
                  if(status && status !== 200 && status !== 201) throw data;
                  return dispatch(setOrders(orders, size));
               })
               .catch(error => dispatch(messageSetter("Error", error.message)));
   }
}

export const deleteOrder = id => {
   return dispatch => {
      return qwest["delete"](`/api/order/${id}?token=${localStorage.getItem("token")}`)
               .then(data => {
                  let {status} = data;
                  if(status && status !== 200 && status !== 201) throw data;
                  return dispatch(removeOrder(id))
               })
               .catch(error => dispatch(messageSetter("Error", error.message)));
   }
}

export const clearOrders = () => {
   return setOrders(null, null);
}

const setOrders = (orders, size) => ({
   type: actionTypes.SET_ORDERS,
   orders, 
   size
});

const removeOrder = id => ({
   type: actionTypes.REMOVE_ORDER,
   id
});

const messageSetter = (messageType, message) => ({
   type: actionTypes.NEW_MESSAGE, 
   message,
   messageType
})