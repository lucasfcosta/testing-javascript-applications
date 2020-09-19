import React from "react";

export const ActionLog = ({ actions }) => {
  return (
    <div data-testid="action-log">
      <h2>Action Log</h2>
      <ul>
        {actions.map(({ time, message, data }) => {
          const date = new Date(time).toUTCString();
          return (
            <li>
              Date: {date} - Message: {message} - Data: {JSON.stringify(data)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
