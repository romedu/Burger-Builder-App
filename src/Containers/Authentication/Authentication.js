import React, {Component} from "react";
import {Route, Redirect, Switch, withRouter} from "react-router-dom";
import AuthForm from "../../Components/AuthForm/AuthForm";

class Authentication extends Component {
   componentDidMount(){
      let token = localStorage.getItem("token");
      if(token && token !== "null" & token !== "undefined") this.props.newMessageHandler("Error", "You are already logged in!"); 
   }
   render(){
      let {user, match} = this.props;
      return (
         <div>
            <Switch>
               <Route path={`${match.path}/login`} render={() => <AuthForm type="login" user={user}/>} />
               <Route path={`${match.path}/register`} render={() => <AuthForm type="register" user={user}/>} />
               <Redirect from="/" to={`${match.path}/login`} />
            </Switch>
         </div>
      );
   }
}

export default withRouter(Authentication);