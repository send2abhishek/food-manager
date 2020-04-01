import React from "react";
import "./Input.css";
const input = props => {
  let inputElement = null;

  switch (props.inputType) {
    case "input":
      inputElement = (
        <input
          className="InputElement"
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className="InputElement"
          onChange={props.changed}
          value={props.value}
        >
          {props.elementConfig.options.map((data, index) => {
            return (
              <option key={index} value={data.value}>
                {data.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          onChange={props.changed}
          className="InputElement"
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;

    default:
      inputElement = (
        <input
          onChange={props.changed}
          className="InputElement"
          {...props.elementConfig}
          value={props.value}
        />
      );
  }

  return (
    <div className="Input">
      <label className="Label">{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
