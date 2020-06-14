import React from "react";
import PropTypes from "prop-types";

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

ItemList.propTypes = {
  itemList: PropTypes.objectOf(PropTypes.number).isRequired
};
