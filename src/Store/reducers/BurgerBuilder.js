import actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  price: 4,
  error: false,
};

const PRICE_DETAILS = {
  Salad: 10,
  Bacon: 20,
  Cheese: 40,
  meat: 70,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        // make a copy of the state, it will copy outside but not inner object
        // doesn't do deep cloning
        ...state,
        ingredients: {
          //copied new ingredients
          ...state.ingredients,
          // with new ingredients object, we want to overide given ingredients which we get as
          // payload of this action, in es6 we can override property dynamically
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        price: state.price + PRICE_DETAILS[action.ingredientName],
      };

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          //copied new ingredients
          ...state.ingredients,
          // with new ingredients object, we want to overide given ingredients which we get as
          // payload of this action, in es6 we can override property dynamically
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        price: state.price - PRICE_DETAILS[action.ingredientName],
      };

    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
      };

    case actionTypes.FETCH_INGREDIENTS_ERROR:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};

export default reducer;
