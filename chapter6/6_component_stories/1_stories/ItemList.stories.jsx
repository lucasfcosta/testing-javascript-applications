import React from "react";
import { withKnobs, object } from "@storybook/addon-knobs";
import { ItemList } from "./ItemList";

export default {
  title: "ItemList",
  component: ItemList,
  includeStories: ["staticItemList", "animatedItems"],
  decorators: [withKnobs]
};

export const staticItemList = () => (
  <ItemList
    itemList={{
      cheesecake: 2,
      croissant: 5,
      macaroon: 96
    }}
  />
);

export const animatedItems = () => {
  const knobLabel = "Contents";
  const knobDefaultValue = { cheesecake: 2, croissant: 5 };
  const itemList = object(knobLabel, knobDefaultValue);
  return <ItemList itemList={itemList} />;
};
