import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Link, Route, Routes } from "react-router-dom";
import Chat from "./Chat";
import Login from "./Login";

import { theme, ConfigProvider } from "antd";
import useSocket from "./hooks/useSocket";

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
  return (
    <ConfigProvider theme={appTheme}>
      <HashRouter>
        {/* <div>
          <Link to="/">Login</Link>
          <Link to="/app">Chat</Link>
        </div> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/app" element={<Chat />}></Route>
        </Routes>
      </HashRouter>
    </ConfigProvider>
  );
};

const init = () => {
  const domNode = document.getElementById("app");
  const root = createRoot(domNode);
  root.render(<App />);
};

window.onload = init;
