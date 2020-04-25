let data = { count: 0 };

const incrementCount = e => {
  // Prevent the page from reloading as it would by default
  if (e) e.preventDefault();

  data.count++;
  window.document.getElementById("count").innerText = data.count;
};

const incrementButton = window.document.getElementById("increment-button");
incrementButton.addEventListener("click", incrementCount);
