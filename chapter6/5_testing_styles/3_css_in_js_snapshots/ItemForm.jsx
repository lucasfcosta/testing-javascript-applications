import React from "react";
import PropTypes from "prop-types";
import { API_ADDR } from "./constants";

const addItemRequest = (itemName, quantity) => {
  fetch(`${API_ADDR}/inventory/${itemName}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity })
  });
};

export const ItemForm = ({ onItemAdded }) => {
  const [itemName, setItemName] = React.useState("");
  const [quantity, setQuantity] = React.useState(0);

  const onSubmit = async e => {
    e.preventDefault();
    await addItemRequest(itemName, quantity);
    if (onItemAdded) onItemAdded(itemName, quantity);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={e => setItemName(e.target.value)}
        placeholder="Item name"
      />
      <input
        onChange={e => setQuantity(parseInt(e.target.value, 10))}
        placeholder="Quantity"
      />
      <button type="submit">Add item</button>
    </form>
  );
};

ItemForm.propTypes = {
  onItemAdded: PropTypes.func
};
