import React from "react";
import "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl.js";

const controls = [
  {
    label: "Salad",
    type: "Salad"
  },
  {
    label: "Bacon",
    type: "Bacon"
  },
  {
    label: "Cheese",
    type: "Cheese"
  },
  {
    label: "Meat",
    type: "meat"
  }
];

const buildControls = props => {
  return (
    <div className="BuildControls">
      <p>
        Total price is : Rs <strong>{props.price}</strong>
      </p>
      {controls.map(controls => {
        return (
          <BuildControl
            key={controls.label}
            label={controls.label}
            added={() => {
              props.ingredientsAdded(controls.type);
            }}
            removed={() => props.ingredientsRemoved(controls.type)}
            disabled={props.disabled[controls.type]}
          />
        );
      })}
      <button
        disabled={!props.purchasable}
        onClick={props.ordered}
        className="OrderButton"
      >
        Order Now
      </button>
    </div>
  );
};

export default buildControls;
