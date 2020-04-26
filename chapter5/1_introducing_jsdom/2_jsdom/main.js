let data = { cheesecakes: 0 };

const incrementCount = e => {
  // Prevent the page from reloading as it would by default
  if (e) e.preventDefault();

  data.cheesecakes++;
  window.document.getElementById("count").innerText = data.cheesecakes;
};

const incrementButton = window.document.getElementById("increment-button");
incrementButton.addEventListener("click", incrementCount);
