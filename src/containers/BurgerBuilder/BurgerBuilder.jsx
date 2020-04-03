import React, { Component } from "react";
import Aux from "../../hoc/Auxilliary";
import Burger from "../Burger/Burger";
import BuildControls from "../Burger/BuildControls/BuildControls";
import Modal from "../../components/Ui/Modal/Modal.js";
import OrderSummary from "../Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/Ui/Spinner/Spinner";
import withErrorHanlder from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import actionTypes from "../../Store/action";

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // ingredients: null,
      // price: 4,
      // purchasable: false,
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

    // this.setState({
    //   purchasable: sum > 0
    // });
    return sum > 0;
  };

  purchasingHandler = () => {
    this.setState({
      purchasing: true
    });
  };

  // addIngredientHandler = type => {
  //   const ingredients = { ...this.props.ings };
  //   ingredients[type] = ingredients[type] + 1;
  //   const priceAddition = PRICE_DETAILS[type];
  //   const UpdatedPrice = priceAddition + this.props.price;
  //   this.setState({
  //     ingredients: ingredients,
  //     price: UpdatedPrice
  //   });
  //   this.updatePurchasable(ingredients);
  // };

  // removeIngredientHandler = type => {
  //   const ingredients = { ...this.props.ings };

  //   if (ingredients[type] <= 0) {
  //     return;
  //   }
  //   ingredients[type] = ingredients[type] - 1;
  //   const priceAddition = PRICE_DETAILS[type];
  //   const UpdatedPrice = this.props.price - priceAddition;
  //   this.setState({
  //     ingredients: ingredients,
  //     price: UpdatedPrice
  //   });
  //   this.updatePurchasable(ingredients);
  // };

  handleClicked = () => {
    this.setState({
      purchasing: false
    });
  };
  handleContinue = () => {
    // const queryParam = [];
    // for (let i in this.props.ings) {
    //   queryParam.push(
    //     encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ings[i])
    //   );
    // }
    // queryParam.push("price=" + this.props.price);
    // const queryString = queryParam.join("&");
    this.props.history.push({
      pathname: "/checkout"
      // search: "?" + queryString
    });
  };

  componentDidMount() {
    // axios
    //   .get("https://react-burger-app-1b7ef.firebaseio.com/ingredients.json")
    //   .then(response => {
    //     console.log(response);
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(err => {});
  }
  render() {
    const disabledInfo = { ...this.props.ings };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = <Spinner />;

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientsAdded={e => this.props.onIngredientAdded(e)}
            ingredientsRemoved={e => this.props.onIngredientRemoved(e)}
            disabled={disabledInfo}
            purchasable={this.updatePurchasable(this.props.ings)}
            price={this.props.price}
            ordered={this.purchasingHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          orderCancel={this.handleClicked}
          orderContinue={this.handleContinue}
          ingedient={this.props.ings}
          price={this.props.price}
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

const mapStateToProps = state => {
  return {
    //state.ingredients will point to reducer state
    ings: state.ingredients,
    price: state.price
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ing =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ing
      }),
    onIngredientRemoved: ing =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ing
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHanlder(BurgerBuilder, axios));
