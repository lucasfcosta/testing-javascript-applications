import React from "react";

export const App = () => {
  const [cheesecakes, setCheesecake] = React.useState(0);
  return (
    <div>
      <h1>Inventory Contents</h1>
      <p>Cheesecakes: {cheesecakes}</p>
      <button onClick={() => setCheesecake(cheesecakes + 1)}>
        Add cheesecake
      </button>
    </div>
  );
};
