import React, { Component } from "react";
import Button from "../../../components/Ui/Button/Button";
import "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/Ui/Spinner/Spinner";
import Input from "../../../components/Ui/Input/input";
import { purchaseBurger } from "../../../Store/actions/order";
import { connect } from "react-redux";

class ContactData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderForm: {
        name: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Your Name",
          },
          value: "",
          validation: {
            required: true,
          },
          valid: false,
        },
        street: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Street",
          },
          value: "",
          validation: {
            required: true,
          },
          valid: false,
        },
        ZipCode: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Zip code",
          },
          value: "",
          validation: {
            required: true,
            minLength: 5,
            maxLength: 5,
          },
          valid: false,
        },
        contry: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Country",
          },
          value: "",
          validation: {
            required: true,
          },
          valid: false,
        },
        email: {
          elementType: "input",
          elementConfig: {
            type: "email",
            placeholder: "Email",
          },
          value: "",
          validation: {
            required: true,
          },
          valid: false,
        },
        deliveryMethod: {
          elementType: "select",
          elementConfig: {
            options: [
              { value: "fastest", displayValue: "Fastest" },
              { value: "cheapest", displayValue: "Cheapest" },
            ],
          },
          value: "fastest",
          validation: {},
          valid: false,
        },
      },
      loading: false,
    };
  }
  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }
  orderHandler = (e) => {
    e.preventDefault();
    console.log("Conatct data order handlere", this.props);

    // this.setState({ loading: true });
    const formData = {};
    for (let formDataIdentifier in this.state.orderForm) {
      formData[formDataIdentifier] = this.state.orderForm[
        formDataIdentifier
      ].value;
    }
    const order = {
      ingedients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    };

    this.props.onOrderBurger(order);
    // axios
    //   .post("/orders.json", order)
    //   .then((result) => {
    //     this.setState({ loading: false });
    //     console.log("response from firebase", result);
    //     this.props.history.replace("/");
    //   })
    //   .catch((err) => {
    //     this.setState({ loading: false });
    //     console.log("something went wrong", err);
    //   });
  };
  InputChangeHandler = (e, inputIdentifier) => {
    const formData = { ...this.state.orderForm };
    const updatedClone = { ...formData[inputIdentifier] };
    updatedClone.value = e.target.value;
    updatedClone.valid = this.checkValidity(
      updatedClone.value,
      updatedClone.validation
    );
    formData[inputIdentifier] = updatedClone;
    this.setState({
      orderForm: formData,
    });

    console.log(updatedClone);
  };
  render() {
    let formDataElementArray = [];

    for (let key in this.state.orderForm) {
      formDataElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formDataElementArray.map((data, index) => {
          return (
            <Input
              key={index}
              inputType={data.config.elementType}
              elementConfig={data.config.elementConfig}
              value={data.config.value}
              changed={(event) => this.InputChangeHandler(event, data.id)}
            />
          );
        })}

        <Button btnType="Success">Order </Button>
      </form>
    );
    if (this.props.loading) {
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

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.price,
    loading: state.order.loading,
  };
};

const mapDispatchToprops = (dispatch) => {
  return {
    onOrderBurger: (orderData) => dispatch(purchaseBurger(orderData)),
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(ContactData);
