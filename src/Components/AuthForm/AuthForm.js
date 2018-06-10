import React, {Component, Fragment} from "react";
import Button from "../UI/Button/Button";
import Message from "../UI/Notifications/Message";
import Loader from "../UI/Loader/Loader";
import {Link, withRouter, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from "../../store/actions";
import * as actionTypes from "../../store/actions/actionTypes";
import Class from "./AuthForm.css";

export class AuthForm extends Component {
   state = {
      username: "",
      password: "",
      pwConfirmation: "",
      adminPassword: "",
      isAdmin: false,
      showPassword: {
         password: "password",
         pwConfirmation: "password",
         adminPassword: "password"
      }, 
      isLoading: false
   }

   componentDidMount(){
      let token = localStorage.getItem("token");
      let {user, onTokenVerify, message} = this.props;
      if(user || (!user && token && token !== "null" & token !== "undefined")) onTokenVerify(message);
   }

   componentDidUpdate(){
      let token = localStorage.getItem("token");
      let {user, onTokenVerify, message} = this.props;
      if(user || (!user && token && token !== "null" & token !== "undefined")) onTokenVerify(message);
   }

   submitHandler = e => {
      e.preventDefault();
      let {username, password, pwConfirmation, adminPassword} = this.state;
      let {type, onUserAuth, onNewMessage} = this.props;
      let payload = {username, password};
      payload.adminPassword = type === "register" ? adminPassword : undefined;

      if(type === "register" && password !== pwConfirmation) return onNewMessage("Error", "The password doesn't match!");
      this.setState({isLoading: true});
      return onUserAuth(type, payload);
   }

   changeHandler = e => {
      let {name, type} = e.target;
      let value = type === "checkbox" ? e.target.checked : e.target.value;
      this.setState({[name]: value});
   }

   showPasswordHandler = type => {
      this.setState(prevState => ({
         ...prevState,
         showPassword: {
            ...prevState.showPassword,
            [type]: prevState.showPassword[type] === "password" ? "text" : "password"
         }
      }))
   }

   clearMessage = () => {
      this.setState({isLoading: false}, this.props.onMessageClear);
   }

   render(){
      let {type, message, user} = this.props;
      let {username, password, pwConfirmation, adminPassword, isAdmin, showPassword, isLoading} = this.state;
      let token = localStorage.getItem("token");
      let ifAuthenticated = (user || (token && token !== "null" & token !== "undefined"))  ? <Redirect to="/" /> : null;
      let infoMessage = message.message 
                        ?  <Message clear={this.clearMessage} label={message.messageType}> 
                              {message.message} 
                           </Message>
                        : null;
      let confirmInput = type === "register" 
                        ?  <Fragment>
                              <fieldset>
                                 <input type={showPassword.pwConfirmation} placeholder="Confirm Password" name="pwConfirmation" value={pwConfirmation} autoComplete="off" onChange={this.changeHandler}/>
                                 <Button button="button" type="Default" proceedRequest={() => this.showPasswordHandler("pwConfirmation")}>
                                       {showPassword.pwConfirmation === "password" ? "Show" : "Hide"}
                                 </Button>
                              </fieldset> 
                              <fieldset>
                                 <label> Are you an Admin? </label>
                                 <input type="checkbox" name="isAdmin" checked={isAdmin} onChange={this.changeHandler} />
                              </fieldset>
                          </Fragment>  
                        : null;
      let isAdminInput = (type === "register" && isAdmin)
                        ? <Fragment>
                           <fieldset>
                              <input type={showPassword.adminPassword} placeholder="Admin Password" name="adminPassword" value={adminPassword} autoComplete="off" onChange={this.changeHandler}/>
                              <Button button="button" type="Default" proceedRequest={() => this.showPasswordHandler("adminPassword")}>
                                 {showPassword.adminPassword === "password" ? "Show" : "Hide"}
                              </Button>
                           </fieldset>
                          </Fragment>
                        : null;
      let newUser = type === "login" ? <Button type="Default"><Link to={`/authentication/register`}> New User? </Link></Button> 
                                     : <Button type="Default"><Link to={`/authentication/login`}> Already an User? </Link></Button>
      let loadingState = isLoading  ? <Loader />
                                    : (<Fragment>
                                          <form onSubmit={this.submitHandler} className={Class.form}>
                                             <input type="text" name="username" placeholder="Username" value={username} autoComplete="off" onChange={this.changeHandler}/>
                                             <fieldset>
                                                <input type={showPassword.password} name="password" placeholder="Password" value={password} autoComplete="off" onChange={this.changeHandler}/>
                                                <Button button="button" type="Default" proceedRequest={() => this.showPasswordHandler("password")}>
                                                   {showPassword.password === "password" ? "Show" : "Hide"} 
                                                </Button>
                                             </fieldset>
                                             {confirmInput}
                                             {isAdminInput}
                                             <Button type="Success"> {type.toUpperCase()} </Button>
                                          </form>
                                          {newUser}
                                       </Fragment>);   
                                                                 
      return (
         <div className={Class.authForm}>
            {ifAuthenticated}
            {infoMessage}
            <h2> {type.toUpperCase()} </h2>
            {loadingState}
         </div>
      )
   }
}

const mapStateToProps = state => ({
   message: state.message,
   user: state.user.username
})

const mapDispatchToProps = dispatch => ({
   onTokenVerify: message => dispatch(actions.verifyToken(message)),
   onUserAuth: (authType, payload) => dispatch(actions.authenticateUser(authType, payload)),
   onNewMessage: (messageType, message) => dispatch({type: actionTypes.NEW_MESSAGE, message, messageType}),
   onMessageClear: () => dispatch({type: actionTypes.CLEAR_MESSAGE})
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AuthForm));