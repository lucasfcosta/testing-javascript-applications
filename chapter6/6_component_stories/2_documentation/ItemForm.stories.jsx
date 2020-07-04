import React, { useEffect } from "react";
import fetchMock from "fetch-mock";
import { action } from "@storybook/addon-actions";
import { API_ADDR } from "./constants";
import { ItemForm } from "./ItemForm";

export default {
  title: "ItemForm",
  component: ItemForm,
  includeStories: ["itemForm"]
};

export const itemForm = () => {
  const ItemFormStory = () => {
    useEffect(() => {
      fetchMock.post(`glob:${API_ADDR}/inventory/*`, 200);
      return () => fetchMock.restore();
    }, []);

    return <ItemForm onItemAdded={action("form-submission")} />;
  };

  return <ItemFormStory />;
};
