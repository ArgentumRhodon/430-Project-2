const React = require("react");
const { createRoot } = require("react-dom/client");

const App = () => {
  return <h1>App Index</h1>;
};

const init = () => {
  const domNode = document.getElementById("app");
  const root = createRoot(domNode);
  root.render(<App />);
};

window.onload = init;
