import React from "react";
import "./Burger.css";
import BurgerIngredient from "./BurgerIngredeints/BurgerIngredients";

const burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(idKey => {
      return [...Array(props.ingredients[idKey])].map((_, i) => {
        return <BurgerIngredient key={idKey + i} type={idKey} />;
      });
    })
    .reduce((prevValue, currValue) => {
      // concat and store into the initial value of the array []
      return prevValue.concat(currValue);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start inserting Ingredients </p>;
  }

  console.log(transformedIngredients);
  return (
    <div className="Burger">
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
