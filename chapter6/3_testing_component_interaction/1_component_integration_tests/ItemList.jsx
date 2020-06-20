import React from "react";
import PropTypes from "prop-types";

export const generateItemText = (itemName, quantity) => {
  const capitalizedItemName =
    itemName.charAt(0).toUpperCase() + itemName.slice(1);
  return `${capitalizedItemName} - Quantity: ${quantity}`;
};

export const ItemList = ({ itemList }) => {
  return (
    <ul>
      {Object.entries(itemList).map(([itemName, quantity]) => {
        return <li key={itemName}>{generateItemText(itemName, quantity)}</li>;
      })}
    </ul>
  );
};

ItemList.propTypes = {
  itemList: PropTypes.objectOf(PropTypes.number).isRequired
};
