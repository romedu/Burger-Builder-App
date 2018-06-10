import React, { Component } from "react";
import {Redirect, withRouter} from "react-router-dom";
import Loader from "../../Components/UI/Loader/Loader";
import Order from "./Order/Order";
import Message from "../../Components/UI/Notifications/Message";
import PagesNav from "../../Components/Navigation/PagesNav/PagesNav";
import {connect} from "react-redux";
import Class from "./Orders.css";
import * as actions from "../../store/actions";
import * as actionTypes from "../../store/actions/actionTypes";

class Orders extends Component {
   constructor(props){
      super(props);
      let query = null;
      if(props.location.search.length){
         let parsedQuery = props.location.search.substring(1).split("&");
         query = parsedQuery.reduce((acc, nextVal) => {
            let keyValPair = nextVal.split("=");
            acc[keyValPair[0]] = keyValPair[1];
            return acc;
         }, {});
      }

      this.state = {
         queryParams: query, 
         loading: false
      };
   }

   componentDidMount(){
      let {queryParams} = this.state;
      let {user, isAdmin, onOrdersGet, onLogoutUser, verifyToken} = this.props;
      let token = localStorage.getItem("token");
      if(user){
         if(token && token !== "null" & token !== "undefined"){
            let page = queryParams && queryParams.page ? Number(queryParams.page) : null;
            if(isAdmin){
               onOrdersGet(true, page);
            } else {
               onOrdersGet(false, page);
            }
         } else onLogoutUser("You must login first!", "Reminder");
      } else if(token && token !== "null" & token !== "undefined") verifyToken();
   }

   componentDidUpdate(prevProps, prevState){
      let {queryParams} = this.state;
      let {location, user, isAdmin, onOrdersGet} = this.props;
      if(location.pathname !== prevProps.location.pathname || user !== prevProps.user || (user && queryParams && queryParams.page && prevState.queryParams && queryParams.page !== prevState.queryParams.page)){
         let page = queryParams && queryParams.page ? Number(queryParams.page) : null;
         if(user){
            if(isAdmin){
               onOrdersGet(true, page);
            } else {
               onOrdersGet(false, page);
            }
         }
      }
      
      if((location.search.length && location.search !== prevProps.location.search) || (location.pathname !== prevProps.location.pathname)){
         this.getQueryParams();
      }
   }

   componentWillUpdate(nextProps){
      if(this.props.location.pathname !== nextProps.location.pathname){
         this.props.onOrdersClear();
      }
   }

   componentWillUnmount(){
      this.props.onOrdersClear();
   }

   getQueryParams = () => {
      this.setState(prevState => {
         let parsedQuery = this.props.location.search.substring(1).split("&");
         let queryParams = parsedQuery.reduce((acc, nextVal) => {
            let keyValPair = nextVal.split("=");
            acc[keyValPair[0]] = keyValPair[1];
            return acc;
         }, {});

         return ({
            ...prevState, 
            queryParams: {...queryParams}, 
            loading: false
         });
      });
   }

   updateCurrentPage = num => {
      let {page} = this.state.queryParams;

      if(num === Number(page)) return;
      this.setState(prevState => {
         return ({
            ...prevState,
            queryParams: {
               ...prevState.queryParams,
               page: num
            },
            loading: true
         });
      });
   };

   render(){
      let {queryParams, loading} = this.state;
      let {orders, ordersSize, user, message, location, onMessageClear} = this.props;
      let token = localStorage.getItem("token");
      let infoMessage = message.message ? <Message clear={onMessageClear} label={message.messageType}> {message.message} </Message> : null;
      let orderList = <p> Sorry you have no orders </p>;
      let leavePage = null;
      let page = queryParams && queryParams.page ? Number(queryParams.page) : null;
      let pageNav = (page && orders && Number(page) === page && Math.ceil(ordersSize / 10) >= page && Math.ceil(ordersSize / 10) > 1) 
                    ? <PagesNav page={page} max={Math.ceil(ordersSize / 10)} url={location.pathname} updatePage={this.updateCurrentPage}/>
                    : null;
      
      if(!user || !token || token === "null" || token === "undefined" || message.messageType === "Error"){
         if(message && message.message){
            leavePage = <Redirect to={`${message.messageType === "Reminder" ? "/authentication/login" : "/"}`}/>;
         } else if(!user && (!token || token === "null" || token === "undefined")){
            leavePage = <Redirect to="/"/>;
         }
      }

      if(orders && orders.length){
         orderList = orders.map((order, index) => <Order key={order._id} {...order} user={user}
                                                   removeOrderHandler={() => this.props.onOrdersRemove(order._id)} />);
      }

      return (
         <div className={!orders ? Class.loading : Class.content}>
            {leavePage}
            {infoMessage}
            {orders && !loading ? orderList : <Loader />}
            {!loading ? pageNav : null}
         </div>
      )
   }
};

const mapStateToProps = state => ({
   orders: state.orders.orders,
   ordersSize: state.orders.size,
   user: state.user.username
})

const mapDispatchToProps = dispatch => ({
   onOrdersGet: (all, page) => dispatch(actions.getOrders(all, page)),
   onOrdersClear: () => dispatch(actions.clearOrders()),
   onOrdersRemove: id => dispatch(actions.deleteOrder(id)),
   onMessageClear: () => dispatch({type: actionTypes.CLEAR_MESSAGE}),
   onLogoutUser: (message, messageType) => dispatch(actions.logoutUser(message, messageType))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Orders));