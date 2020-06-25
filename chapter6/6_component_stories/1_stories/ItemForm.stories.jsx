import React, { useEffect } from "react";
import fetchMock from "fetch-mock";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { API_ADDR } from "./constants";
import { ItemForm } from "./ItemForm";

const itemListStories = storiesOf("ItemForm", module);

itemListStories.add("A form", () => {
  const ItemFormStory = () => {
    useEffect(() => {
      fetchMock.post(`glob:${API_ADDR}/inventory/*`, 200);
      return () => fetchMock.restore();
    });

    return <ItemForm onItemAdded={action("form-submission")} />;
  };

  return <ItemFormStory />;
});
