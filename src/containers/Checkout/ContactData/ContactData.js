import React, { Component } from "react";
import Button from "../../../components/Ui/Button/Button";
import "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/Ui/Spinner/Spinner";
class ContactData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: {},
      loading: false
    };
  }
  orderHandler = e => {
    e.preventDefault();
    console.log("Conatct data order handlere", this.props);

    this.setState({ loading: true });
    const order = {
      ingedients: this.props.ingredients,
      price: this.props.price,
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
        this.setState({ loading: false });
        console.log("response from firebase", result);
        this.props.history.replace("/");
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log("something went wrong", err);
      });
  };
  render() {
    let form = (
      <form>
        <input
          className="Input"
          type="text"
          name="name"
          placeholder="Your name"
        />
        <input
          className="Input"
          type="email"
          name="email"
          placeholder="Your email"
        />
        <input
          className="Input"
          type="text"
          name="street"
          placeholder="Your street"
        />
        <input
          className="Input"
          type="text"
          name="postal"
          placeholder="Your postal code"
        />
        <Button clicked={this.orderHandler} btnType="Success">
          Order{" "}
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className="ContactData">
        <h4>Enter your form data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
