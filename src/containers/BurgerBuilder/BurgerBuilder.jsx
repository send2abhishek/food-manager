import React, { Component } from "react";
import Aux from "../../hoc/Auxilliary";
import Burger from "../Burger/Burger";
import BuildControls from "../Burger/BuildControls/BuildControls";
import Modal from "../../components/Ui/Modal/Modal.js";
import OrderSummary from "../Burger/OrderSummary/OrderSummary";
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
      price: 4,
      purchasable: false,
      purchasing: false
    };
  }

  updatePurchasable = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    // console.log("ingredienys", sum);

    this.setState({
      purchasable: sum > 0
    });
  };

  purchasingHandler = () => {
    this.setState({
      purchasing: true
    });
  };

  addIngredientHandler = type => {
    const ingredients = { ...this.state.ingredients };
    ingredients[type] = ingredients[type] + 1;
    const priceAddition = PRICE_DETAILS[type];
    const UpdatedPrice = priceAddition + this.state.price;
    this.setState({
      ingredients: ingredients,
      price: UpdatedPrice
    });
    this.updatePurchasable(ingredients);
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
    this.updatePurchasable(ingredients);
  };

  handleClicked = () => {
    this.setState({
      purchasing: false
    });
  };
  handleContinue = () => {
    alert("All good to go");
  };
  render() {
    const disabledInfo = { ...this.state.ingredients };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} clicked={this.handleClicked}>
          <OrderSummary
            orderCancel={this.handleClicked}
            orderContinue={this.handleContinue}
            ingedient={this.state.ingredients}
            price={this.state.price}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientsAdded={this.addIngredientHandler}
          ingredientsRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          price={this.state.price}
          ordered={this.purchasingHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
