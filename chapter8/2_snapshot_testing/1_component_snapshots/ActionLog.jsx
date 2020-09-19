import React from "react";

export const ActionLog = ({ actions }) => {
  return (
    <div data-testid="action-log">
      <h2>Action Log</h2>
      <ul>
        {actions.map(({ time, message, data }, i) => {
          const date = new Date(time).toUTCString();
          return (
            <li key={i}>
              Date: {date} - Message: {message} - Data: {JSON.stringify(data)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
