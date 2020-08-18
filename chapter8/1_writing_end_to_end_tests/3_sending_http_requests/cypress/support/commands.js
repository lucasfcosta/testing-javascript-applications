Cypress.Commands.add("addItem", (itemName, quantity) => {
  return cy.request({
    url: `http://localhost:3000/inventory/${itemName}`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity })
  });
});
