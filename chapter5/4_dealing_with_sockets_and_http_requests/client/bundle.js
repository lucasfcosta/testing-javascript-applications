(function() {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw ((a.code = "MODULE_NOT_FOUND"), a);
        }
        var p = (n[i] = { exports: {} });
        e[i][0].call(
          p.exports,
          function(r) {
            var n = e[i][1][r];
            return o(n || r);
          },
          p,
          p.exports,
          r,
          e,
          n,
          t
        );
      }
      return n[i].exports;
    }
    for (
      var u = "function" == typeof require && require, i = 0;
      i < t.length;
      i++
    )
      o(t[i]);
    return o;
  }
  return r;
})()(
  {
    1: [
      function(require, module, exports) {
        const serverAddr = "http://localhost:3000";

        const getItems = async () => {
          const response = await fetch(`${serverAddr}/inventory`);
          return await response.json();
        };

        const updateItemList = async () => {
          const items = await getItems("test");

          const inventoryList = window.document.getElementById("item-list");

          // Clears the list
          inventoryList.innerHTML = "";

          items.forEach(item => {
            const listItem = window.document.createElement("li");
            listItem.innerText = `${item.itemName} - Quantity: ${item.quantity}`;
            inventoryList.appendChild(listItem);
          });
        };

        // This runs when the page loads
        updateItemList();
      },
      {}
    ]
  },
  {},
  [1]
);
