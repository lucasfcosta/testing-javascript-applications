describe("item submission", () => {
  beforeEach(() => cy.task("emptyDb"));

  it("can add items through the form", () => {
    cy.visit("http://localhost:8080");
    cy.get('input[placeholder="Item name"]').type("cheesecake");
    cy.get('input[placeholder="Quantity"]').type("10");
    cy.get('button[type="submit"]')
      .contains("Add to inventory")
      .click();

    cy.get("li").contains("cheesecake - Quantity: 10");
  });

  it("can update an item's quantity", () => {
    cy.task("seedItem", { itemName: "cheesecake", quantity: 5 });
    cy.visit("http://localhost:8080");
    cy.get('input[placeholder="Item name"]').type("cheesecake");
    cy.get('input[placeholder="Quantity"]').type("10");
    cy.get('button[type="submit"]')
      .contains("Add to inventory")
      .click();

    cy.get("li").contains("cheesecake - Quantity: 15");
  });

  it("can undo submitted items", () => {
    cy.visit("http://localhost:8080");
    cy.get('input[placeholder="Item name"]').type("cheesecake");
    cy.get('input[placeholder="Quantity"]').type("10");
    cy.get('button[type="submit"]')
      .contains("Add to inventory")
      .click();

    cy.get('input[placeholder="Quantity"]')
      .clear()
      .type("5");
    cy.get('button[type="submit"]')
      .contains("Add to inventory")
      .click();

    cy.get("button")
      .contains("Undo")
      .click();

    cy.get("li").contains("cheesecake - Quantity: 10");
  });

  it("saves each submission to the action log", () => {
    cy.visit("http://localhost:8080");
    cy.get('input[placeholder="Item name"]').type("cheesecake");
    cy.get('input[placeholder="Quantity"]').type("10");
    cy.get('button[type="submit"]')
      .contains("Add to inventory")
      .click();

    cy.get('input[placeholder="Quantity"]')
      .clear()
      .type("5");
    cy.get('button[type="submit"]')
      .contains("Add to inventory")
      .click();

    cy.get("button")
      .contains("Undo")
      .click();

    cy.get("p").contains("The inventory has been updated - {}");
    cy.get("p").contains('The inventory has been updated - {"cheesecake":10}');
    cy.get("p").contains('The inventory has been updated - {"cheesecake":15}');
    cy.get("p").contains('The inventory has been updated - {"cheesecake":10}');
  });

  describe("given a user enters an invalid item name", () => {
    it("disables the form's submission button", () => {
      cy.visit("http://localhost:8080");
      cy.get('input[placeholder="Item name"]').type("boat");
      cy.get('input[placeholder="Quantity"]').type("10");
      cy.get('button[type="submit"]')
        .contains("Add to inventory")
        .should("be.disabled");
    });
  });
});
