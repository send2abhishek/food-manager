import React from "react";
// import logo from './logo.svg';
// import './App.css';
import Layout from "./components/Layouts/layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch } from "react-router-dom";
import Orders from "./containers/Orders/Orders";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Route path="/checkout" component={Checkout}></Route>
        <Route path="/orders" component={Orders} />
      </Switch>
    </Layout>
  );
}

export default App;
