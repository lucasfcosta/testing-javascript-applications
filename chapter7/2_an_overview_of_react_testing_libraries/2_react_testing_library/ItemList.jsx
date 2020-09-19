import React from "react";

export const ItemList = ({ itemList }) => {
  return (
    <ul>
      {Object.entries(itemList).map(([itemName, quantity]) => {
        return (
          <li key={itemName}>
            {itemName} - Quantity: {quantity}
          </li>
        );
      })}
    </ul>
  );
};
