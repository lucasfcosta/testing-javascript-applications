import React, { useEffect, useState, useRef } from "react";
import { API_ADDR } from "./constants";
import { ItemForm } from "./ItemForm.jsx";
import { ItemList } from "./ItemList.jsx";
import { ActionLog } from "./ActionLog.jsx";

export const App = () => {
  const [items, setItems] = useState({});
  const [actions, setActions] = useState([]);
  const isMounted = useRef(null);

  useEffect(() => {
    isMounted.current = true;
    const loadItems = async () => {
      const response = await fetch(`${API_ADDR}/inventory`);
      const responseBody = await response.json();
      if (isMounted.current) {
        setItems(responseBody);
        setActions(
          actions.concat({
            time: new Date().toISOString(),
            message: "Loaded items from the server",
            data: { status: response.status, body: responseBody }
          })
        );
      }
    };
    loadItems();
    return () => (isMounted.current = false);
  }, []);

  const updateItems = (itemAdded, addedQuantity) => {
    const currentQuantity = items[itemAdded] || 0;
    setItems({ ...items, [itemAdded]: currentQuantity + addedQuantity });
    setActions(
      actions.concat({
        time: new Date().toISOString(),
        message: "Item added",
        data: { itemAdded, addedQuantity }
      })
    );
  };

  return (
    <div>
      <h1>Inventory Contents</h1>
      <ItemList itemList={items} />
      <ItemForm onItemAdded={updateItems} />
      <ActionLog actions={actions} />
    </div>
  );
};
