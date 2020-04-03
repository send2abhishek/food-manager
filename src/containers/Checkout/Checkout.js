import React, { Component } from "react";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { connect } from "react-redux";
class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: this.props.ings,
      price: this.props.price
      // ingredients: this.props.location.state.details
    };
  }
  componentDidMount() {
    // const query = new URLSearchParams(this.props.location.search);
    // const ingerdients = {};
    // let price = 0;
    // for (let param of query.entries()) {
    //   //['Salad','1']
    //   if (param[0] === "price") {
    //     price = param[1];
    //   }
    //   ingerdients[param[0]] = +param[1];
    // }
    // this.setState({ ingredients: ingerdients, price: price });
    // // console.log("passes ingerdeients", ingerdients);
  }
  checkoutCancel = () => {
    this.props.history.goBack();
  };
  checkoutContinue = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    console.log("parms received as", this.props);
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancel={this.checkoutCancel}
          checkoutContinue={this.checkoutContinue}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={props => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.price}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.price
  };
};

export default connect(mapStateToProps)(Checkout);
