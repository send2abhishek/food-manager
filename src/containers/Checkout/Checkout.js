import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { connect } from "react-redux";
import { purchaseInit } from "../../Store/actions/order";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: this.props.ings,
      price: this.props.price,
      // ingredients: this.props.location.state.details
    };
  }
  componentWillUpdate() {
    this.props.onInitPurchase();
  }
  checkoutCancel = () => {
    this.props.history.goBack();
  };
  checkoutContinue = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    console.log("parms received as", this.props);
    let summary = <Redirect to="/" />;

    if (this.props.ings) {
      const purchasedRedirect = this.props.purcahsed ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancel={this.checkoutCancel}
            checkoutContinue={this.checkoutContinue}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            render={(props) => (
              <ContactData
                ingredients={this.props.ings}
                price={this.state.price}
                {...props}
              />
            )}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.price,
    purcahsed: state.order.purchased,
  };
};

const mapDispacthToProps = (dispatch) => {
  return {
    onInitPurchase: () => dispatch(purchaseInit()),
  };
};

export default connect(mapStateToProps, mapDispacthToProps)(Checkout);
