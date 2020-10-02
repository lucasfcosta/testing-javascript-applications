import React, { useEffect, useState, useRef } from "react";
import { API_ADDR } from "./constants";
import { ItemForm } from "./ItemForm.jsx";
import { ItemList } from "./ItemList.jsx";

export const App = () => {
  const [items, setItems] = useState({});
  const isMounted = useRef(null);

  useEffect(() => {
    isMounted.current = true;
    const loadItems = async () => {
      const response = await fetch(`${API_ADDR}/inventory`);
      const responseBody = await response.json();
      if (isMounted.current) setItems(responseBody);
    };
    loadItems();
    return () => (isMounted.current = false);
  }, []);

  return (
    <div>
      <h1>Inventory Contents</h1>
      <ItemList itemList={items} />
      <ItemForm />
    </div>
  );
};
