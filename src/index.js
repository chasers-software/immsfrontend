import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { HashRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import authReducer from './store/reducers/auth';
import teacherReducer from './store/reducers/teacher';
import studentReducer from './store/reducers/student';
import adminReducer from './store/reducers/admin';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    auth: authReducer,
    teacher: teacherReducer,
    student: studentReducer,
    admin: adminReducer
});
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <HashRouter><ScrollToTop>
      <App/>
   </ScrollToTop></HashRouter>
 </Provider>,
  document.getElementById("root")
);
