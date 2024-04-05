const React = require("react");
const { createRoot } = require("react-dom/client");
const { Button, ConfigProvider } = require("antd");

const App = () => {
  return (
    <ConfigProvider csp={{ nonce: 1 }}>
      <Button type="primary">Press Me</Button>
    </ConfigProvider>
  );
};

const init = () => {
  const domNode = document.getElementById("app");
  const root = createRoot(domNode);
  root.render(<App />);
};

window.onload = init;
