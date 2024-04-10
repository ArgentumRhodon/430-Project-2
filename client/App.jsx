import React from "react";
import { createRoot } from "react-dom/client";

import Chat from "./Chat";
import Login from "./Login";

import { theme, ConfigProvider } from "antd";

const appTheme = {
  algorithm: theme.darkAlgorithm,
  components: {
    Menu: {
      itemSelectedBg: "rgba(255, 255, 255, 0.3)",
      itemSelectedColor: "fff",
    },
  },
};

const App = () => {
  const loggedIn = true;

  return (
    <ConfigProvider theme={appTheme}>
      {loggedIn ? <Chat /> : <Login />}
    </ConfigProvider>
  );
};

const init = () => {
  const domNode = document.getElementById("app");
  const root = createRoot(domNode);
  root.render(<App />);
};

window.onload = init;
