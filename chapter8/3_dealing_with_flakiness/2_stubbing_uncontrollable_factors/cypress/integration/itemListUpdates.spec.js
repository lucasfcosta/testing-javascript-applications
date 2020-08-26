import { InventoryManagement } from "../pageObjects/inventoryManagement";

describe("item list updates", () => {
  beforeEach(() => cy.task("emptyInventory"));

  describe("when the application loads for the first time", () => {
    it("loads the initial list of items", () => {
      cy.addItem("cheesecake", 2);
      cy.addItem("apple pie", 5);
      cy.addItem("carrot cake", 96);
      cy.visit("http://localhost:8080");

      InventoryManagement.findItemEntry("cheesecake", "2");
      InventoryManagement.findItemEntry("apple pie", "5");
      InventoryManagement.findItemEntry("carrot cake", "96");
    });
  });

  describe("as other users add items", () => {
    it("updates the item list", () => {
      cy.server()
        .route("http://localhost:3000/inventory")
        .as("inventoryRequest");
      cy.visit("http://localhost:8080");
      cy.wait("@inventoryRequest");
      cy.addItem("cheesecake", 22);
      InventoryManagement.findItemEntry("cheesecake", "22");
    });
  });
});
