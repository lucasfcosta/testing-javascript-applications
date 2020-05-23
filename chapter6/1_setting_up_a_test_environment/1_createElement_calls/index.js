const ReactDOM = require("react-dom");
const React = require("react");

const header = React.createElement("h1", null, "Inventory Contents");
const App = React.createElement("div", null, header);

ReactDOM.render(App, document.getElementById("app"));
