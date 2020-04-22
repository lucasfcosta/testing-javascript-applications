let count = 0;

const incrementButton = window.document.getElementById("increment-button");
incrementButton.addEventListener("click", async e => {
  // Prevent the page from reloading as it would by default
  e.preventDefault();
  count++;
  window.document.getElementById("count").innerText = count;
});
