import React from "react";
import Aux from "../../../hoc/Auxilliary";
import Button from "../../../components/Ui/Button/Button";
const orderSummary = props => {
  const ingedientSummary = Object.keys(props.ingedient).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
        {props.ingedient[igKey]}
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
        <strong>Total price is Rs: {props.price}</strong>
      </p>
      <Button btnType="Danger" clicked={props.orderCancel}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.orderContinue}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
