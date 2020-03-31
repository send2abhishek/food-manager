import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
//import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      loading: true
    };
  }

  componentDidMount() {
    axios
      .get("https://react-burger-app-1b7ef.firebaseio.com/orders.json")
      .then(response => {
        const fetchedOrder = [];
        for (let key in response.data) {
          fetchedOrder.push({
            ...response.data[key],
            id: key
          });
        }
        this.setState({
          loading: false,
          orders: fetchedOrder
        });
      })
      .catch(err => {
        this.setState({
          loading: false
        });
      });
  }
  render() {
    return (
      <div>
        {this.state.orders.map((order, index) => {
          return (
            <Order
              key={index}
              ingedients={order.ingedients}
              price={order.price}
            />
          );
        })}
      </div>
    );
  }
}

export default Orders;
