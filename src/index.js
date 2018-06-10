import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import burgerReducer from "../src/store/reducers/burgerReducer";
import userReducer from "../src/store/reducers/userReducer";
import orderReducer from "../src/store/reducers/orderReducer";
import messageReducer from "../src/store/reducers/messageReducer";
import thunk from "redux-thunk";

const composeEnhancers = process.env.NODE_ENV ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const reducer = combineReducers({
   burger: burgerReducer,
   user: userReducer,
   orders: orderReducer,
   message: messageReducer
});

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();