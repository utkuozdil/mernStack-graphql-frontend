import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import App from "./App";
import "./index.css";
import feedReducer from "./redux/reducer/Feed";
import singlePostReducer from "./redux/reducer/SinglePost";
import feedHandler from "./redux/saga/Feed";
import singlePostHandler from "./redux/saga/SinglePost";
import authReducer from "./redux/reducer/Auth";
import authHandler from "./redux/saga/Auth";

const rootReducer = combineReducers({
  singlePost: singlePostReducer,
  feed: feedReducer,
  auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(singlePostHandler);
sagaMiddleware.run(feedHandler);
sagaMiddleware.run(authHandler);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
