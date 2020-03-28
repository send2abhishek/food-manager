import React, { Component } from "react";
import Aux from "../../hoc/Auxilliary";
import Burger from "../Burger/Burger";
import BuildControls from "../Burger/BuildControls/BuildControls";

const PRICE_DETAILS = {
  Salad: 10,
  Bacon: 20,
  Cheese: 40,
  meat: 70
};
class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        Salad: 0,
        Bacon: 0,
        Cheese: 0,
        meat: 0
      },
      price: 4
    };
  }

  addIngredientHandler = type => {
    const ingredients = { ...this.state.ingredients };
    ingredients[type] = ingredients[type] + 1;
    const priceAddition = PRICE_DETAILS[type];
    const UpdatedPrice = priceAddition + this.state.price;
    this.setState({
      ingredients: ingredients,
      price: UpdatedPrice
    });
  };

  removeIngredientHandler = type => {
    const ingredients = { ...this.state.ingredients };

    if (ingredients[type] <= 0) {
      return;
    }
    ingredients[type] = ingredients[type] - 1;
    const priceAddition = PRICE_DETAILS[type];
    const UpdatedPrice = this.state.price - priceAddition;
    this.setState({
      ingredients: ingredients,
      price: UpdatedPrice
    });
  };
  render() {
    const disabledInfo = { ...this.state.ingredients };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientsAdded={this.addIngredientHandler}
          ingredientsRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.price}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
