import React from "react";
import "./Order.css";
const order = props => {
  let ingerdients = [];
  for (let ingredientName in props.ingedients) {
    ingerdients.push({
      name: ingredientName,
      amount: props.ingedients[ingredientName]
    });
  }
  const ingredientText = ingerdients.map((ig, index) => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px"
        }}
        key={index}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });
  return (
    <div className="Order">
      <p>Indgredients: {ingredientText}</p>
      <p>
        Price: <strong>{props.price}</strong>
      </p>
    </div>
  );
};

export default order;
