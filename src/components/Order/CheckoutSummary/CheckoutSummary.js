import React from "react";
import Burger from "../../../containers/Burger/Burger";
import Button from "../../Ui/Button/Button";
import "./CheckoutSummary.css";
const checkoutSummary = props => {
  return (
    <div className="CheckoutSummary">
      <h1>We hope it taste well !</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancel}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinue}>
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;
