import Actions from "./actionTypes";
import axios from "../../axios-orders";
export const addIngredient = (ind) => {
  return {
    type: Actions.ADD_INGREDIENT,
    ingredientName: ind,
  };
};

export const RemoveIngredient = (ind) => {
  return {
    type: Actions.REMOVE_INGREDIENT,
    ingredientName: ind,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: Actions.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const fetchIngredientFailed = (msg) => {
  return {
    type: Actions.FETCH_INGREDIENTS_ERROR,
    message: msg,
  };
};
export const initIngredeints = () => {
  return (dispatch) => {
    axios
      .get("https://react-burger-app-1b7ef.firebaseio.com/ingredients.json")
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((err) => {
        dispatch(fetchIngredientFailed(err.message));
      });
  };
};
