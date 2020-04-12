import actionType from "./actionTypes";
import axios from "../../axios-orders";

//sync method called by the reducer
export const purchaseBurgerSucess = (id, orderData) => {
  return {
    type: actionType.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionType.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionType.PURCHASE_BURGER_START,
  };
};

// when will click order button to order this event will get handle
// async method
export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json", orderData)
      .then((result) => {
        dispatch(purchaseBurgerSucess(result.data.name, orderData));
      })
      .catch((err) => {
        dispatch(purchaseBurgerFail(err.message));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionType.PURCHASE_INIT,
  };
};
