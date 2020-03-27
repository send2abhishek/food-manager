import React from "react";
// import logo from './logo.svg';
// import './App.css';
import Layout from "./components/Layouts/layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

function App() {
  return (
    <Layout>
      <BurgerBuilder />
    </Layout>
  );
}

export default App;
