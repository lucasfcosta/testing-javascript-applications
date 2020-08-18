describe("item list updates", () => {
  beforeEach(() => cy.task("emptyInventory"));

  describe("when the application loads for the first time", () => {
    it.only("loads the initial list of items", () => {
      cy.addItem("cheesecake", 2);
      cy.addItem("apple pie", 5);
      cy.addItem("carrot cake", 96);
      cy.visit("http://localhost:8080");

      cy.get("li").contains("cheesecake - Quantity: 2");
      cy.get("li").contains("apple pie - Quantity: 5");
      cy.get("li").contains("carrot cake - Quantity: 96");
    });
  });

  describe("as other users add items", () => {
    it("updates the item list", () => {
      cy.visit("http://localhost:8080");
      cy.wait(2000);
      cy.addItem("cheesecake", 22);
      cy.get("li").contains("cheesecake - Quantity: 22");
    });
  });
});
