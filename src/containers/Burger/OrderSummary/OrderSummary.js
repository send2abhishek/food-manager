import React, { Component } from "react";
import Aux from "../../../hoc/Auxilliary";
import Button from "../../../components/Ui/Button/Button";

class OrderSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    console.log("order summary component did updated called");
  }
  render() {
    const ingedientSummary = Object.keys(this.props.ingedient).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
          {this.props.ingedient[igKey]}
        </li>
      );
    });
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with following indgredients :</p>
        <ul>{ingedientSummary}</ul>
        <p>Continue to Checkout ?</p>
        <p>
          <strong>Total price is Rs: {this.props.price}</strong>
        </p>
        <Button btnType="Danger" clicked={this.props.orderCancel}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.orderContinue}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
