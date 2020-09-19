import React from "react";
import { storiesOf } from "@storybook/react";
import { ActionLog } from "./ActionLog";

const actionLogStories = storiesOf("ActionLog", module);

actionLogStories.add("A log of actions", () => {
  return (
    <ActionLog
      actions={[
        {
          time: new Date().toISOString(),
          message: "First action",
          data: { i: 1 }
        },
        {
          time: new Date().toISOString(),
          message: "Second action",
          data: { i: 2 }
        },
        {
          time: new Date().toISOString(),
          message: "Third action",
          data: { i: 3 }
        }
      ]}
    />
  );
});
