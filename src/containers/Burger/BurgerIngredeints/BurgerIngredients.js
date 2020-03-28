import React from "react";
import "./BurgerIngedient.css";
import PropTypes from "prop-types";
const burgerIngredient = props => {
  let ingredient = null;
  switch (props.type) {
    case "bread-bottom":
      ingredient = <div className="BreadBottom"></div>;
      break;
    case "bread-top":
      ingredient = (
        <div className="BreadTop">
          <div className="Seeds1"></div>
          <div className="Seeds2"></div>
        </div>
      );
      break;
    case "meat":
      ingredient = <div className="Meat"></div>;
      break;
    case "Cheese":
      ingredient = <div className="Cheese"></div>;
      break;
    case "Salad":
      ingredient = <div className="Salad"></div>;
      break;

    case "Bacon":
      ingredient = <div className="Bacon"></div>;
      break;

    default:
      ingredient = null;
  }

  return ingredient;
};

burgerIngredient.prototype = {
  type: PropTypes.string.isRequired
};

export default burgerIngredient;
