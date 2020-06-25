import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { ItemList } from "./ItemList";

const itemListStories = storiesOf("ItemList", module);

itemListStories.add("A list of items", () => {
  return (
    <ItemList
      itemList={{
        cheesecake: 2,
        croissant: 5,
        macaroon: 96
      }}
    />
  );
});

itemListStories.add("Animating items", () => {
  const initialList = { cheesecake: 2, croissant: 5 };
  const StatefulItemList = () => {
    const [itemList, setItemList] = useState(initialList);
    const add = () => setItemList({ ...initialList, macaroon: 96 });
    const reset = () => setItemList(initialList);

    return (
      <div>
        <ItemList itemList={itemList} />
        <button onClick={add}>Add item</button>
        <button onClick={reset}>Reset</button>
      </div>
    );
  };

  return <StatefulItemList />;
});
