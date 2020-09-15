export class InventoryManagement {
  static visit() {
    cy.visit("http://localhost:8080");
  }

  static enterItemName(itemName) {
    return cy
      .get('input[placeholder="Item name"]')
      .clear()
      .type(itemName);
  }

  static enterQuantity(quantity) {
    return cy
      .get('input[placeholder="Quantity"]')
      .clear()
      .type(quantity);
  }

  static getSubmitButton() {
    return cy.get('button[type="submit"]').contains("Add to inventory");
  }

  static addItem(itemName, quantity) {
    InventoryManagement.enterItemName(itemName);
    InventoryManagement.enterQuantity(quantity);
    InventoryManagement.getSubmitButton().click();
  }

  static findItemEntry(itemName, quantity) {
    return cy.contains("li", `${itemName} - Quantity: ${quantity}`);
  }

  static undo() {
    return cy
      .get("button")
      .contains("Undo")
      .click();
  }

  static findAction(inventoryState) {
    return cy.get("p:not(:nth-of-type(1))").then(p => {
      return Array.from(p).filter(p => {
        return p.innerText.includes(
          `The inventory has been updated - ${JSON.stringify(inventoryState)}`
        );
      });
    });
  }
}
