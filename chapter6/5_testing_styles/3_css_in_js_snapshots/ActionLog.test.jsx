import React from "react";
import { ActionLog } from "./ActionLog";
import { render } from "@testing-library/react";

const daysToMs = days => days * 24 * 60 * 60 * 1000;

test("logging actions", () => {
  const actions = [
    {
      time: new Date(daysToMs(1)),
      message: "Loaded item list",
      data: { cheesecake: 2, macaroon: 5 }
    },
    {
      time: new Date(daysToMs(2)),
      message: "Item added",
      data: { cheesecake: 2 }
    },
    {
      time: new Date(daysToMs(3)),
      message: "Item removed",
      data: { cheesecake: 1 }
    },
    {
      time: new Date(daysToMs(4)),
      message: "Something weird happened",
      data: { error: "The cheesecake is a lie" }
    }
  ];

  const { container } = render(<ActionLog actions={actions} />);
  expect(container).toMatchSnapshot();
});
