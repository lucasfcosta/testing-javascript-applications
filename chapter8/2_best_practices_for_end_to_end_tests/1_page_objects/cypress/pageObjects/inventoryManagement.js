export class InventoryManagement {
  static visit() {
    cy.visit("http://localhost:8080");
  }

  static enterItemName(itemName) {
    return cy.get('input[placeholder="Item name"]').type(itemName);
  }

  static enterQuantity(quantity) {
    return cy.get('input[placeholder="Quantity"]').type(quantity);
  }

  static getSubmitButton() {
    return cy.get('button[type="submit"]').contains("Add to inventory");
  }

  static addItem(itemName, quantity) {
    cy.get('input[placeholder="Item name"]').type(itemName);
    cy.get('input[placeholder="Quantity"]').type(quantity);
    cy.get('button[type="submit"]')
      .contains("Add to inventory")
      .click();
  }

  static findItemEntry(itemName, quantity) {
    return cy.get("li").contains(`${itemName} - Quantity: ${quantity}`);
  }

  static undo() {
    return cy
      .get("button")
      .contains("Undo")
      .click();
  }

  static findAction(inventoryState) {
    return cy
      .get("p")
      .contains(
        `The inventory has been updated - ${JSON.stringify(inventoryState)}`
      );
  }
}
