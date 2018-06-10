import React, { Component } from 'react';
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import Toolbar from "./Components/Navigation/Toolbar/Toolbar";
import SideDrawer from "./Components/Navigation/SideDrawer/SideDrawer";
import asyncComponent from "./hoc/asyncComponent";
import Orders from "./Containers/Orders/Orders";
import {Switch, Route, Redirect, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from "./store/actions";
import * as actionTypes from "./store/actions/actionTypes";
const AsyncAuth = asyncComponent(() => import("../src/Containers/Authentication/Authentication"));
const AsyncNotFound = asyncComponent(() => import("./Components/UI/Notifications/NotFound"));

class App extends Component {
  state = {
    showSideDrawer: false
  }

  showSideDrawerHandler = () => (this.setState(prevState => ({showSideDrawer: !prevState.showSideDrawer})));

  componentDidMount(){
     let token = localStorage.getItem("token");
     if(token && token !== "undefined"){
        this.props.onTokenVerify();
     }
  }

  render() {
    let token = localStorage.getItem("token");
    let {isAdmin, username, message, onMessageClear, onNewMessage, onTokenVerify} = this.props;
    let adminRoute =  <Redirect from="/all-orders" to="/" />;

    if(token && token !== "null" && token !== "undefined"){
       if(username && !isAdmin) adminRoute = <Redirect from="/all-orders" to="/orders" />;
       else if(username && isAdmin) adminRoute = <Route path="/all-orders" render={() => <Orders message={message} verifyToken={onTokenVerify} isAdmin />} />;
       else adminRoute = <Route path="/all-orders" render={() => <Orders message={message} verifyToken={onTokenVerify} isAdmin />} />;
    }
                             
    return (
      <BrowserRouter>
         <div className="App">
            <Toolbar toggleMenu={this.showSideDrawerHandler}/>
            <SideDrawer show={this.state.showSideDrawer} hide={this.showSideDrawerHandler} toggleMenu={this.showSideDrawerHandler}/>
            <Switch>
               <Route exact path="/" render={() => <BurgerBuilder message={message} clearMessageHandler={onMessageClear} newMessageHandler={onNewMessage}/>} />
               <Route path="/orders" render={() => <Orders message={message} verifyToken={onTokenVerify}/>} />
               {adminRoute}
               <Route path="/authentication" render={() => <AsyncAuth user={username} newMessageHandler={onNewMessage}/>} />
               <Route component={AsyncNotFound} />
            </Switch>
         </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
   username: state.user.username,
   isAdmin: state.user.isAdmin,
   message: state.message
});

const mapDispatchToProps = dispatch => ({
   onTokenVerify: () => dispatch(actions.verifyToken()),
   onMessageClear: () => dispatch({type: actionTypes.CLEAR_MESSAGE}),
   onNewMessage: (messageType, message) => dispatch({type: actionTypes.NEW_MESSAGE, message, messageType})
});

export default connect(mapStateToProps, mapDispatchToProps)(App);