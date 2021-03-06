import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import BurgerBuilderReducer from "./Store/reducers/BurgerBuilder";
import OrderBurgerReducer from "./Store/reducers/order";
import thunk from "redux-thunk";

const logger = (store) => {
  return (next) => {
    return (action) => {
      console.log("Middleware dispatched", action);
      const result = next(action);
      console.log("Middleware next state", store.getState());
      return result;
    };
  };
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  burgerBuilder: BurgerBuilderReducer,
  order: OrderBurgerReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, thunk))
);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
