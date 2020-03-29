import React, { Component } from "react";
import Aux from "../../hoc/Auxilliary";
import Burger from "../Burger/Burger";
import BuildControls from "../Burger/BuildControls/BuildControls";
import Modal from "../../components/Ui/Modal/Modal.js";
import OrderSummary from "../Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/Ui/Spinner/Spinner";
import withErrorHanlder from "../../hoc/withErrorHandler/withErrorHandler";
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
      ingredients: null,
      price: 4,
      purchasable: false,
      purchasing: false,
      loading: false
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
    this.setState({ loading: true });
    const order = {
      ingedients: this.state.ingredients,
      price: this.state.price,
      customer: {
        name: "Abhishek Aryan",
        address: {
          street: "Electronic city bangalore",
          ZipCode: 500031
        },
        email: "send2abhishek@live.com"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(result => {
        this.setState({ loading: false, purchasing: false });
        console.log("response from firebase", result);
      })
      .catch(err => {
        this.setState({ loading: false, purchasing: false });
        console.log("something went wrong", err);
      });
  };

  componentDidMount() {
    axios
      .get("https://react-burger-app-1b7ef.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(err => {});
  }
  render() {
    const disabledInfo = { ...this.state.ingredients };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <Aux>
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
      orderSummary = (
        <OrderSummary
          orderCancel={this.handleClicked}
          orderContinue={this.handleContinue}
          ingedient={this.state.ingredients}
          price={this.state.price}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} clicked={this.handleClicked}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHanlder(BurgerBuilder, axios);
